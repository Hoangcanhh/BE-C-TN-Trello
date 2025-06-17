import { IsNotEmpty, IsEmail, IsEnum } from "class-validator"

export class BoardMemberDto {
  id: number
  userId: number
  boardId: string
  role: "admin" | "member" | "observer"
  createdAt: Date
  updatedAt: Date
  user: {
    id: number
    username: string
    email: string
    avatar?: string
  }
}

export class AddBoardMemberDto {
  @IsNotEmpty({ message: "Email không được để trống" })
  @IsEmail({}, { message: "Email không hợp lệ" })
  email: string

  @IsNotEmpty({ message: "Vai trò không được để trống" })
  @IsEnum(["admin", "member", "observer"], { message: "Vai trò không hợp lệ" })
  role: "admin" | "member" | "observer"
}

export class UpdateBoardMemberRoleDto {
  @IsNotEmpty({ message: "Vai trò không được để trống" })
  @IsEnum(["admin", "member", "observer"], { message: "Vai trò không hợp lệ" })
  role: "admin" | "member" | "observer"
}
