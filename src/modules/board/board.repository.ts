// import { Injectable } from "@nestjs/common"
// import type { Repository } from "typeorm"
// import { Board } from "./entities/board.entity"
// import type { CreateBoardDto } from "./dto/create-board.dto"
// import type { UpdateBoardDto } from "./dto/update-board.dto"
// import { InjectRepository } from "@nestjs/typeorm"

// @Injectable()
// export class BoardRepository {
//   constructor(
//     @InjectRepository(Board)
//     private boardRepo: Repository<Board>,) {
//   }

//   async create(createBoardDto: CreateBoardDto, userId: number): Promise<Board> {
//     const board = this.boardRepo.create({
//       ...createBoardDto,
//       ownerId: userId,
//     })
//     return this.boardRepo.save(board)
//   }

//   async findAll(userId: number): Promise<Board[]> {
//     return this.boardRepo.find({
//       where: { ownerId: userId, active: true },
//       order: { updatedAt: "DESC" },
//     })
//   }

//   async findAllStarred(userId: number): Promise<Board[]> {
//     return this.boardRepo.find({
//       where: { ownerId: userId, starred: true, active: true },
//       order: { updatedAt: "DESC" },
//     })
//   }

//   async findOne(id: string, userId: number): Promise<Board> {
//     return this.boardRepo.findOne({
//       where: { id, ownerId: userId, active: true },
//       relations: ["lists", "lists.cards"], // Thay đổi từ columns sang lists
//     })
//   }

//   async findOneWithoutPermissionCheck(id: string): Promise<Board> {
//     return this.boardRepo.findOne({
//       where: { id, active: true },
//       relations: ["lists", "lists.cards"], // Thay đổi từ columns sang lists
//     })
//   }

//   async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
//     await this.boardRepo.update(id, updateBoardDto)
//     return this.boardRepo.findOne({
//       where: { id },
//     })
//   }

//   async remove(id: string): Promise<void> {
//     // Soft delete - chỉ đánh dấu là không hoạt động
//     await this.boardRepo.update(id, { active: false })
//   }

//   async hardRemove(id: string): Promise<void> {
//     // Hard delete - xóa hoàn toàn khỏi database
//     await this.boardRepo.delete(id)
//   }

//   async toggleStar(id: string, userId: number): Promise<Board> {
//     const board = await this.boardRepo.findOne({
//       where: { id, ownerId: userId, active: true },
//     })

//     if (!board) {
//       throw new Error(`Không tìm thấy bảng với ID ${id}`)
//     }

//     board.starred = !board.starred
//     return this.boardRepo.save(board)
//   }
// }
