// trello-backend/src/modules/list/list.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto } from './dto/create-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  async findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.listService.delete(id);
  }
}