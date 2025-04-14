import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://trello:123456@mongodb:27017/trello', {
      dbName: 'trello',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
