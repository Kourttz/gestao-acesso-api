import { Module } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesController } from './perfil_funcionalidade_acoes.controller';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acoes } from '../acoes/acoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilFuncionalidadeAcoes, Acoes])],
  controllers: [PerfilFuncionalidadeAcoesController],
  providers: [PerfilFuncionalidadeAcoesService]
})
export class PerfilFuncionalidadeAcoesModule {}
