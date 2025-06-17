import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateGoogleUserDto {
  @IsNotEmpty({ message: "Username là bắt buộc" })
  @IsString({ message: "Username phải là chuỗi" })
  username: string

  @IsEmail({}, { message: "Email không hợp lệ" })
  @IsNotEmpty({ message: "Email là bắt buộc" })
  email: string

  @IsNotEmpty({ message: "Google ID là bắt buộc" })
  @IsString({ message: "Google ID phải là chuỗi" })
  googleId: string

  @IsOptional()
  @IsString({ message: "Avatar phải là chuỗi" })
  avatar?: string

}
