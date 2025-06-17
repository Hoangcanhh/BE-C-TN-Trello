import { CardDto } from "../../card/dto/card.dto"

export class ColumnDto {
  id: number
  title: string
  boardId: string
  position: number
  createdAt: Date
  updatedAt: Date
  cards: CardDto[]
}
