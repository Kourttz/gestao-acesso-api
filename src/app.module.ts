import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PerfisModule } from './modules/perfis/perfis.module';
import { SistemasModule } from './modules/sistemas/sistemas.module';
import { AcoesModule } from './modules/acoes/acoes.module';
import { FuncionalidadesModule } from './modules/funcionalidades/funcionalidades.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PerfilFuncionalidadeAcaoModule } from './modules/perfil_funcionalidade_acao/perfil_funcionalidade_acao.module';
import { MenuSistemaModule } from './modules/menu_sistema/menu_sistema.module';
import { MenusModule } from './modules/menus/menus.module';

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
      migrations:[__dirname + '/migrations/*{.js,.ts}']
    }),
    PerfisModule,
    SistemasModule,
    AcoesModule,
    FuncionalidadesModule,
    MenusModule,
    MenuSistemaModule,
    UsuariosModule,
    PerfilFuncionalidadeAcaoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
