import { Controller, Get, Post, Patch, Param, Delete, Query, HttpStatus, HttpCode } from "@nestjs/common"
import { CardService } from "./card.service"
import { CreateCardDto } from "./dto/create-card.dto"
import { UpdateCardDto } from "./dto/update-card.dto"
import { MoveCardDto } from "./dto/move-card.dto"
import { CardDto } from "./dto/card.dto"
import { CardResponseDto, CardsResponseDto } from "./dto/card-response.dto"
import { Card } from "./entities/card.entity"

@Controller("cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(createCardDto: CreateCardDto): Promise<CardResponseDto> {
    const card = await this.cardService.create(createCardDto)
    return {
      status: "success",
      message: "Thẻ đã được tạo thành công",
      data: this.mapToDto(card),
    }
  }

  @Get()
  async findAll(@Query("columnId") columnId?: string): Promise<CardsResponseDto> {
    const cards = columnId 
      ? await this.cardService.findAllByColumnId(+columnId)
      : await this.cardService.findAll()
    return {
      status: "success",
      message: "Lấy danh sách thẻ thành công",
      data: cards.map(card => this.mapToDto(card)),
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CardResponseDto> {
    const card = await this.cardService.findOne(+id)
    return {
      status: "success",
      message: "Lấy thông tin thẻ thành công",
      data: this.mapToDto(card),
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, updateCardDto: UpdateCardDto): Promise<CardResponseDto> {
    const card = await this.cardService.update(+id, updateCardDto)
    return {
      status: "success",
      message: "Thẻ đã được cập nhật thành công",
      data: this.mapToDto(card),
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    await this.cardService.remove(+id)
  }

  @Post(":id/move")
  async move(@Param("id") id: string, moveCardDto: MoveCardDto): Promise<CardResponseDto> {
    const card = await this.cardService.move(+id, moveCardDto)
    return {
      status: "success",
      message: "Thẻ đã được di chuyển thành công",
      data: this.mapToDto(card),
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
