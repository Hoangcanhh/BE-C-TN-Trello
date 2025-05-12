// trello-backend/src/modules/taskmanager/taskmanager.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskManager } from './entities/taskmanager.entity';
import { TaskManagerRepository } from './taskmanager.repository';
import { CreateTaskManagerDto } from './dto/create-taskmanager.dto';
import { UpdateTaskManagerDto } from './dto/update-taskmanager.dto';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(TaskManager)
    private taskManagerRepository: TaskManagerRepository,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  async create(createTaskManagerDto: CreateTaskManagerDto): Promise<TaskManager> {
    const { user_id, task_id } = createTaskManagerDto;

    // Kiểm tra user và task
    const user = await this.userService.findUserById(user_id);
    const task = await this.taskService.findOne(task_id);

    // Tạo task manager
    const taskManager = new TaskManager();
    Object.assign(taskManager, createTaskManagerDto);
    taskManager.user = user;
    taskManager.task = task;

    return this.taskManagerRepository.saveTaskManager(taskManager);
  }

  async findAll(): Promise<TaskManager[]> {
    return this.taskManagerRepository.findAll();
  }

  async findOne(id: number): Promise<TaskManager> {
    const taskManager = await this.taskManagerRepository.findById(id);
    if (!taskManager) {
      throw new BadRequestException('TaskManager not found');
    }
    return taskManager;
  }

  async findByUserId(user_id: number): Promise<TaskManager[]> {
    await this.userService.findUserById(user_id); // Kiểm tra user
    return this.taskManagerRepository.findByUserId(user_id);
  }

  async update(id: number, updateTaskManagerDto: UpdateTaskManagerDto): Promise<TaskManager> {
    const taskManager = await this.findOne(id);
    Object.assign(taskManager, updateTaskManagerDto);
    return this.taskManagerRepository.saveTaskManager(taskManager);
  }

  async delete(id: number): Promise<void> {
    const taskManager = await this.findOne(id);
    await this.taskManagerRepository.deleteTaskManager(taskManager);
  }
}