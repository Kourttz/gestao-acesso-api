import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcoesModule } from './modules/acoes/acoes.module';
import { MenusModule } from './modules/menus/menus.module';
import { PerfisModule } from './modules/perfis/perfis.module';
import { GruposModule } from './modules/grupos/grupos.module';
import { SistemasModule } from './modules/sistemas/sistemas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { MenuSistemaModule } from './modules/menu_sistema/menu_sistema.module';
import { GrupoUsuarioModule } from './modules/grupo_usuario/grupo_usuario.module';
import { FuncionalidadesModule } from './modules/funcionalidades/funcionalidades.module';
import { PerfilFuncionalidadeAcaoModule } from './modules/perfil_funcionalidade_acao/perfil_funcionalidade_acao.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { EmpregadosModule } from './modules/empregados/empregados.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      migrations: [__dirname + '/migrations/*{.js,.ts}']
    }),
    
    AcoesModule,
    MenusModule,
    PerfisModule,
    GruposModule,
    UsuariosModule,
    SistemasModule,
    MenuSistemaModule,
    GrupoUsuarioModule,
    FuncionalidadesModule,
    PerfilFuncionalidadeAcaoModule,
    EmpregadosModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
