import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateCardDto {
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