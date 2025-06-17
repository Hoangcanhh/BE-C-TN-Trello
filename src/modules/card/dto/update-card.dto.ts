import { IsOptional, IsString, IsNumber, IsEnum } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
import { CreateCardDto } from "./create-card.dto"

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title?: string

  @IsOptional()
  @IsString({ message: "Mô tả phải là chuỗi" })
  description?: string

  @IsOptional()
  @IsEnum(["blocker", "discussion", "fyi", "paused", "goal"], {
    message: "Loại thẻ không hợp lệ",
  })
  type?: "blocker" | "discussion" | "fyi" | "paused" | "goal"

  @IsOptional()
  @IsNumber({}, { message: "Số lượng phải là số" })
  count?: number

  @IsOptional()
  @IsNumber({}, { message: "Vị trí phải là số" })
  position?: number
}
