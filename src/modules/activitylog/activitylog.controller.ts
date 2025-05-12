import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ActivityLogService } from './activitylog.service';
import { CreateActivityLogDto } from './dto/create-activitylog.dto';

@Controller('activitylogs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  async create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.create(createActivityLogDto);
  }

  @Get()
  async findAll() {
    return this.activityLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogService.findOne(id);
  }

  @Get('board/:board_id')
  async findByBoardId(@Param('board_id', ParseIntPipe) board_id: number) {
    return this.activityLogService.findByBoardId(board_id);
  }

  @Get('card/:card_id')
  async findByCardId(@Param('card_id', ParseIntPipe) card_id: number) {
    return this.activityLogService.findByCardId(card_id);
  }
}