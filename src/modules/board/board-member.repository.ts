import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { BoardMember } from "./entities/board-member.entity"
import { AddBoardMemberDto } from "./dto/board-member.dto"
import { User } from "../user/entities/user.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class BoardMemberRepository {

  constructor(
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
    @InjectRepository(User)
    private userRepository: Repository<User>) {
  }

  async findAllByBoardId(boardId: string): Promise<BoardMember[]> {
    return this.boardMemberRepository.find({
      where: { boardId },
      relations: ["user"],
      order: { role: "ASC", createdAt: "ASC" },
    })
  }

  async findOne(id: number): Promise<BoardMember> {
    return this.boardMemberRepository.findOne({
      where: { id },
      relations: ["user"],
    })
  }

  async findByBoardAndUser(boardId: string, userId: number): Promise<BoardMember> {
    return this.boardMemberRepository.findOne({
      where: { boardId, userId },
    })
  }

  async addMember(boardId: string, addBoardMemberDto: AddBoardMemberDto): Promise<BoardMember> {
    // Tìm user theo email
    const user = await this.userRepository.findOne({
      where: { email: addBoardMemberDto.email },
    })

    if (!user) {
      throw new Error(`Không tìm thấy người dùng với email ${addBoardMemberDto.email}`)
    }

    // Kiểm tra xem người dùng đã là thành viên của bảng chưa
    const existingMember = await this.findByBoardAndUser(boardId, user.id)
    if (existingMember) {
      throw new Error(`Người dùng đã là thành viên của bảng`)
    }

    // Tạo thành viên mới
    const boardMember = this.boardMemberRepository.create({
      boardId,
      userId: user.id,
      role: addBoardMemberDto.role,
    })

    await this.boardMemberRepository.save(boardMember)

    // Lấy thông tin đầy đủ của thành viên
    return this.findOne(boardMember.id)
  }

  async updateRole(id: number, role: "admin" | "member" | "observer"): Promise<BoardMember> {
    await this.boardMemberRepository.update(id, { role })
    return this.findOne(id)
  }

  async removeMember(id: number): Promise<BoardMember> {
    const boardMember = await this.findOne(id)
    await this.boardMemberRepository.delete(id)
    return boardMember
  }

  async checkPermission(boardId: string, userId: number, roles: ("admin" | "member" | "observer")[]): Promise<boolean> {
    const boardMember = await this.findByBoardAndUser(boardId, userId)

    if (!boardMember) {
      return false
    }

    return roles.includes(boardMember.role)
  }
}
