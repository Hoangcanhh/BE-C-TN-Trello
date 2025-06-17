import { IsOptional, IsString, IsBoolean } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
import { CreateBoardDto } from "./create-board.dto"

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsOptional()
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title?: string

  @IsOptional()
  @IsString({ message: "Mô tả phải là chuỗi" })
  description?: string

  @IsOptional()
  @IsString({ message: "Màu nền phải là chuỗi" })
  backgroundColor?: string

  @IsOptional()
  @IsString({ message: "Ảnh nền phải là chuỗi" })
  backgroundImage?: string

  @IsOptional()
  @IsBoolean({ message: "Đánh dấu sao phải là boolean" })
  starred?: boolean

  @IsOptional()
  @IsBoolean({ message: "Trạng thái hoạt động phải là boolean" })
  active?: boolean
}
