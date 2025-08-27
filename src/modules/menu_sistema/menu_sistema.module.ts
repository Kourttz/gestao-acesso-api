import { Module } from '@nestjs/common';
import { MenuSistemaController } from './menu_sistema.controller';
import { MenuSistemaService } from './menu_sistema.service';
import { MenuSistema } from './menu_sistema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MenuSistema])],
  controllers: [MenuSistemaController],
  providers: [MenuSistemaService]
})
export class MenuSistemaModule {}
