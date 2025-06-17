import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsNumber } from "class-validator"

export class ReorderColumnsDto {
  @IsNotEmpty({ message: "ID bảng không được để trống" })
  @IsString({ message: "ID bảng phải là chuỗi" })
  boardId: string

  @IsArray({ message: "columnIds phải là một mảng" })
  @ArrayNotEmpty({ message: "Danh sách ID cột không được để trống" })
  @IsNumber({}, { each: true, message: "Mỗi ID cột phải là số" })
  columnIds: number[]
}
