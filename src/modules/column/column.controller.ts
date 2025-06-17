import { Controller, Get, Post, Patch, Param, Delete, Query, HttpStatus, HttpCode, Body } from "@nestjs/common"
import  { ColumnService } from "./column.service" // ✅ Import ColumnService
import type { CreateColumnDto } from "./dto/create-column.dto"
import type { UpdateColumnDto } from "./dto/update-column.dto"
import { ColumnDto } from "./dto/column.dto"
import type { ReorderColumnsDto } from "./dto/reorder-columns.dto"
import type { ColumnResponseDto, ColumnsResponseDto } from "./dto/column-response.dto"
import type { Column } from "./entities/column.entities"

@Controller("columns")
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async create(@Body() createColumnDto: CreateColumnDto): Promise<ColumnResponseDto> {
    const column = await this.columnService.create(createColumnDto);
    return {
      status: "success",
      message: "Cột đã được tạo thành công",
      data: this.mapToDto(column),
    };
  }

  @Get()
  async findAll(@Query("boardId") boardId?: string): Promise<ColumnsResponseDto> {
    console.log("📋 GET /columns - boardId:", boardId)
    
    let columns: Column[]
    
    if (boardId) {
      columns = await this.columnService.findAllByBoardId(boardId)
      
      // ✅ If no columns found, create mock data
      if (columns.length === 0) {
        console.log("🧪 No columns found, creating mock data...")
        columns = await this.columnService.createMockColumns(boardId)
      }
    } else {
      columns = await this.columnService.findAll()
    }
    
    return {
      status: "success",
      message: "Lấy danh sách cột thành công",
      data: columns.map(column => this.mapToDto(column)),
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ColumnResponseDto> {
    console.log("🔍 GET /columns/:id - ID:", id)
    const column = await this.columnService.findOne(+id)
    return {
      status: "success",
      message: "Lấy thông tin cột thành công",
      data: this.mapToDto(column),
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateColumnDto: UpdateColumnDto): Promise<ColumnResponseDto> {
    console.log("📝 PATCH /columns/:id - ID:", id, "Data:", updateColumnDto)
    const column = await this.columnService.update(+id, updateColumnDto)
    return {
      status: "success",
      message: "Cột đã được cập nhật thành công",
      data: this.mapToDto(column),
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    console.log("🗑️ DELETE /columns/:id - ID:", id)
    await this.columnService.remove(+id)
    console.log("✅ DELETE completed for ID:", id)
  }

  @Post("reorder")
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorder(@Body() reorderColumnsDto: ReorderColumnsDto): Promise<void> {
    await this.columnService.reorder(reorderColumnsDto.boardId, reorderColumnsDto.columnIds)
  }

  // ✅ Endpoint để tạo mock data
  @Post("mock/:boardId")
  async createMockData(@Param("boardId") boardId: string): Promise<ColumnsResponseDto> {
    console.log("🧪 Creating mock columns for board:", boardId)
    const columns = await this.columnService.createMockColumns(boardId)
    return {
      status: "success",
      message: "Mock data created successfully",
      data: columns.map(column => this.mapToDto(column)),
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
