import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  card_id?: number;

  @IsBoolean()
  is_read?: boolean;
}