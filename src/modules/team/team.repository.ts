// trello-backend/src/modules/team/team.repository.ts
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMemberRepo: Repository<TeamMember>,
  ) {}

  async findTeamById(id: number): Promise<Team | undefined> {
    return this.teamRepo.findOne({ where: { id }, relations: ['workspace'] });
  }

  async findAllTeams(): Promise<Team[]> {
    return this.teamRepo.find({ relations: ['workspace'] });
  }

  async saveTeam(team: Team): Promise<Team> {
    return this.teamRepo.save(team);
  }

  async findMembersByTeamId(team_id: number): Promise<TeamMember[]> {
    return this.teamMemberRepo.find({ where: { team_id }, relations: ['user'] });
  }

  async saveTeamMember(teamMember: TeamMember): Promise<TeamMember> {
    return this.teamMemberRepo.save(teamMember);
  }
}