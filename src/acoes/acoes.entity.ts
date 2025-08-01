import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import {PerfilFuncionalidadeAcoes } from '../perfil_funcionalidade_acoes/perfil_funcionalidade_acoes.entity'

@Entity({ name: 'acoes' })
export class Acoes {
  @PrimaryColumn({ 
    name: 'co_acao',
    type: 'int' 
  })
  coSistema: number;

  @Column({ 
    name: 'no_acao',
    type: 'varchar', 
    length: 255 
  })
  noSistema: string;

  @Column({ 
    name: 'ic_situacao_ativo', 
    type: 'bit' 
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => PerfilFuncionalidadeAcoes, (pfa) => pfa.acao)
  perfilFuncionalidadeAcoes: PerfilFuncionalidadeAcoes[];
}