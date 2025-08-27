import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcoesController } from './acoes.controller';
import { AcoesService } from './acoes.service';
import { Acoes } from './acoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acoes])],
  controllers: [AcoesController],
  providers: [AcoesService],
})
export class AcoesModule {}
