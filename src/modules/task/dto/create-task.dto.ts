// trello-backend/src/modules/task/task.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  assigned_to_id: number;

  @IsNumber()
  @IsNotEmpty()
  card_id: number;

  @IsDateString()
  @IsNotEmpty()
  due_date: string;

  @IsString()
  status?: string;
}

