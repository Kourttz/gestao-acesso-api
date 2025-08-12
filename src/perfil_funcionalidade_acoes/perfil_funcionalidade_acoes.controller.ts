import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';

@Controller('perfil-funcionalidade-acoes')
export class PerfilFuncionalidadeAcoesController {
constructor(private readonly PerfilFuncionalidadeAcoesService: PerfilFuncionalidadeAcoesService) {}
    
  @Get()
  async listar(): Promise<PerfilFuncionalidadeAcoes[]> {
    return this.PerfilFuncionalidadeAcoesService.listarPFA();
  }

  @Post(':coPerfil')
  async atualizarOuCadastrar(
    @Param('coPerfil') coPerfil: number,
    @Body('co_funcionalidade') funcionalidades: Record<number, number[]>,
  ) {
    await this.PerfilFuncionalidadeAcoesService.atualizarOuCadastrar(coPerfil, funcionalidades);
    return { message: 'Perfil atualizado com sucesso!' };
  }
  
}
    