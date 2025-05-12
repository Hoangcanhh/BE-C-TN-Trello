import { Test, TestingModule } from '@nestjs/testing';
import { TaskmanagerService } from './taskmanager.service';

describe('TaskmanagerService', () => {
  let service: TaskmanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskmanagerService],
    }).compile();

    service = module.get<TaskmanagerService>(TaskmanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
