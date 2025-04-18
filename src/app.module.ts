import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
