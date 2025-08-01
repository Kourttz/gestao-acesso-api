import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfis } from '../perfis/perfis.entity';
import { Funcionalidades } from '../funcionalidades/funcionalidades.entity';
import { Acoes } from '../acoes/acoes.entity';

@Entity({ name: 'perfil_funcionalidade_acoes' })
export class PerfilFuncionalidadeAcoes {
  @PrimaryColumn({
    name: 'co_perfil_funcionalidade_acoes',
    type: 'int',
    generated: true
  })
  coPerfilFuncionalidadeAcoes: number;

  @ManyToOne(() => Perfis, (perfil) => perfil.perfilFuncionalidadeAcoes)
  @JoinColumn({ name: 'co_perfil' })
  perfil: Perfis;

  @ManyToOne(() => Funcionalidades, (funcionalidade) => funcionalidade.perfilFuncionalidadeAcoes)
  @JoinColumn({ name: 'co_funcionalidade' })
  funcionalidade: Funcionalidades;

  @ManyToOne(() => Acoes, (acao) => acao.perfilFuncionalidadeAcoes)
  @JoinColumn({ name: 'co_acao' })
  acao: Acoes;
}