import { Test, TestingModule } from '@nestjs/testing';
import { AttachentService } from './attachent.service';

describe('AttachentService', () => {
  let service: AttachentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachentService],
    }).compile();

    service = module.get<AttachentService>(AttachentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
