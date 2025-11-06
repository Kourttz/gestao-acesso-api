import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';
import { Grupos } from './grupos.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grupos]),
    KafkaModule  
  ],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.criarConnector({
      connectorName: 'pg-connector-grupos',
      schema: 'public',          
      table: 'tb_grupos',
      topicPrefix: 'gestao_grupos',
    });
  }
}
