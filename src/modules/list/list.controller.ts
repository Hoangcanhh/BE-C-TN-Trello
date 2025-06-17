import { Controller, Get, Post, Param, Query } from "@nestjs/common"
// import { UseGuards, Req } from "@nestjs/common"
// import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards"
import { ListService } from "./list.service"
import type { CreateListDto } from "./dto/create-list.dto"
import { ListDto } from "./dto/list.dto"
import type { ListResponseDto, ListsResponseDto } from "./dto/list-response.dto"
import type { List } from "./entities/list.entity"

@Controller("lists")
// @UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(createListDto: CreateListDto): Promise<ListResponseDto> {
    const userId = 1 // Mock user ID
    const list = await this.listService.create(createListDto, userId)
    return {
      status: "success",
      message: "Danh sách đã được tạo thành công",
      data: this.mapToDto(list),
    }
  }

  @Get()
  async findAll(@Query("boardId") boardId: string | undefined): Promise<ListsResponseDto> {
    const userId = 1 // Mock user ID
    const lists = boardId
      ? await this.listService.findAllByBoardId(boardId, userId)
      : await this.listService.findAll()
    return {
      status: "success",
      message: "Lấy danh sách thành công",
      data: lists.map((list) => this.mapToDto(list)),
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ListResponseDto> {
    const list = await this.listService.findOne(id)
    return {
      status: "success",
      message: "Lấy thông tin danh sách thành công",
      data: this.mapToDto(list),
    }
  }

  private mapToDto(list: List): ListDto {
    const dto = new ListDto()
    dto.id = list.id
    dto.title = list.title
    dto.boardId = list.boardId
    dto.position = list.position
    dto.createdAt = list.createdAt
    dto.updatedAt = list.updatedAt
    dto.cards =
      list.cards?.map((card) => {
        return {
          id: card.id,
          title: card.title,
          description: card.description,
          type: card.type,
          count: card.count,
          columnId: card.columnId,
          position: card.position,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
        }
      }) || []
    return dto
  }
}
