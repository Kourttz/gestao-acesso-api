import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { PerfisModule } from './perfis/perfis.module';
import { SistemasModule } from './sistemas/sistemas.module';
import { AcoesModule } from './acoes/acoes.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfilFuncionalidadeAcoesModule } from './perfil_funcionalidade_acoes/perfil_funcionalidade_acoes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database:process.env.DB_DATABASE,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      synchronize:false,
      logging:false,
      entities:[__dirname + '/**/*.entity{.js,.ts}'],
    }),
    PerfisModule,
    SistemasModule,
    AcoesModule,
    FuncionalidadesModule,
    UsuariosModule,
    PerfilFuncionalidadeAcoesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
