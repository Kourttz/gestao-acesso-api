import { Test, TestingModule } from '@nestjs/testing';
import { FuncionalidadesService } from './funcionalidades.service';

describe('FuncionalidadesService', () => {
  let service: FuncionalidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionalidadesService],
    }).compile();

    service = module.get<FuncionalidadesService>(FuncionalidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
