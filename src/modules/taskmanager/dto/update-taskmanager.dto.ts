import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskManagerDto } from './create-taskmanager.dto';
import { IsString, IsDateString } from 'class-validator';
import { TaskStatusEnum } from '../../../enum/task.enum';

export class UpdateTaskManagerDto extends PartialType(CreateTaskManagerDto) {
    @IsString()
    status?: TaskStatusEnum;

    @IsDateString()
    reminder_date?: string;
}
