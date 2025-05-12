// trello-backend/src/modules/taskmanager/taskmanager.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManager } from './entities/taskmanager.entity';
import { TaskManagerService } from './taskmanager.service';
import { TaskManagerController } from './taskmanager.controller';
import { TaskManagerRepository } from './taskmanager.repository';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskManager]), UserModule, TaskModule],
  providers: [TaskManagerService, TaskManagerRepository],
  controllers: [TaskManagerController],
  exports: [TaskManagerService],
})
export class TaskManagerModule {}