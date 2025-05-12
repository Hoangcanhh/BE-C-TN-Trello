// trello-backend/src/modules/list/list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), BoardModule],
  providers: [ListService, ListRepository],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}