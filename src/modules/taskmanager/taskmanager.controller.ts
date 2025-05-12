// trello-backend/src/modules/taskmanager/taskmanager.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TaskManagerService } from './taskmanager.service';
import { CreateTaskManagerDto } from './dto/create-taskmanager.dto';
import { UpdateTaskManagerDto } from './dto/update-taskmanager.dto';

@Controller('taskmanagers')
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @Post()
  async create(@Body() createTaskManagerDto: CreateTaskManagerDto) {
    return this.taskManagerService.create(createTaskManagerDto);
  }

  @Get()
  async findAll() {
    return this.taskManagerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskManagerService.findOne(id);
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.taskManagerService.findByUserId(user_id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskManagerDto: UpdateTaskManagerDto) {
    return this.taskManagerService.update(id, updateTaskManagerDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskManagerService.delete(id);
  }
}