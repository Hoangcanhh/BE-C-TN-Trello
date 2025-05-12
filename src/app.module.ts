import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';
import { BoardModule } from './modules/board/board.module';
import { CardModule } from './modules/card/card.module';
import { LabelModule } from './modules/label/label.module';
import { AttachentModule } from './modules/attachent/attachent.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { TeamModule } from './modules/team/team.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ActivityLogModule } from './modules/activitylog/activitylog.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskManagerModule } from './modules/taskmanager/taskmanager.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_PORT ||'localhost', // Tên container PostgreSQL trong docker-compose
      port: 5432,
      username: 'trello',
      password: '123456',
      database: 'trello_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // Đặt false để không tự động tạo bảng, tránh xung đột với script SQL
      logging: true, // Bật logging để xem các truy vấn SQL
    }),
    ListModule,
    BoardModule,
    CardModule,
    LabelModule,
    AttachentModule,
    ChecklistModule,
    WorkspaceModule,
    TeamModule,
    TaskModule,
    UserModule,
    RoleModule,
    ActivityLogModule,
    NotificationModule,
    TaskManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
