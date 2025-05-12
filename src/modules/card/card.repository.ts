// trello-backend/src/modules/card/card.repository.ts
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Comment } from './entities/card.entity';
import { Attachment } from './entities/card.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private cardRepo: Repository<Card>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Attachment)
    private attachmentRepo: Repository<Attachment>,
  ) {}

  // Card
  async findCardById(id: number): Promise<Card | undefined> {
    return this.cardRepo.findOne({ where: { id }, relations: ['list', 'assigned_to'] });
  }

  async findAllCards(): Promise<Card[]> {
    return this.cardRepo.find({ relations: ['list', 'assigned_to'] });
  }

  async saveCard(card: Card): Promise<Card> {
    return this.cardRepo.save(card);
  }

  async deleteCard(card: Card): Promise<void> {
    await this.cardRepo.remove(card);
  }

  // Comment
  async findCommentsByCardId(id: number): Promise<Comment[]> {
    return this.commentRepo.find({ where: { id }, relations: ['user'] });
  }

  async saveComment(comment: Comment): Promise<Comment> {
    return this.commentRepo.save(comment);
  }

  // Attachment
  async findAttachmentsByCardId(id: number): Promise<Attachment[]> {
    return this.attachmentRepo.find({ where: { id } });
  }

  async saveAttachment(attachment: Attachment): Promise<Attachment> {
    return this.attachmentRepo.save(attachment);
  }
}