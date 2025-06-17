import { Injectable, NotFoundException } from "@nestjs/common"
import { BoardMemberRepository } from "./board-member.repository"
import { AddBoardMemberDto, BoardMemberDto } from "./dto/board-member.dto"
import { BoardMember } from "./entities/board-member.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class BoardMemberService {
  constructor(
    @InjectRepository(BoardMember)
    private readonly boardMemberRepository: BoardMemberRepository) {}

  async findAllByBoardId(boardId: string): Promise<BoardMemberDto[]> {
    const boardMembers = await this.boardMemberRepository.findAllByBoardId(boardId)
    return boardMembers.map((member) => this.mapToDto(member))
  }

  async addMember(boardId: string, addBoardMemberDto: AddBoardMemberDto): Promise<BoardMemberDto> {
    try {
      const boardMember = await this.boardMemberRepository.addMember(boardId, addBoardMemberDto)
      return this.mapToDto(boardMember)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateRole(id: number, role: "admin" | "member" | "observer"): Promise<BoardMemberDto> {
    const boardMember = await this.boardMemberRepository.findOne(id)

    if (!boardMember) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID ${id}`)
    }

    const updatedMember = await this.boardMemberRepository.updateRole(id, role)
    return this.mapToDto(updatedMember)
  }

  async removeMember(id: number): Promise<BoardMemberDto> {
    const boardMember = await this.boardMemberRepository.findOne(id)

    if (!boardMember) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID ${id}`)
    }

    const removedMember = await this.boardMemberRepository.removeMember(id)
    return this.mapToDto(removedMember)
  }

  async checkPermission(boardId: string, userId: number, roles: ("admin" | "member" | "observer")[]): Promise<boolean> {
    return this.boardMemberRepository.checkPermission(boardId, userId, roles)
  }

  private mapToDto(boardMember: BoardMember): BoardMemberDto {
    return {
      id: boardMember.id,
      userId: boardMember.userId,
      boardId: boardMember.boardId,
      role: boardMember.role,
      createdAt: boardMember.createdAt,
      updatedAt: boardMember.updatedAt,
      user: boardMember.user
        ? {
            id: boardMember.user.id,
            username: boardMember.user.username,
            email: boardMember.user.email,
            avatar: boardMember.user.avatar,
          }
        : null,
    }
  }
}
