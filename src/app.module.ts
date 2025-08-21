import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PerfisModule } from './perfis/perfis.module';
import { SistemasModule } from './sistemas/sistemas.module';
import { AcoesModule } from './acoes/acoes.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfilFuncionalidadeAcaoModule } from './perfil_funcionalidade_acao/perfil_funcionalidade_acao.module';
import { MenusSistemasModule } from './menus_sistemas/menus_sistemas.module';
import { MenusModule } from './menus/menus.module';

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
    MenusModule,
    MenusSistemasModule,
    UsuariosModule,
    PerfilFuncionalidadeAcaoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
