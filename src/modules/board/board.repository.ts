// trello-backend/src/modules/board/board.repository.ts
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardRepository extends Repository<Board> {
  async findById(id: number): Promise<Board | undefined> {
    return this.findOne({ where: { id }, relations: ['owner', 'workspace'] });
  }

  async findAll(): Promise<Board[]> {
    return this.find({ relations: ['owner', 'workspace'] });
  }

  async saveBoard(board: Board): Promise<Board> {
    return this.save(board);
  }

  async deleteBoard(board: Board): Promise<void> {
    await this.remove(board);
  }
}