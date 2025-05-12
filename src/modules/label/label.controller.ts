// trello-backend/src/modules/label/label.controller.ts
import { Controller, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto, AssignLabelDto } from './dto/create-label.dto';

@Controller('labels')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  async create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Get()
  async findAll() {
    return this.labelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.labelService.findOne(id);
  }

  @Post('assign')
  async assignLabel(@Body() assignLabelDto: AssignLabelDto) {
    return this.labelService.assignLabel(assignLabelDto);
  }

  @Get('card/:card_id')
  async findLabelsByCardId(@Param('card_id', ParseIntPipe) card_id: number) {
    return this.labelService.findLabelsByCardId(card_id);
  }
}