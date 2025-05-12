import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityLogDto } from './create-activitylog.dto';

export class UpdateActivitylogDto extends PartialType(CreateActivityLogDto) {}
