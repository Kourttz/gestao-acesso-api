import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empregado } from '../empregados/entities/empregado.entity';
import { KafkaService } from './kafka.service';
import { EmpregadosModule } from '../empregados/empregados.module';

@Module({
  imports: [
    EmpregadosModule,
    TypeOrmModule.forFeature([Empregado]) 
  ],  providers: [KafkaService],
})
export class KafkaModule {}
