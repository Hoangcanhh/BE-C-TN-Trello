import { IsOptional, IsString, IsNumber } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
import { CreateListDto } from "./create-list.dto"

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsOptional()
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title?: string

  @IsOptional()
  @IsNumber({}, { message: "Vị trí phải là số" })
  position?: number
}
