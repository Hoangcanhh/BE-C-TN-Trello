// trello-backend/src/modules/card/card.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Comment } from './entities/card.entity';
import { Attachment } from './entities/card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';
import { ListModule } from '../list/list.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Comment, Attachment]), ListModule, UserModule],
  providers: [CardService, CardRepository],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}