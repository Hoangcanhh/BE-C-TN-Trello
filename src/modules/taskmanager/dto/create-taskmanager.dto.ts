import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { TaskStatusEnum } from '../../../enum/task.enum';

export class CreateTaskManagerDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  task_id: number;

  @IsString()
  status?: TaskStatusEnum;

  @IsDateString()
  reminder_date?: string;
}
