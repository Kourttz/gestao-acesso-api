import { Module } from '@nestjs/common';
import { MenusSistemasController } from './menus_sistemas.controller';
import { MenusSistemasService } from './menus_sistemas.service';
import { MenusSistemas } from './menus_sistemas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MenusSistemas])],
  controllers: [MenusSistemasController],
  providers: [MenusSistemasService]
})
export class MenusSistemasModule {}
