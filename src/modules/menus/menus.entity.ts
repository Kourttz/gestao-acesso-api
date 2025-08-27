import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {MenuSistema } from '../menu_sistema/menu_sistema.entity'

@Entity({ name: 'tb_menus' })
export class Menus {
  @PrimaryGeneratedColumn({ 
    name: 'co_menu',
    type: 'int' 
  })
  coMenu: number;

  @Column({ 
    name: 'no_menu',
    type: 'varchar', 
    length: 255 
  })
  noMenu: string;

  @Column({ 
    name: 'ic_situacao_ativo', 
    type: 'boolean',
    default: true 
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => MenuSistema, (ms) => ms.coMenu)
  MenusSistemas: MenuSistema[];
}