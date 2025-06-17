import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  list_id: number;

  @IsNumber()
  assigned_to_id?: number;

  @IsDateString()
  due_date?: string;
}

export class UpdateCardDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNumber()
  list_id?: number;

  @IsNumber()
  assigned_to_id?: number;

  @IsDateString()
  due_date?: string;
}

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  card_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class CreateAttachmentDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  card_id: number;
}

export class CreateCardDto {
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  @IsString({ message: "Tiêu đề phải là chuỗi" })
  title: string

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

  @IsNotEmpty({ message: "ID cột không được để trống" })
  @IsNumber({}, { message: "ID cột phải là số" })
  columnId: number

  @IsOptional()
  @IsNumber({}, { message: "Vị trí phải là số" })
  position?: number
}
