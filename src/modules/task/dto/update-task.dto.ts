import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { TaskStatusEnum } from '../../../enum/task.enum';
export class UpdateTaskDto extends PartialType(CreateTaskDto) {

      @IsString()
      description?: string;
    
      @IsNumber()
      assigned_to_id?: number;
    
      @IsDateString()
      due_date?: string;
    
      @IsString()
      status?: TaskStatusEnum;
}

