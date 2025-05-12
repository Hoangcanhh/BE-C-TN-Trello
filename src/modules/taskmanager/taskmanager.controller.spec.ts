import { Test, TestingModule } from '@nestjs/testing';
import { TaskmanagerController } from './taskmanager.controller';
import { TaskmanagerService } from './taskmanager.service';

describe('TaskmanagerController', () => {
  let controller: TaskmanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskmanagerController],
      providers: [TaskmanagerService],
    }).compile();

    controller = module.get<TaskmanagerController>(TaskmanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
