import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Funcionalidades } from '../funcionalidades/funcionalidades.entity';

@Entity({ name: 'sistemas' })
export class Sistemas {
  @PrimaryColumn({ name: 'co_sistema', type: 'int' })
  coSistema: number;

  @Column({ name: 'no_sistema', type: 'varchar', length: 255 })
  noSistema: string;

  @Column({ name: 'ic_situacao_ativo', type: 'bit' })
  icSituacaoAtivo: boolean;

  @OneToMany(() => Funcionalidades, (funcionalidade) => funcionalidade.sistema)
  funcionalidades: Funcionalidades[];
}