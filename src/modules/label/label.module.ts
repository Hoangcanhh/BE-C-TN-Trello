import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardLabel, Label } from './entities/label.entity';
import { CardModule } from 'src/modules/card/card.module';
import { LabelRepository } from './label.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Label, CardLabel]), CardModule],
  controllers: [LabelController],
  providers: [LabelService, LabelRepository],
  exports: [LabelService, LabelRepository], 
})
export class LabelModule {}
