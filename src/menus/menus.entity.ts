import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {MenusSistemas } from '../menus_sistemas/menus_sistemas.entity'

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

  @OneToMany(() => MenusSistemas, (ms) => ms.coMenu)
  MenusSistemas: MenusSistemas[];
}