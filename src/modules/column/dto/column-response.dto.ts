import { ColumnDto } from "./column.dto"

export class ColumnResponseDto {
  status: string
  message: string
  data: ColumnDto
}

export class ColumnsResponseDto {
  status: string
  message: string
  data: ColumnDto[]
}
