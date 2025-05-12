import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachentDto } from './create-attachent.dto';

export class UpdateAttachentDto extends PartialType(CreateAttachentDto) {}
