// trello-backend/src/modules/activitylog/activitylog.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activitylog.entity';
import { ActivityLogRepository } from './activitylog.repository';
import { CreateActivityLogDto } from './dto/create-activitylog.dto';
import { UserService } from '../user/user.service';
import { BoardService } from '../board/board.service';
import { CardService } from '../card/card.service';

@Injectable()
export class ActivityLogService {
constructor(
@InjectRepository(ActivityLog)
private activityLogRepository: ActivityLogRepository,
private userService: UserService,
private boardService: BoardService,
private cardService: CardService,
) {}

async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
const { user_id, board_id, card_id } = createActivityLogDto;

// Kiểm tra user
const user = await this.userService.findUserById(user_id);

// Kiểm tra board và card nếu có
let board, card;
if (board_id) {
board = await this.boardService.findOne(board_id);
}
if (card_id) {
card = await this.cardService.findOne(card_id);
}

// Tạo activity log
const activityLog = new ActivityLog();
Object.assign(activityLog, createActivityLogDto);
activityLog.user = user;
if (board) activityLog.board = board;
if (card) activityLog.card = card;

return this.activityLogRepository.saveActivityLog(activityLog);
}

async findAll(): Promise<ActivityLog[]> {
return this.activityLogRepository.findAll();
}

async findOne(id: number): Promise<ActivityLog> {
const activityLog = await this.activityLogRepository.findById(id);
if (!activityLog) {
throw new BadRequestException('Activity log not found');
}
return activityLog;
}

async findByBoardId(board_id: number): Promise<ActivityLog[]> {
await this.boardService.findOne(board_id); // Kiểm tra board
return this.activityLogRepository.findByBoardId(board_id);
}

async findByCardId(card_id: number): Promise<ActivityLog[]> {
await this.cardService.findOne(card_id); // Kiểm tra card
return this.activityLogRepository.findByCardId(card_id);
}
}