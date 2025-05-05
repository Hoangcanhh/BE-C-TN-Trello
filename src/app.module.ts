import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board/board.controller';
import { ListModule } from './list/list.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { LabelModule } from './label/label.module';
import { CommentModule } from './comment/comment.module';
import { AttachentModule } from './attachent/attachent.module';
import { ChecklistModule } from './checklist/checklist.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Tên container PostgreSQL trong docker-compose
      port: 5432,
      username: 'trello',
      password: '123465',
      database: 'trello_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Đặt false để không tự động tạo bảng, tránh xung đột với script SQL
    }),
    ListModule,
    BoardModule,
    CardModule,
    LabelModule,
    CommentModule,
    AttachentModule,
    ChecklistModule,
    WorkspaceModule,
    TeamModule,
    TaskModule,
    UserModule,
  ],
  controllers: [AppController, BoardController],
  providers: [AppService],
})
export class AppModule {}
