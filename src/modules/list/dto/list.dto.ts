import { CardDto } from "../../card/dto/card.dto"

export class ListDto {
  id: string
  title: string
  boardId: string
  position: number
  createdAt: Date
  updatedAt: Date
  cards?: CardDto[]
}
