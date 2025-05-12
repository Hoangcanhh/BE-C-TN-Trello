// trello-backend/src/modules/notification/notification.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserService } from '../user/user.service';
import { CardService } from '../card/card.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: NotificationRepository,
    private userService: UserService,
    private cardService: CardService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { user_id, card_id } = createNotificationDto;

    // Kiểm tra user
    const user = await this.userService.findUserById(user_id);

    // Kiểm tra card nếu có
    let card;
    if (card_id) {
      card = await this.cardService.findOne(card_id);
    }

    // Tạo notification
    const notification = new Notification();
    Object.assign(notification, createNotificationDto);
    notification.user = user;
    if (card) notification.card = card;

    return this.notificationRepository.saveNotification(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.findAll();
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new BadRequestException('Notification not found');
    }
    return notification;
  }

  async findByUserId(user_id: number): Promise<Notification[]> {
    await this.userService.findUserById(user_id); // Kiểm tra user
    return this.notificationRepository.findByUserId(user_id);
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.is_read = true;
    return this.notificationRepository.saveNotification(notification);
  }

  async delete(id: number): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.deleteNotification(notification);
  }
}