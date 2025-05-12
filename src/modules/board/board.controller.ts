// trello-backend/src/modules/board/board.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(id);
  }
}