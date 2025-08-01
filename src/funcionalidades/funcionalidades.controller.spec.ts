import { Test, TestingModule } from '@nestjs/testing';
import { FuncionalidadesController } from './funcionalidades.controller';

describe('FuncionalidadesController', () => {
  let controller: FuncionalidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionalidadesController],
    }).compile();

    controller = module.get<FuncionalidadesController>(FuncionalidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
