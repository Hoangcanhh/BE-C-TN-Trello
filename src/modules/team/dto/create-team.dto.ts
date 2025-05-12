// trello-backend/src/modules/team/team.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  workspace_id?: number;
}

export class AddMemberDto {
  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}