import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empregado } from './entities/empregado.entity';
import { EmpregadosService } from './empregados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empregado])],
  providers: [EmpregadosService],
  exports: [EmpregadosService],
})
export class EmpregadosModule {}
