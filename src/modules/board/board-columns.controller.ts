import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards"
import { CurrentUser } from "../../auth/decorator/current-user.decorator"
import type { UserPayload } from "../../auth/interface/user-payload.interface"
import { ColumnService } from "../column/column.service"
import { BoardService } from "./board.service"
import type { CreateColumnDto } from "../column/dto/create-column.dto"
import { ColumnDto } from "../column/dto/column.dto"
import type { ColumnResponseDto, ColumnsResponseDto } from "../column/dto/column-response.dto"
import type { Column } from "../column/entities/column.entities"

@Controller("boards/columns")
@UseGuards(JwtAuthGuard)
export class BoardColumnsController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly boardService: BoardService,
  ) {}

  @Post(":boardId")
  async create(
    boardId: string,
    @Body() createColumnDto: CreateColumnDto,
    @CurrentUser() user: UserPayload,
  ): Promise<ColumnResponseDto> {
    const userId = user.id

    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(boardId, userId)

    // Đảm bảo boardId trong DTO khớp với boardId trong URL
    createColumnDto.boardId = boardId

    const column = await this.columnService.create(createColumnDto)
    return {
      status: "success",
      message: "Cột đã được tạo thành công",
      data: this.mapToDto(column),
    }
  }

  @Get(":boardId")
  async findAll(boardId: string, @CurrentUser() user: UserPayload): Promise<ColumnsResponseDto> {
    const userId = user.id

    // Kiểm tra xem bảng có tồn tại và người dùng có quyền truy cập không
    await this.boardService.findOne(boardId, userId)

    const columns = await this.columnService.findAllByBoardId(boardId)
    return {
      status: "success",
      message: "Lấy danh sách cột thành công",
      data: columns.map((column) => this.mapToDto(column)),
    }
  }

  private mapToDto(column: Column): ColumnDto {
    const dto = new ColumnDto()
    dto.id = column.id
    dto.title = column.title
    dto.boardId = column.boardId
    dto.position = column.position
    dto.createdAt = column.createdAt
    dto.updatedAt = column.updatedAt
    dto.cards =
      column.cards?.map((card) => {
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
