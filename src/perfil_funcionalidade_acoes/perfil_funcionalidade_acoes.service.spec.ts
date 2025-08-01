import { Test, TestingModule } from '@nestjs/testing';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';

describe('PerfilFuncionalidadeAcoesService', () => {
  let service: PerfilFuncionalidadeAcoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilFuncionalidadeAcoesService],
    }).compile();

    service = module.get<PerfilFuncionalidadeAcoesService>(PerfilFuncionalidadeAcoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
