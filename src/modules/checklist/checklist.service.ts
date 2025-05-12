// trello-backend/src/modules/checklist/checklist.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ChecklistRepository } from './checklist.repository';
import { Checklist } from './entities/checklist.entity';
import { ChecklistItem } from './entities/checklist.entity';
import { CreateChecklistDto, CreateChecklistItemDto, UpdateChecklistItemDto } from './dto/create-checklist.dto';
import { CardService } from '../card/card.service';

@Injectable()
export class ChecklistService {
  constructor(
    private checklistRepository: ChecklistRepository,
    private cardService: CardService,
  ) {}

  async create(createChecklistDto: CreateChecklistDto): Promise<Checklist> {
    const { card_id } = createChecklistDto;

    // Kiểm tra card
    const card = await this.cardService.findOne(card_id);

    // Tạo checklist
    const checklist = new Checklist();
    Object.assign(checklist, createChecklistDto);
    checklist.card = card;

    return this.checklistRepository.saveChecklist(checklist);
  }

  async findAll(): Promise<Checklist[]> {
    return this.checklistRepository.findAllChecklists();
  }

  async findOne(id: number): Promise<Checklist> {
    const checklist = await this.checklistRepository.findChecklistById(id);
    if (!checklist) {
      throw new BadRequestException('Checklist not found');
    }
    return checklist;
  }

  async createItem(createChecklistItemDto: CreateChecklistItemDto): Promise<ChecklistItem> {
    const { checklist_id } = createChecklistItemDto;

    // Kiểm tra checklist
    const checklist = await this.findOne(checklist_id);

    // Tạo item
    const item = new ChecklistItem();
    Object.assign(item, createChecklistItemDto);
    item.checklist = checklist;

    return this.checklistRepository.saveChecklistItem(item);
  }

  async findItemsByChecklistId(checklist_id: number): Promise<ChecklistItem[]> {
    await this.findOne(checklist_id); // Kiểm tra checklist
    return this.checklistRepository.findItemsByChecklistId(checklist_id);
  }

  async updateItem(id: number, updateChecklistItemDto: UpdateChecklistItemDto): Promise<ChecklistItem> {
    const item = await this.checklistRepository.findChecklistItemById(id);
    if (!item) {
      throw new BadRequestException('Checklist item not found');
    }

    Object.assign(item, updateChecklistItemDto);
    return this.checklistRepository.saveChecklistItem(item);
  }
}