// trello-backend/src/modules/activitylog/activitylog.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activitylog.entity';
import { ActivityLogService } from './activitylog.service';
import { ActivityLogController } from './activitylog.controller';
import { ActivityLogRepository } from './activitylog.repository';
import { UserModule } from '../user/user.module';
import { BoardModule } from '../board/board.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog]), UserModule, BoardModule, CardModule],
  providers: [ActivityLogService, ActivityLogRepository],
  controllers: [ActivityLogController],
  exports: [ActivityLogService],
})
export class ActivityLogModule {}