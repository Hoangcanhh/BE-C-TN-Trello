import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTaskManagerDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  task_id: number;

  @IsString()
  status?: string;

  @IsDateString()
  reminder_date?: string;
}
