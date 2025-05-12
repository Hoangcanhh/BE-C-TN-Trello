// trello-backend/src/modules/board/board.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { UserService } from '../user/user.service';
import { WorkspaceService } from '../workspace/workspace.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
    private userService: UserService,
    private workspaceService: WorkspaceService,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.findAll();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new BadRequestException('Board not found');
    }
    return board;
  }
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const { owner_id, workspace_id } = createBoardDto;

    // Kiểm tra owner
    const owner = await this.userService.findUserById(owner_id);

    // Kiểm tra workspace nếu có
    let workspace;
    if (workspace_id) {
      workspace = await this.workspaceService.findOne(workspace_id);
    }

    // Tạo board
    const board = new Board();
    Object.assign(board, createBoardDto);
    board.owner = owner;
    if (workspace) {
      board.workspace = workspace;
    }

    return this.boardRepository.saveBoard(board);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.findOne(id);
    Object.assign(board, updateBoardDto);
    return this.boardRepository.saveBoard(board);
  }

  async delete(id: number): Promise<void> {
    const board = await this.findOne(id);
    await this.boardRepository.deleteBoard(board);
  }
}