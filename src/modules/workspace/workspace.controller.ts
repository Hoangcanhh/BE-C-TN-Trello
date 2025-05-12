// trello-backend/src/modules/workspace/workspace.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Get()
  async findAll() {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.delete(id);
  }
}