import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { CardRepository } from "./card.repository"
import { CreateCardDto } from "./dto/create-card.dto"
import { UpdateCardDto } from "./dto/update-card.dto"
import { MoveCardDto } from "./dto/move-card.dto"
import { Card } from "./entities/card.entity"

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardRepository.create(createCardDto)
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.findAll()
  }

  async findAllByColumnId(columnId: number): Promise<Card[]> {
    return this.cardRepository.findAllByColumnId(columnId)
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne(id)
    if (!card) {
      throw new NotFoundException(`Không tìm thấy thẻ với ID ${id}`)
    }
    return card
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id)

    // Nếu đang cập nhật columnId, kiểm tra xem có hợp lệ không
    if (updateCardDto.columnId && updateCardDto.columnId !== card.columnId) {
      throw new BadRequestException(
        "Không thể thay đổi cột của thẻ qua phương thức này. Hãy sử dụng API di chuyển thẻ.",
      )
    }

    return this.cardRepository.update(id, updateCardDto)
  }

  async remove(id: number): Promise<void> {
    const card = await this.findOne(id)
    await this.cardRepository.remove(id)
  }

  async move(id: number, moveCardDto: MoveCardDto): Promise<Card> {
    const card = await this.findOne(id)
    return this.cardRepository.move(id, moveCardDto)
  }
}
