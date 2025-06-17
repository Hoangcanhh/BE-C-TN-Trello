import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardService } from "./board.service"
import { BoardController } from "./board.controller"
import { BoardColumnsController } from "./board-columns.controller"
import { BoardMembersController } from "./board-members.controller"
import { BoardMemberRepository } from "./board-member.repository"
import { BoardMemberService } from "./board-member.service"
import { Board } from "./entities/board.entity"
import { BoardMember } from "./entities/board-member.entity"
import { ColumnModule } from "../column/column.module"
import { UserModule } from "../user/user.module"
import { BoardResponseDto } from "./dto/board-response.dto"


@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardMember]), UserModule, forwardRef(() => ColumnModule)],
  controllers: [BoardController, BoardColumnsController, BoardMembersController],
  providers: [BoardService, BoardMemberService, BoardMemberRepository],
  exports: [BoardService, BoardMemberService],
})
export class BoardModule {}
