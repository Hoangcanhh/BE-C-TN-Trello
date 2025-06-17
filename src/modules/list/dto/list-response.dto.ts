import { ListDto } from "./list.dto"

export class ListResponseDto {
  status: string
  message: string
  data: ListDto
}

export class ListsResponseDto {
  status: string
  message: string
  data: ListDto[]
}
