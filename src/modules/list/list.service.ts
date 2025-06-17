import { Injectable, NotFoundException, BadRequestException, Inject,forwardRef } from "@nestjs/common"
import { ListRepository } from "./list.repository"
import { BoardService } from "../board/board.service"
import { CreateListDto } from "./dto/create-list.dto"
import { UpdateListDto } from "./dto/update-list.dto"
import { List } from "./entities/list.entity"

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
  ) {}

  async create(createListDto: CreateListDto, userId: number): Promise<List> {
    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(createListDto.boardId, userId)

    return this.listRepository.create(createListDto)
  }

  async findAll(): Promise<List[]> {
    return this.listRepository.findAll()
  }

  async findAllByBoardId(boardId: string, userId: number): Promise<List[]> {
    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(boardId, userId)

    return this.listRepository.findAllByBoardId(boardId)
  }

  async findOne(id: string): Promise<List> {
    const list = await this.listRepository.findOne(id)
    if (!list) {
      throw new NotFoundException(`Không tìm thấy list với ID ${id}`)
    }
    return list
  }

  async update(id: string, updateListDto: UpdateListDto, userId: number): Promise<List> {
    const list = await this.findOne(id)

    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(list.boardId, userId)

    // Nếu đang cập nhật boardId, kiểm tra xem có hợp lệ không
    if (updateListDto.boardId && updateListDto.boardId !== list.boardId) {
      throw new BadRequestException("Không thể thay đổi bảng của list")
    }

    return this.listRepository.update(id, updateListDto)
  }

  async remove(id: string, userId: number): Promise<void> {
    const list = await this.findOne(id)

    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(list.boardId, userId)

    await this.listRepository.remove(id)
  }

  async reorder(boardId: string, listIds: string[], userId: number): Promise<void> {
    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(boardId, userId)

    // Kiểm tra xem tất cả các list có thuộc về bảng không
    const lists = await this.listRepository.findAllByBoardId(boardId)
    const listIdSet = new Set(lists.map((list) => list.id))

    for (const id of listIds) {
      if (!listIdSet.has(id)) {
        throw new BadRequestException(`List với ID ${id} không thuộc về bảng ${boardId}`)
      }
    }

    // Kiểm tra xem có đủ số lượng list không
    if (listIds.length !== lists.length) {
      throw new BadRequestException("Danh sách ID list không khớp với số lượng list trong bảng")
    }

    await this.listRepository.reorder(boardId, listIds)
  }
}
