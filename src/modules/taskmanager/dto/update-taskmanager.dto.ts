import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskManagerDto } from './create-taskmanager.dto';
import { IsString, IsDateString } from 'class-validator';

export class UpdateTaskManagerDto extends PartialType(CreateTaskManagerDto) {
    @IsString()
    status?: string;

    @IsDateString()
    reminder_date?: string;
}
