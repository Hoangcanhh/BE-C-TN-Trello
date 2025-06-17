import { ColumnDto } from "../../column/dto/column.dto"

export class BoardDto {
  id: string
  title: string
  description: string
  ownerId: number
  backgroundColor: string
  backgroundImage: string
  starred: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
  columns?: ColumnDto[]
  lists?: ListInBoardDto[]
}

export class ListInBoardDto {
  id: string
  title: string
  boardId: string
  position: number
  createdAt: Date
  updatedAt: Date
  cards?: CardInListDto[]
}

export class CardInListDto {
  id: number
  title: string
  description: string
  type: string
  count: number
  columnId: number
  position: number
  createdAt: Date
  updatedAt: Date
}

