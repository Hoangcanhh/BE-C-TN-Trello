// trello-backend/src/modules/list/list.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  board_id: number;
}

export class UpdateListDto {
  @IsString()
  title?: string;
}