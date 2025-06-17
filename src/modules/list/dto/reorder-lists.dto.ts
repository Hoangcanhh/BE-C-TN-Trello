import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsUUID } from "class-validator"

export class ReorderListsDto {
  @IsNotEmpty({ message: "ID bảng không được để trống" })
  @IsString({ message: "ID bảng phải là chuỗi" })
  boardId: string

  @IsArray({ message: "listIds phải là một mảng" })
  @ArrayNotEmpty({ message: "Danh sách ID list không được để trống" })
  @IsUUID("4", { each: true, message: "Mỗi ID list phải là UUID hợp lệ" })
  listIds: string[]
}
