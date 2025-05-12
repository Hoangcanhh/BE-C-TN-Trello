// trello-backend/src/modules/checklist/checklist.repository.ts
import { Repository } from 'typeorm';
import { Checklist } from './entities/checklist.entity';
import { ChecklistItem } from './entities/checklist.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChecklistRepository {
  constructor(
    @InjectRepository(Checklist)
    private checklistRepo: Repository<Checklist>,
    @InjectRepository(ChecklistItem)
    private checklistItemRepo: Repository<ChecklistItem>,
  ) {}

  async findChecklistById(id: number): Promise<Checklist | undefined> {
    return this.checklistRepo.findOne({ where: { id }, relations: ['card'] });
  }

  async findAllChecklists(): Promise<Checklist[]> {
    return this.checklistRepo.find({ relations: ['card'] });
  }

  async saveChecklist(checklist: Checklist): Promise<Checklist> {
    return this.checklistRepo.save(checklist);
  }

  async findItemsByChecklistId(id: number): Promise<ChecklistItem[]> {
    return this.checklistItemRepo.find({ where: { id }, relations: ['checklist'] });
  }

  async findChecklistItemById(id: number): Promise<ChecklistItem | undefined> {
    return this.checklistItemRepo.findOne({ where: { id } });
  }

  async saveChecklistItem(item: ChecklistItem): Promise<ChecklistItem> {
    return this.checklistItemRepo.save(item);
  }
}