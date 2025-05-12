// trello-backend/src/modules/activitylog/activitylog.repository.ts
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activitylog.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityLogRepository extends Repository<ActivityLog> {
  async findById(id: number): Promise<ActivityLog | undefined> {
    return this.findOne({ where: { id }, relations: ['user', 'board', 'card'] });
  }

  async findAll(): Promise<ActivityLog[]> {
    return this.find({ relations: ['user', 'board', 'card'] });
  }

  async findByBoardId(id: number): Promise<ActivityLog[]> {
    return this.find({ where: { id }, relations: ['user', 'board', 'card'] });
  }

  async findByCardId(id: number): Promise<ActivityLog[]> {
    return this.find({ where: { id }, relations: ['user', 'board', 'card'] });
  }

  async saveActivityLog(activityLog: ActivityLog): Promise<ActivityLog> {
    return this.save(activityLog);
  }
}