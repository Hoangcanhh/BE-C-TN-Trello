// trello-backend/src/modules/role/role.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}

export class CreateAccessControlDto {
  @IsNotEmpty()
  role_id: number;

  @IsNotEmpty()
  permission_id: number;
}