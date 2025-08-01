import { Test, TestingModule } from '@nestjs/testing';
import { AcoesService } from './acoes.service';

describe('AcoesService', () => {
  let service: AcoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcoesService],
    }).compile();

    service = module.get<AcoesService>(AcoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
