import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

export class AssignLabelDto {
  @IsNumber()
  @IsNotEmpty()
  card_id: number;

  @IsNumber()
  @IsNotEmpty()
  label_id: number;
}