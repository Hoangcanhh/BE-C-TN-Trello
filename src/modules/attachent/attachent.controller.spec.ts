import { Test, TestingModule } from '@nestjs/testing';
import { AttachentController } from './attachent.controller';
import { AttachentService } from './attachent.service';

describe('AttachentController', () => {
  let controller: AttachentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachentController],
      providers: [AttachentService],
    }).compile();

    controller = module.get<AttachentController>(AttachentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
