// trello-backend/src/modules/team/team.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMember]), WorkspaceModule, UserModule],
  providers: [TeamService, TeamRepository],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}