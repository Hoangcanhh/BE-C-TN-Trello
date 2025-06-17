import { IsOptional, IsString, IsNumber } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
import { CreateColumnDto } from "./create-column.dto"

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsOptional()
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title?: string

  @IsOptional()
  @IsNumber({}, { message: "Vị trí phải là số" })
  position?: number
}
