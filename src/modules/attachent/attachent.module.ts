import { Module } from '@nestjs/common';
import { AttachentService } from './attachent.service';
import { AttachentController } from './attachent.controller';

@Module({
  controllers: [AttachentController],
  providers: [AttachentService],
})
export class AttachentModule {}
