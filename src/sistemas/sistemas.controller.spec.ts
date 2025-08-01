import { Test, TestingModule } from '@nestjs/testing';
import { SistemasController } from './sistemas.controller';

describe('SistemasController', () => {
  let controller: SistemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemasController],
    }).compile();

    controller = module.get<SistemasController>(SistemasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
