import { Module, OnModuleInit } from '@nestjs/common';
import { GrupoUsuarioController } from './grupo_usuario.controller';
import { GrupoUsuarioService } from './grupo_usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoUsuario } from './grupo_usuario.entity';
import { Grupos } from '../grupos/grupos.entity'; 
import { Usuarios } from '../usuarios/usuarios.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrupoUsuario,
      Grupos,     
      Usuarios,   
    ]),
    KafkaModule,
  ],
  controllers: [GrupoUsuarioController],
  providers: [GrupoUsuarioService],
})
export class GrupoUsuarioModule implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.criarConnector({
      connectorName: 'pg-connector-grupo-usuario',
      schema: 'public',          
      table: 'tb_grupo_usuario',
      topicPrefix: 'gestao_grupo_usuarios',
    });
  }
}
