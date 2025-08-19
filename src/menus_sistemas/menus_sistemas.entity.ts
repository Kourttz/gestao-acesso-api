import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Menus } from '../menus/menus.entity';
import { Sistemas } from '../sistemas/sistemas.entity';

@Entity({ name: 'tb_menu_sistema' })
export class MenusSistemas {
  @PrimaryColumn({
    name: 'co_sistemas_menu',
    type: 'int',
    generated: true
  })
  coSistemasMenu: number;

  @ManyToOne(() => Menus, (menu) => menu.coMenu)
  @JoinColumn({ name: 'co_menu' })
  coMenu: Menus;

  @ManyToOne(() => Sistemas, (sistema) => sistema.coSistema)
  @JoinColumn({ name: 'co_sistema' })
  coSistemas: Sistemas;
}