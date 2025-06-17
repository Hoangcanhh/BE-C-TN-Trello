import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ListService } from "./list.service"
import { ListController } from "./list.controller"
import { ListRepository } from "./list.repository"
import { List } from "./entities/list.entity"
import { BoardModule } from "../board/board.module"
import { CardModule } from "../card/card.module"

@Module({
  imports: [TypeOrmModule.forFeature([List]), forwardRef(() => BoardModule),
    forwardRef(() => CardModule),],
  controllers: [ListController],
  providers: [ListService, ListRepository],
  exports: [ListService],
})
export class ListModule {}
