// trello-backend/src/modules/workspace/workspace.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace]), UserModule],
  providers: [WorkspaceService, WorkspaceRepository],
  controllers: [WorkspaceController],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}