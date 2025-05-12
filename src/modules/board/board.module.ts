import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { Board } from './entities/board.entity'; 
import { UserModule } from 'src/modules/user/user.module';
import { WorkspaceModule } from 'src/modules/workspace/workspace.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Board]),  UserModule, WorkspaceModule], 
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
  
})
export class BoardModule {}
