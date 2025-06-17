// board.service.ts
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { CreateBoardDto } from "./dto/create-board.dto"
import type { UpdateBoardDto } from "./dto/update-board.dto"
import { Board } from "./entities/board.entity"

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: number): Promise<Board> {
    const board = this.boardRepository.create({
      ...createBoardDto,
      ownerId: userId,
    })
    return this.boardRepository.save(board)
  }

  async findAll(userId: number): Promise<Board[]> {
    return this.boardRepository.find({
      where: { ownerId: userId, active: true },
      order: { updatedAt: "DESC" },
    })
  }

  async findAllStarred(userId: number): Promise<Board[]> {
    return this.boardRepository.find({
      where: { ownerId: userId, starred: true, active: true },
      order: { updatedAt: "DESC" },
    })
  }

  async findOne(id: string, userId?: number): Promise<Board> {
    if (userId !== undefined) {
      const board = await this.boardRepository.findOne({
        where: { id, ownerId: userId, active: true },
        relations: ["lists", "lists.cards"],
      })
      if (!board) {
        throw new NotFoundException(`Không tìm thấy bảng với ID ${id}`)
      }
      return board
    } else {
      const board = await this.boardRepository.findOne({
        where: { id, active: true },
        relations: ["lists", "lists.cards"],
      })
      if (!board) {
        throw new NotFoundException(`Không tìm thấy bảng với ID ${id}`)
      }
      return board
    }
  }

  async findOneInternal(id: string): Promise<Board> {
    return this.findOne(id)
  }

  async update(id: string, updateBoardDto: UpdateBoardDto, userId: number): Promise<Board> {
    const board = await this.findOne(id, userId)

    if (board.ownerId !== userId) {
      throw new ForbiddenException("Bạn không có quyền cập nhật bảng này")
    }

    await this.boardRepository.update(id, updateBoardDto)
    return this.boardRepository.findOne({ where: { id } })
  }

  async remove(id: string, userId: number): Promise<void> {
    const board = await this.findOne(id, userId)

    if (board.ownerId !== userId) {
      throw new ForbiddenException("Bạn không có quyền xóa bảng này")
    }

    await this.boardRepository.update(id, { active: false })
  }

  async hardRemove(id: string, userId: number, isAdmin: boolean): Promise<void> {
    const board = await this.findOne(id, userId)

    if (!isAdmin && board.ownerId !== userId) {
      throw new ForbiddenException("Bạn không có quyền xóa hoàn toàn bảng này")
    }

    await this.boardRepository.delete(id)
  }

  async toggleStar(id: string, userId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id, ownerId: userId, active: true },
    })

    if (!board) {
      throw new Error(`Không tìm thấy bảng với ID ${id}`)
    }

    board.starred = !board.starred
    return this.boardRepository.save(board)
  }
}