// trello-backend/src/modules/team/team.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team.entity';
import { CreateTeamDto, AddMemberDto } from './dto/create-team.dto';
import { WorkspaceService } from '../workspace/workspace.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TeamService {
  constructor(
    private teamRepository: TeamRepository,
    private workspaceService: WorkspaceService,
    private userService: UserService,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { workspace_id } = createTeamDto;

    // Kiểm tra workspace nếu có
    let workspace;
    if (workspace_id) {
      workspace = await this.workspaceService.findOne(workspace_id);
    }

    // Tạo team
    const team = new Team();
    Object.assign(team, createTeamDto);
    if (workspace) {
      team.workspace = workspace;
    }

    return this.teamRepository.saveTeam(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.findAllTeams();
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findTeamById(id);
    if (!team) {
      throw new BadRequestException('Team not found');
    }
    return team;
  }

  async addMember(addMemberDto: AddMemberDto): Promise<TeamMember> {
    const { team_id, user_id } = addMemberDto;

    // Kiểm tra team và user
    const team = await this.findOne(team_id);
    const user = await this.userService.findUserById(user_id);

    // Thêm thành viên
    const teamMember = new TeamMember();
    teamMember.team_id = team.id;
    teamMember.user = user;

    return this.teamRepository.saveTeamMember(teamMember);
  }

  async findMembersByTeamId(team_id: number): Promise<TeamMember[]> {
    await this.findOne(team_id); // Kiểm tra team
    return this.teamRepository.findMembersByTeamId(team_id);
  }
}