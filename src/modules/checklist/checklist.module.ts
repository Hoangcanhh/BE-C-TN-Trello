// trello-backend/src/modules/checklist/checklist.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';
import { ChecklistItem } from './entities/checklist.entity';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { ChecklistRepository } from './checklist.repository';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist, ChecklistItem]), CardModule],
  providers: [ChecklistService, ChecklistRepository],
  controllers: [ChecklistController],
  exports: [ChecklistService],
})
export class ChecklistModule {}