// trello-backend/src/modules/task/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { UserModule } from '../user/user.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule, CardModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}