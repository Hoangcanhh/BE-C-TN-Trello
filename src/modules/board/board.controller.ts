import { Controller, Get, Post, Param } from "@nestjs/common"
import { BoardService } from "./board.service"
import type { CreateBoardDto } from "./dto/create-board.dto"
import { BoardDto } from "./dto/board.dto"
import type { BoardResponseDto, BoardsResponseDto } from "./dto/board-response.dto"
import type { Board } from "./entities/board.entity"

@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    console.log("📝 Creating board:", createBoardDto)
    const userId = 1 // Mock user ID
    const board = await this.boardService.create(createBoardDto, userId)
    return {
      status: "success",
      message: "Board created successfully",
      data: this.mapToDto(board),
    }
  }

  @Get()
  async findAll(): Promise<BoardsResponseDto> {
    console.log("📋 Getting all boards...")
    const userId = 1 // Mock user ID
    const boards = await this.boardService.findAll(userId)
    console.log("✅ Returning boards:", boards.length)

    return {
      status: "success",
      message: "Boards retrieved successfully",
      data: boards.map((board) => this.mapToDto(board)),
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<BoardResponseDto> {
    console.log("🔍 Getting board:", id)
    const board = await this.boardService.findOne(id)
    return {
      status: "success",
      message: "Board retrieved successfully",
      data: this.mapToDto(board),
    }
  }

  private mapToDto(board: Board): BoardDto {
    const dto = new BoardDto()
    dto.id = board.id
    dto.title = board.title
    dto.description = board.description
    dto.ownerId = board.ownerId
    dto.backgroundColor = board.backgroundColor
    dto.backgroundImage = board.backgroundImage
    dto.starred = board.starred
    dto.active = board.active
    dto.createdAt = board.createdAt
    dto.updatedAt = board.updatedAt

    if (board.lists) {
      dto.lists = board.lists.map((list) => ({
        id: list.id,
        title: list.title,
        boardId: list.boardId,
        position: list.position,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        cards:
          list.cards?.map((card) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            type: card.type,
            count: card.count,
            columnId: card.columnId,
            position: card.position,
            createdAt: card.createdAt,
            updatedAt: card.updatedAt,
          })) || [],
      }))
    }

    return dto
  }
}
