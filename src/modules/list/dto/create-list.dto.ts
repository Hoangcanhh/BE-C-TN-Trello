import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator"

export class CreateListDto {
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title: string

  @IsNotEmpty({ message: "ID bảng không được để trống" })
  @IsString({ message: "ID bảng phải là chuỗi" })
  boardId: string

  @IsOptional()
  @IsNumber({}, { message: "Vị trí phải là số" })
  position?: number
}
