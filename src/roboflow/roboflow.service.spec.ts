import { Test, TestingModule } from '@nestjs/testing';
import { RoboflowService } from './roboflow.service';

describe('RoboflowService', () => {
  let service: RoboflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoboflowService],
    }).compile();

    service = module.get<RoboflowService>(RoboflowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
