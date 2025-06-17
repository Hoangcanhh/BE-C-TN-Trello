import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardService } from "./card.service"
import { CardController } from "./card.controller"
import { CardRepository } from "./card.repository"
import { Card } from "./entities/card.entity"
import { ListModule } from "../list/list.module"

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => ListModule)],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService],
})
export class CardModule {}
