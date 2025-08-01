import { Test, TestingModule } from '@nestjs/testing';
import { PerfilFuncionalidadeAcoesController } from './perfil_funcionalidade_acoes.controller';

describe('PerfilFuncionalidadeAcoesController', () => {
  let controller: PerfilFuncionalidadeAcoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilFuncionalidadeAcoesController],
    }).compile();

    controller = module.get<PerfilFuncionalidadeAcoesController>(PerfilFuncionalidadeAcoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
