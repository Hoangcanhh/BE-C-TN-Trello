import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { List } from "./entities/list.entity"
import { CreateListDto } from "./dto/create-list.dto"
import { UpdateListDto } from "./dto/update-list.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>) {
    this.listRepository = listRepository
  }

  async create(createListDto: CreateListDto): Promise<List> {
    // Nếu không có position, lấy vị trí cuối cùng của list trong bảng
    if (createListDto.position === undefined) {
      const lastList = await this.listRepository.findOne({
        where: { boardId: createListDto.boardId },
        order: { position: "DESC" },
      })
      createListDto.position = lastList ? lastList.position + 1 : 0
    }

    const list = this.listRepository.create(createListDto)
    return this.listRepository.save(list)
  }

  async findAll(): Promise<List[]> {
    return this.listRepository.find({
      order: { position: "ASC" },
      relations: ["cards"],
    })
  }

  async findAllByBoardId(boardId: string): Promise<List[]> {
    return this.listRepository.find({
      where: { boardId },
      order: { position: "ASC" },
      relations: ["cards"],
    })
  }

  async findOne(id: string): Promise<List> {
    return this.listRepository.findOne({
      where: { id },
      relations: ["cards"],
    })
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    await this.listRepository.update(id, updateListDto)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.listRepository.delete(id)
  }

  async reorder(boardId: string, listIds: string[]): Promise<void> {
    // Cập nhật vị trí của tất cả các list trong bảng
    const queryRunner = this.listRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      for (let i = 0; i < listIds.length; i++) {
        await queryRunner.manager.update(List, { id: listIds[i] }, { position: i })
      }

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }
}
