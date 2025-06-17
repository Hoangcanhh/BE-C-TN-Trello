import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';
import { BoardModule } from './modules/board/board.module';
import { CardModule } from './modules/card/card.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { TeamModule } from './modules/team/team.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskManagerModule } from './modules/taskmanager/taskmanager.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ColumnModule } from './modules/column/column.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres',
      port: 5432,
      username: 'trello',
      password: '123456',
      database: 'trello_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ListModule,
    BoardModule,
    CardModule,
    ChecklistModule,
    ColumnModule,
    WorkspaceModule,
    TeamModule,
    TaskModule,
    UserModule,
    RoleModule,
    NotificationModule,
    TaskManagerModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
