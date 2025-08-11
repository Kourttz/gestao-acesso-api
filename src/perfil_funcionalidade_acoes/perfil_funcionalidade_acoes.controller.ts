import { Controller, Get } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';

@Controller('perfil-funcionalidade-acoes')
export class PerfilFuncionalidadeAcoesController {
     constructor(private readonly PerfilFuncionalidadeAcoesService: PerfilFuncionalidadeAcoesService) {}
    
      @Get()
      async listar(): Promise<PerfilFuncionalidadeAcoes[]> {
        return this.PerfilFuncionalidadeAcoesService.listarUsuarios();
      }
}
    