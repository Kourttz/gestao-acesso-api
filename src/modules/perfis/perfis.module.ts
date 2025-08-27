import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfisController } from './perfis.controller';
import { PerfisService } from './perfis.service';
import { Perfis } from './perfis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfis])],
  controllers: [PerfisController],
  providers: [PerfisService]
})
export class PerfisModule {}
