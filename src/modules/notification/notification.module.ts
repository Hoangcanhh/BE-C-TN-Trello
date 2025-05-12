// trello-backend/src/modules/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { UserModule } from '../user/user.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserModule, CardModule],
  providers: [NotificationService, NotificationRepository],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}