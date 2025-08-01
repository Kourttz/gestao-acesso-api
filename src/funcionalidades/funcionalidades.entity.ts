import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Sistemas } from '../sistemas/sistemas.entity';
import { PerfilFuncionalidadeAcoes } from '../perfil_funcionalidade_acoes/perfil_funcionalidade_acoes.entity'

@Entity({ name: 'funcionalidades' })
export class Funcionalidades {
  @PrimaryColumn({
    name: 'co_funcionalidade',
    type: 'int',
    generated: true 
  })
  coFuncionalidade: number;

  @Column({
    name: 'no_funcionalidade',
    type: 'varchar',
    length: 255,
    nullable: false
  })
  noFuncionalidade: string;

  @Column({
    name: 'de_funcionalidade',
    type: 'text',
    nullable: true 
  })
  deFuncionalidade?: string;

  @ManyToOne(() => Sistemas, (sistema) => sistema.funcionalidades)
  @JoinColumn({ name: 'co_sistemas' })
  sistema: Sistemas;

  @Column({
    name: 'ic_situacao_ativo',
    type: 'bit',
    default: true
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => PerfilFuncionalidadeAcoes, (pfa) => pfa.funcionalidade)
  perfilFuncionalidadeAcoes: PerfilFuncionalidadeAcoes[];
}