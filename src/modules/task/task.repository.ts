// trello-backend/src/modules/task/task.repository.ts
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  async findById(id: number): Promise<Task | undefined> {
    return this.findOne({ where: { id }, relations: ['assigned_to', 'card'] });
  }

  async findAll(): Promise<Task[]> {
    return this.find({ relations: ['assigned_to', 'card'] });
  }

  async saveTask(task: Task): Promise<Task> {
    return this.save(task);
  }

  async deleteTask(task: Task): Promise<void> {
    await this.remove(task);
  }
}