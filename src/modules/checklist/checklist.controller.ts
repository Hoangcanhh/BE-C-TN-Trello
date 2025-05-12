// trello-backend/src/modules/checklist/checklist.controller.ts
import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto, CreateChecklistItemDto, UpdateChecklistItemDto } from './dto/create-checklist.dto';

@Controller('checklists')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistService.create(createChecklistDto);
  }

  @Get()
  async findAll() {
    return this.checklistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.checklistService.findOne(id);
  }

  @Post('items')
  async createItem(@Body() createChecklistItemDto: CreateChecklistItemDto) {
    return this.checklistService.createItem(createChecklistItemDto);
  }

  @Get(':id/items')
  async findItemsByChecklistId(@Param('id', ParseIntPipe) id: number) {
    return this.checklistService.findItemsByChecklistId(id);
  }

  @Put('items/:id')
  async updateItem(@Param('id', ParseIntPipe) id: number, @Body() updateChecklistItemDto: UpdateChecklistItemDto) {
    return this.checklistService.updateItem(id, updateChecklistItemDto);
  }
}