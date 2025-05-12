// trello-backend/src/modules/label/label.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { LabelRepository } from './label.repository';
import { Label } from './entities/label.entity';
import { CardLabel } from './entities/label.entity';
import { CreateLabelDto, AssignLabelDto } from './dto/create-label.dto';
import { CardService } from '../card/card.service';

@Injectable()
export class LabelService {
  constructor(
    private labelRepository: LabelRepository,
    private cardService: CardService,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const label = new Label();
    Object.assign(label, createLabelDto);
    return this.labelRepository.saveLabel(label);
  }

  async findAll(): Promise<Label[]> {
    return this.labelRepository.findAllLabels();
  }

  async findOne(id: number): Promise<Label> {
    const label = await this.labelRepository.findLabelById(id);
    if (!label) {
      throw new BadRequestException('Label not found');
    }
    return label;
  }

  async assignLabel(assignLabelDto: AssignLabelDto): Promise<CardLabel> {
    const { card_id, label_id } = assignLabelDto;

    // Kiểm tra card và label
    await this.cardService.findOne(card_id);
    await this.findOne(label_id);

    // Gán label cho card
    const cardLabel = new CardLabel();
    cardLabel.card_id = card_id;
    cardLabel.label_id = label_id;

    return this.labelRepository.saveCardLabel(cardLabel);
  }

  async findLabelsByCardId(card_id: number): Promise<CardLabel[]> {
    await this.cardService.findOne(card_id); // Kiểm tra card
    return this.labelRepository.findLabelsByCardId(card_id);
  }
}