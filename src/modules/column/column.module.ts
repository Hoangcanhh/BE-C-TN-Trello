import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ColumnService } from "./column.service"
import { ColumnController } from "./column.controller"
import { ColumnCardsController } from "./column-cards.controller"
import { Column } from "./entities/column.entities"
import { CardModule } from "../card/card.module"
import { BoardModule } from "../board/board.module"

@Module({
  imports: [TypeOrmModule.forFeature([Column]), forwardRef(() => CardModule), forwardRef(() => BoardModule)],
  controllers: [ColumnController, ColumnCardsController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
