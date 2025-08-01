import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfis } from '../perfis/perfis.entity';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryColumn({
    name: 'co_usuario',
    type: 'int',
    generated: true // Se for auto-incremento
  })
  coUsuario: number;

  @Column({
    name: 'no_name',
    type: 'varchar',
    length: 255,
    nullable: false
  })
  noName: string;

  @Column({
    name: 'co_matricula',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true // Matrícula deve ser única
  })
  coMatricula: string;

  @Column({
    name: 'no_email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true // Email deve ser único
  })
  noEmail: string;

  @Column({
    name: 'ic_situacao_ativo',
    type: 'bit',
    default: true // Ativo por padrão
  })
  icSituacaoAtivo: boolean;

  @ManyToOne(() => Perfis, (perfil) => perfil.usuarios)
  @JoinColumn({ name: 'co_perfil' })
  perfil: Perfis;
}