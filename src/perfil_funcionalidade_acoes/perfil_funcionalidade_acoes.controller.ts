import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';

@Controller('perfil-funcionalidade-acoes')
export class PerfilFuncionalidadeAcoesController {
constructor(private readonly PerfilFuncionalidadeAcoesService: PerfilFuncionalidadeAcoesService) {}
    
  @Get()
  async listar(): Promise<PerfilFuncionalidadeAcoes[]> {
    return this.PerfilFuncionalidadeAcoesService.listarPFA();
  }

  @Get(':co_perfil')
  async obterPorPerfil(@Param('co_perfil', ParseIntPipe) co_perfil: number) {
    return this.PerfilFuncionalidadeAcoesService.getPermissoesAgrupadasPorPerfil(co_perfil);
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
    