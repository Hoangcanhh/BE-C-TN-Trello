// trello-backend/src/modules/card/card.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { Card } from './entities/card.entity';
import { Comment } from './entities/card.entity'
import { Attachment } from './entities/card.entity';
import { CreateCardDto, UpdateCardDto, CreateCommentDto, CreateAttachmentDto } from './dto/create-card.dto';
import { ListService } from '../list/list.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CardService {
  constructor(
    private cardRepository: CardRepository,
    private listService: ListService,
    private userService: UserService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const { list_id, assigned_to_id } = createCardDto;

    // Kiểm tra list và user
    const list = await this.listService.findOne(list_id);
    let assigned_to;
    if (assigned_to_id) {
      assigned_to = await this.userService.findUserById(assigned_to_id);
    }

    // Tạo card
    const card = new Card();
    Object.assign(card, createCardDto);
    card.list = list;
    if (assigned_to) {
      card.assigned_to = assigned_to;
    }

    return this.cardRepository.saveCard(card);
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.findAllCards();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardRepository.findCardById(id);
    if (!card) {
      throw new BadRequestException('Card not found');
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);

    // Kiểm tra list và user nếu có cập nhật
    if (updateCardDto.list_id) {
      const list = await this.listService.findOne(updateCardDto.list_id);
      card.list = list;
    }
    if (updateCardDto.assigned_to_id) {
      const assigned_to = await this.userService.findUserById(updateCardDto.assigned_to_id);
      card.assigned_to = assigned_to;
    }

    Object.assign(card, updateCardDto);
    return this.cardRepository.saveCard(card);
  }

  async delete(id: number): Promise<void> {
    const card = await this.findOne(id);
    await this.cardRepository.deleteCard(card);
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { card_id, user_id } = createCommentDto;

    // Kiểm tra card và user
    const card = await this.findOne(card_id);
    const user = await this.userService.findUserById(user_id);

    // Tạo comment
    const comment = new Comment();
    Object.assign(comment, createCommentDto);
    comment.card = card;
    comment.user = user;

    return this.cardRepository.saveComment(comment);
  }

  async findCommentsByCardId(card_id: number): Promise<Comment[]> {
    await this.findOne(card_id); // Kiểm tra card tồn tại
    return this.cardRepository.findCommentsByCardId(card_id);
  }

  async createAttachment(createAttachmentDto: CreateAttachmentDto): Promise<Attachment> {
    const { card_id } = createAttachmentDto;

    // Kiểm tra card
    const card = await this.findOne(card_id);

    // Tạo attachment
    const attachment = new Attachment();
    Object.assign(attachment, createAttachmentDto);
    attachment.card = card;

    return this.cardRepository.saveAttachment(attachment);
  }

  async findAttachmentsByCardId(card_id: number): Promise<Attachment[]> {
    await this.findOne(card_id); // Kiểm tra card tồn tại
    return this.cardRepository.findAttachmentsByCardId(card_id);
  }
}