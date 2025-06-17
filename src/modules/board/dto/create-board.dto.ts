import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator"

export class CreateBoardDto {
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title: string

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

  // ownerId sẽ được lấy từ JWT token
}
