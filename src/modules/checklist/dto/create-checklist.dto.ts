// trello-backend/src/modules/checklist/checklist.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateChecklistDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  card_id: number;
}

export class CreateChecklistItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed?: boolean;

  @IsNumber()
  @IsNotEmpty()
  checklist_id: number;
}

export class UpdateChecklistItemDto {
  @IsBoolean()
  completed?: boolean;
}