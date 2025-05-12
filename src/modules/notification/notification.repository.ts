// trello-backend/src/modules/notification/notification.repository.ts
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository extends Repository<Notification> {
  async findById(id: number): Promise<Notification | undefined> {
    return this.findOne({ where: { id }, relations: ['user', 'card'] });
  }

  async findAll(): Promise<Notification[]> {
    return this.find({ relations: ['user', 'card'] });
  }

  async findByUserId(id: number): Promise<Notification[]> {
    return this.find({ where: { id }, relations: ['user', 'card'] });
  }

  async saveNotification(notification: Notification): Promise<Notification> {
    return this.save(notification);
  }

  async deleteNotification(notification: Notification): Promise<void> {
    await this.remove(notification);
  }
}