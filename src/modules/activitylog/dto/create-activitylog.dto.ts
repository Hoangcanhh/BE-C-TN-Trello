// trello-backend/src/modules/activitylog/activitylog.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateActivityLogDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  board_id?: number;

  @IsNumber()
  card_id?: number;
}