import { Module } from '@nestjs/common';
import { SistemasController } from './sistemas.controller';
import { SistemasService } from './sistemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sistemas } from './sistemas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sistemas])],
  controllers: [SistemasController],
  providers: [SistemasService]
})
export class SistemasModule {}
