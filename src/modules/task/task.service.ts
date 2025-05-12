// trello-backend/src/modules/task/task.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from '../user/user.service';
import { CardService } from '../card/card.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
    private userService: UserService,
    private cardService: CardService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { assigned_to_id, card_id } = createTaskDto;

    // Kiểm tra user và card
    const assigned_to = await this.userService.findUserById(assigned_to_id);
    const card = await this.cardService.findOne(card_id);

    // Tạo task
    const task = new Task();
    Object.assign(task, createTaskDto);
    task.assigned_to = assigned_to;
    task.card = card;

    return this.taskRepository.saveTask(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    // Kiểm tra user nếu có cập nhật
    if (updateTaskDto.assigned_to_id) {
      const assigned_to = await this.userService.findUserById(updateTaskDto.assigned_to_id);
      task.assigned_to = assigned_to;
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.saveTask(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.deleteTask(task);
  }
}