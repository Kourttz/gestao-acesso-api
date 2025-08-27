import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {PerfilFuncionalidadeAcao } from '../perfil_funcionalidade_acao/perfil_funcionalidade_acao.entity'

@Entity({ name: 'tb_acoes' })
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
    type: 'boolean',
    default: true 
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => PerfilFuncionalidadeAcao, (pfa) => pfa.coAcao)
  perfilFuncionalidadeAcao: PerfilFuncionalidadeAcao[];
}