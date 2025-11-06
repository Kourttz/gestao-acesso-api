import { Module, OnModuleInit } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios]),
    KafkaModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.criarConnector({
      connectorName: 'pg-connector-usuarios',
      schema: 'public',          
      table: 'tb_usuarios',
      topicPrefix: 'gestao_usuarios',
    });
  }
}