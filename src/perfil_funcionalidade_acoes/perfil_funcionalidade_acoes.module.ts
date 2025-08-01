import { Module } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesController } from './perfil_funcionalidade_acoes.controller';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';

@Module({
  controllers: [PerfilFuncionalidadeAcoesController],
  providers: [PerfilFuncionalidadeAcoesService]
})
export class PerfilFuncionalidadeAcoesModule {}
