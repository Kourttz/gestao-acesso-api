import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {PerfilFuncionalidadeAcoes } from '../perfil_funcionalidade_acoes/perfil_funcionalidade_acoes.entity'

@Entity({ name: 'acoes' })
export class Acoes {
  @PrimaryGeneratedColumn({ 
    name: 'co_acao',
    type: 'int' 
  })
  coAcao: number;

  @Column({ 
    name: 'no_acao',
    type: 'varchar', 
    length: 255 
  })
  noAcao: string;

  @Column({ 
    name: 'ic_situacao_ativo', 
    type: 'boolean' 
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => PerfilFuncionalidadeAcoes, (pfa) => pfa.coAcao)
  perfilFuncionalidadeAcoes: PerfilFuncionalidadeAcoes[];
}