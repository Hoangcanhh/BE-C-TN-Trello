import { Injectable, NotFoundException } from "@nestjs/common"
import type { Repository } from "typeorm"
import { Column } from "./entities/column.entities"
import type { CreateColumnDto } from "./dto/create-column.dto"
import type { UpdateColumnDto } from "./dto/update-column.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>) {}

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    console.log("📝 Creating column:", createColumnDto)

    // ✅ Auto-set position if not provided
    if (createColumnDto.position === undefined) {
      const lastColumn = await this.columnRepository.findOne({
        where: { boardId: createColumnDto.boardId },
        order: { position: "DESC" },
      })
      createColumnDto.position = lastColumn ? lastColumn.position + 1 : 0
    }

    const column = this.columnRepository.create(createColumnDto)
    const savedColumn = await this.columnRepository.save(column)
    console.log("✅ Column created:", savedColumn)
    return savedColumn
  }

  async findAll(): Promise<Column[]> {
    return this.columnRepository.find({
      relations: ["cards"],
      order: { position: "ASC" },
    })
  }

  async findAllByBoardId(boardId: string): Promise<Column[]> {
    console.log("🔍 Finding columns for board:", boardId)
    const columns = await this.columnRepository.find({
      where: { boardId },
      relations: ["cards"],
      order: { position: "ASC" },
    })
    console.log("✅ Found columns:", columns.length)
    return columns
  }

  async findOne(id: number): Promise<Column> {
    console.log("🔍 Finding column with ID:", id)

    const column = await this.columnRepository.findOne({
      where: { id },
      relations: ["cards"],
    })

    if (!column) {
      console.log("❌ Column not found with ID:", id)
      // ✅ List all columns for debugging
      const allColumns = await this.columnRepository.find()
      console.log(
        "📋 All columns in database:",
        allColumns.map((c) => ({ id: c.id, title: c.title })),
      )

      throw new NotFoundException(`Không tìm thấy cột với ID ${id}`)
    }

    console.log("✅ Found column:", column.title)
    return column
  }

  async update(id: number, updateColumnDto: UpdateColumnDto): Promise<Column> {
    console.log("📝 Updating column:", id, updateColumnDto)

    const column = await this.findOne(id) // This will throw if not found
    Object.assign(column, updateColumnDto)

    const updatedColumn = await this.columnRepository.save(column)
    console.log("✅ Column updated:", updatedColumn)
    return updatedColumn
  }

  async remove(id: number): Promise<void> {
    console.log("🗑️ Removing column with ID:", id)

    // ✅ Check if column exists first
    const column = await this.findOne(id) // This will throw if not found

    console.log("✅ Found column to delete:", column.title)

    // Delete the column (cards will be deleted due to cascade)
    await this.columnRepository.remove(column)

    console.log("✅ Column deleted successfully")
  }

  async reorder(boardId: string, columnIds: number[]): Promise<void> {
    console.log("🔄 Reordering columns:", boardId, columnIds)

    // ✅ Use transaction for reordering
    const queryRunner = this.columnRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      for (let i = 0; i < columnIds.length; i++) {
        await queryRunner.manager.update(Column, { id: columnIds[i] }, { position: i })
      }

      await queryRunner.commitTransaction()
      console.log("✅ Columns reordered")
    } catch (err) {
      await queryRunner.rollbackTransaction()
      console.error("❌ Failed to reorder columns:", err)
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  // ✅ Method to create mock columns for testing
  async createMockColumns(boardId: string): Promise<Column[]> {
    console.log("🧪 Creating mock columns for board:", boardId)

    const mockColumns = [
      { title: "To Do", position: 0, boardId },
      { title: "In Progress", position: 1, boardId },
      { title: "Done", position: 2, boardId },
    ]

    const createdColumns: Column[] = []

    for (const mockColumn of mockColumns) {
      const column = this.columnRepository.create(mockColumn)
      const savedColumn = await this.columnRepository.save(column)
      createdColumns.push(savedColumn)
      console.log("✅ Mock column created:", savedColumn.title, "ID:", savedColumn.id)
    }

    return createdColumns
  }
}
