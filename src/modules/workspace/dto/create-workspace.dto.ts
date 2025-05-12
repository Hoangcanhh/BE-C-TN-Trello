// trello-backend/src/modules/workspace/workspace.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
}

