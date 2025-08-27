import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Perfis } from '../perfis/perfis.entity';
import { Funcionalidades } from '../funcionalidades/funcionalidades.entity';
import { Acoes } from '../acoes/acoes.entity';

@Entity({ name: 'tb_perfil_funcionalidade_acao' })
export class PerfilFuncionalidadeAcao {
  @PrimaryColumn({
    name: 'co_perfil_funcionalidade_acao',
    type: 'int',
    generated: true
  })
  coPerfilFuncionalidadeAcao: number;

  @ManyToOne(() => Perfis, (perfil) => perfil.perfilFuncionalidadeAcao)
  @JoinColumn({ name: 'co_perfil' })
  coPerfil: Perfis;

  @ManyToOne(() => Funcionalidades, (funcionalidade) => funcionalidade.perfilFuncionalidadeAcao)
  @JoinColumn({ name: 'co_funcionalidade' })
  coFuncionalidade: Funcionalidades;

  @ManyToOne(() => Acoes, (acao) => acao.perfilFuncionalidadeAcao)
  @JoinColumn({ name: 'co_acao' })
  coAcao: Acoes;
}