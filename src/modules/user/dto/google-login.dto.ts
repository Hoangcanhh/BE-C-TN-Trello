import { IsNotEmpty, IsObject, IsString } from "class-validator"

export class GoogleLoginDto {
  @IsNotEmpty({ message: "Credential là bắt buộc" })
  @IsString()
  credential: string

  @IsNotEmpty({ message: "User data là bắt buộc" })
  @IsObject()
  user: {
    email: string
    name: string
    picture: string
    sub: string
  }
}
