import { Module } from '@nestjs/common';
import { FuncionalidadesController } from './funcionalidades.controller';
import { FuncionalidadesService } from './funcionalidades.service';
import { TypeOrmModule } from '@nestjs/typeORM';
import { Funcionalidades } from './funcionalidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionalidades])],
  controllers: [FuncionalidadesController],
  providers: [FuncionalidadesService]
})
export class FuncionalidadesModule {}
