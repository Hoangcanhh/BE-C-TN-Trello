// trello-backend/src/modules/notification/notification.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  async findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOne(id);
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.notificationService.findByUserId(user_id);
  }

  @Put(':id/read')
  async markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.delete(id);
  }
}