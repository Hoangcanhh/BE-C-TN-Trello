// trello-backend/src/modules/card/card.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto, CreateCommentDto, CreateAttachmentDto } from './dto/create-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.delete(id);
  }

  @Post('comments')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.cardService.createComment(createCommentDto);
  }

  @Get(':id/comments')
  async findCommentsByCardId(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findCommentsByCardId(id);
  }

  @Post('attachments')
  async createAttachment(@Body() createAttachmentDto: CreateAttachmentDto) {
    return this.cardService.createAttachment(createAttachmentDto);
  }

  @Get(':id/attachments')
  async findAttachmentsByCardId(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findAttachmentsByCardId(id);
  }
}