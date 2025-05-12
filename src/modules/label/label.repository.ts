// trello-backend/src/modules/label/label.repository.ts
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { CardLabel } from './entities/label.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LabelRepository {
  constructor(
    @InjectRepository(Label)
    private labelRepo: Repository<Label>,
    @InjectRepository(CardLabel)
    private cardLabelRepo: Repository<CardLabel>,
  ) {}

  async findLabelById(id: number): Promise<Label | undefined> {
    return this.labelRepo.findOne({ where: { id } });
  }

  async findAllLabels(): Promise<Label[]> {
    return this.labelRepo.find();
  }

  async saveLabel(label: Label): Promise<Label> {
    return this.labelRepo.save(label);
  }

  async findLabelsByCardId(card_id: number): Promise<CardLabel[]> {
    return this.cardLabelRepo.find({ where: { card_id } });
  }

  async saveCardLabel(cardLabel: CardLabel): Promise<CardLabel> {
    return this.cardLabelRepo.save(cardLabel);
  }
}