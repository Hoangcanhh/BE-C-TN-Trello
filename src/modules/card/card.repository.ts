import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { Card } from "./entities/card.entity"
import { CreateCardDto } from "./dto/create-card.dto"
import { UpdateCardDto } from "./dto/update-card.dto"
import { MoveCardDto } from "./dto/move-card.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>) {
    this.cardRepository = cardRepository
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    // Nếu không có position, lấy vị trí cuối cùng của thẻ trong cột
    if (createCardDto.position === undefined) {
      const lastCard = await this.cardRepository.findOne({
        where: { columnId: createCardDto.columnId },
        order: { position: "DESC" },
      })
      createCardDto.position = lastCard ? lastCard.position + 1 : 0
    }

    const card = this.cardRepository.create(createCardDto)
    return this.cardRepository.save(card)
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find({
      order: { position: "ASC" },
    })
  }

  async findAllByColumnId(columnId: number): Promise<Card[]> {
    return this.cardRepository.find({
      where: { columnId },
      order: { position: "ASC" },
    })
  }

  async findOne(id: number): Promise<Card> {
    return this.cardRepository.findOne({
      where: { id },
    })
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    await this.cardRepository.update(id, updateCardDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id)
  }

  async move(id: number, moveCardDto: MoveCardDto): Promise<Card> {
    const queryRunner = this.cardRepository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Lấy thông tin thẻ cần di chuyển
      const card = await queryRunner.manager.findOne(Card, {
        where: { id },
      })

      if (!card) {
        throw new Error(`Không tìm thấy thẻ với ID ${id}`)
      }

      const sourceColumnId = card.columnId
      const { targetColumnId, position } = moveCardDto

      // Nếu di chuyển trong cùng một cột
      if (sourceColumnId === targetColumnId) {
        // Cập nhật vị trí của các thẻ khác trong cột
        if (position < card.position) {
          // Di chuyển lên trên: tăng vị trí của các thẻ từ vị trí mới đến vị trí cũ
          await queryRunner.manager
            .createQueryBuilder()
            .update(Card)
            .set({ position: () => "position + 1" })
            .where("columnId = :columnId AND position >= :newPosition AND position < :oldPosition", {
              columnId: sourceColumnId,
              newPosition: position,
              oldPosition: card.position,
            })
            .execute()
        } else if (position > card.position) {
          // Di chuyển xuống dưới: giảm vị trí của các thẻ từ vị trí cũ đến vị trí mới
          await queryRunner.manager
            .createQueryBuilder()
            .update(Card)
            .set({ position: () => "position - 1" })
            .where("columnId = :columnId AND position > :oldPosition AND position <= :newPosition", {
              columnId: sourceColumnId,
              oldPosition: card.position,
              newPosition: position,
            })
            .execute()
        }
      } else {
        // Di chuyển giữa các cột khác nhau

        // 1. Giảm vị trí của các thẻ sau thẻ được di chuyển trong cột nguồn
        await queryRunner.manager
          .createQueryBuilder()
          .update(Card)
          .set({ position: () => "position - 1" })
          .where("columnId = :columnId AND position > :position", {
            columnId: sourceColumnId,
            position: card.position,
          })
          .execute()

        // 2. Tăng vị trí của các thẻ từ vị trí mới trở đi trong cột đích
        await queryRunner.manager
          .createQueryBuilder()
          .update(Card)
          .set({ position: () => "position + 1" })
          .where("columnId = :columnId AND position >= :position", {
            columnId: targetColumnId,
            position,
          })
          .execute()
      }

      // Cập nhật thẻ được di chuyển
      card.columnId = targetColumnId
      card.position = position
      await queryRunner.manager.save(card)

      await queryRunner.commitTransaction()
      return card
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }
}
