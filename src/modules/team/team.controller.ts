// trello-backend/src/modules/team/team.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, AddMemberDto } from './dto/create-team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Post('members')
  async addMember(@Body() addMemberDto: AddMemberDto) {
    return this.teamService.addMember(addMemberDto);
  }

  @Get(':id/members')
  async findMembersByTeamId(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findMembersByTeamId(id);
  }
}