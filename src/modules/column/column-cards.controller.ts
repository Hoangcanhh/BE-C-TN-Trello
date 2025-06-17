import { Controller, Get, Post, Body } from "@nestjs/common"
import { CardService } from "../card/card.service"
import { ColumnService } from "./column.service"
import { CreateCardDto } from "../card/dto/create-card.dto"
import { CardDto } from "../card/dto/card.dto"
import { CardResponseDto, CardsResponseDto } from "../card/dto/card-response.dto"
import { Card } from "../card/entities/card.entity"

@Controller("columns/:columnId/cards")
export class ColumnCardsController {
  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService,
  ) {}

  @Post()
  async create(columnId: string, @Body() createCardDto: CreateCardDto): Promise<CardResponseDto> {
    // Kiểm tra xem cột có tồn tại không
    await this.columnService.findOne(+columnId)

    // Đảm bảo columnId trong DTO khớp với columnId trong URL
    createCardDto.columnId = +columnId

    const card = await this.cardService.create(createCardDto)
    return {
      status: "success",
      message: "Thẻ đã được tạo thành công",
      data: this.mapToDto(card),
    }
  }

  @Get()
  async findAll(columnId: string): Promise<CardsResponseDto> {
    // Kiểm tra xem cột có tồn tại không
    await this.columnService.findOne(+columnId)

    const cards = await this.cardService.findAllByColumnId(+columnId)
    return {
      status: "success",
      message: "Lấy danh sách thẻ thành công",
      data: cards.map((card) => this.mapToDto(card)),
    }
  }

  private mapToDto(card: Card): CardDto {
    const dto = new CardDto()
    dto.id = card.id
    dto.title = card.title
    dto.description = card.description
    dto.type = card.type
    dto.count = card.count
    dto.columnId = card.columnId
    dto.position = card.position
    dto.createdAt = card.createdAt
    dto.updatedAt = card.updatedAt
    return dto
  }
}
