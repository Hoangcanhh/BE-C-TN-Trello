import { BoardDto } from "./board.dto"

export class BoardResponseDto {
  status: string
  message: string
  data: BoardDto
}

export class BoardsResponseDto {
  status: string
  message: string
  data: BoardDto[]
}
