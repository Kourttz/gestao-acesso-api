import { Module } from '@nestjs/common';
import { PerfilFuncionalidadeAcoesController } from './perfil_funcionalidade_acoes.controller';
import { PerfilFuncionalidadeAcoesService } from './perfil_funcionalidade_acoes.service';
import { TypeOrmModule } from '@nestjs/typeORM';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilFuncionalidadeAcoes])],
  controllers: [PerfilFuncionalidadeAcoesController],
  providers: [PerfilFuncionalidadeAcoesService]
})
export class PerfilFuncionalidadeAcoesModule {}
