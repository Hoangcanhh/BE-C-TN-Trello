import { BoardMemberDto } from "./board-member.dto"

export class BoardMemberResponseDto {
  status: string
  message: string
  data: BoardMemberDto
}

export class BoardMembersResponseDto {
  status: string
  message: string
  data: BoardMemberDto[]
}
