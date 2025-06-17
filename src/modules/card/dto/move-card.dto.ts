import { IsNotEmpty, IsNumber } from "class-validator"

export class MoveCardDto {
  @IsNotEmpty({ message: "ID cột đích không được để trống" })
  @IsNumber({}, { message: "ID cột đích phải là số" })
  targetColumnId: number

  @IsNotEmpty({ message: "Vị trí không được để trống" })
  @IsNumber({}, { message: "Vị trí phải là số" })
  position: number
}
