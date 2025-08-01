import { Module } from '@nestjs/common';
import { AcoesController } from './acoes.controller';
import { AcoesService } from './acoes.service';

@Module({
  controllers: [AcoesController],
  providers: [AcoesService]
})
export class AcoesModule {}
