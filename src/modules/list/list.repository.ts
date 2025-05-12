// trello-backend/src/modules/list/list.repository.ts
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListRepository extends Repository<List> {
  async findById(id: number): Promise<List | undefined> {
    return this.findOne({ where: { id }, relations: ['board'] });
  }

  async findAll(): Promise<List[]> {
    return this.find({ relations: ['board'] });
  }

  async saveList(list: List): Promise<List> {
    return this.save(list);
  }

  async deleteList(list: List): Promise<void> {
    await this.remove(list);
  }
}