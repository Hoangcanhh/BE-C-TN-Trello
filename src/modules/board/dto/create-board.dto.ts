// trello-backend/src/modules/board/board.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  owner_id: number;

  @IsNumber()
  workspace_id?: number;
}

export class UpdateBoardDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}