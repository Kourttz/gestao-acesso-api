import { Module } from '@nestjs/common';
import { PerfilFuncionalidadeAcaoController } from './perfil_funcionalidade_acao.controller';
import { PerfilFuncionalidadeAcaoService } from './perfil_funcionalidade_acao.service';
import { PerfilFuncionalidadeAcao } from './perfil_funcionalidade_acao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acoes } from '../acoes/acoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilFuncionalidadeAcao, Acoes])],
  controllers: [PerfilFuncionalidadeAcaoController],
  providers: [PerfilFuncionalidadeAcaoService]
})
export class PerfilFuncionalidadeAcaoModule {}
