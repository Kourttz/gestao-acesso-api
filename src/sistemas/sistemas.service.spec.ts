import { Test, TestingModule } from '@nestjs/testing';
import { SistemasService } from './sistemas.service';

describe('SistemasService', () => {
  let service: SistemasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SistemasService],
    }).compile();

    service = module.get<SistemasService>(SistemasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
