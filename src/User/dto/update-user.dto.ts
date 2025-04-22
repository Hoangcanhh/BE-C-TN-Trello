import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsString()
  username?: string;

  @IsEmail()
  email?: string;

  @IsString()
  avatar?: string;

  @IsString()
  phone_number?: string;

  @IsString()
  address?: string;
}
