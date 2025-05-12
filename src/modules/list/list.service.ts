// trello-backend/src/modules/list/list.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListRepository } from './list.repository';
import { CreateListDto, UpdateListDto } from './dto/create-list.dto';
import { BoardService } from '../board/board.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: ListRepository,
    private boardService: BoardService,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const { board_id } = createListDto;

    // Kiểm tra board
    const board = await this.boardService.findOne(board_id);

    // Tạo list
    const list = new List();
    Object.assign(list, createListDto);
    list.board = board;

    return this.listRepository.saveList(list);
  }

  async findAll(): Promise<List[]> {
    return this.listRepository.findAll();
  }

  async findOne(id: number): Promise<List> {
    const list = await this.listRepository.findById(id);
    if (!list) {
      throw new BadRequestException('List not found');
    }
    return list;
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.findOne(id);
    Object.assign(list, updateListDto);
    return this.listRepository.saveList(list);
  }

  async delete(id: number): Promise<void> {
    const list = await this.findOne(id);
    await this.listRepository.deleteList(list);
  }
}