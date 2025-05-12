// trello-backend/src/modules/taskmanager/taskmanager.repository.ts
import { Repository } from 'typeorm';
import { TaskManager } from './entities/taskmanager.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskManagerRepository extends Repository<TaskManager> {
  async findById(id: number): Promise<TaskManager | undefined> {
    return this.findOne({ where: { id }, relations: ['user', 'task'] });
  }

  async findAll(): Promise<TaskManager[]> {
    return this.find({ relations: ['user', 'task'] });
  }

  async findByUserId(id: number): Promise<TaskManager[]> {
    return this.find({ where: { id }, relations: ['user', 'task'] });
  }

  async saveTaskManager(taskManager: TaskManager): Promise<TaskManager> {
    return this.save(taskManager);
  }

  async deleteTaskManager(taskManager: TaskManager): Promise<void> {
    await this.remove(taskManager);
  }
}