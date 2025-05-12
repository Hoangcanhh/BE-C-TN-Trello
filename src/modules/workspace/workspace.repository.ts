// trello-backend/src/modules/workspace/workspace.repository.ts
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceRepository extends Repository<Workspace> {
  async findById(id: number): Promise<Workspace | undefined> {
    return this.findOne({ where: { id }, relations: ['owner'] });
  }

  async findAll(): Promise<Workspace[]> {
    return this.find({ relations: ['owner'] });
  }

  async saveWorkspace(workspace: Workspace): Promise<Workspace> {
    return this.save(workspace);
  }

  async deleteWorkspace(workspace: Workspace): Promise<void> {
    await this.remove(workspace);
  }
}