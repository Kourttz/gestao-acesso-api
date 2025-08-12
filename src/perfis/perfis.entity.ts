import { Entity, PrimaryColumn, Column ,OneToMany} from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { PerfilFuncionalidadeAcoes } from '../perfil_funcionalidade_acoes/perfil_funcionalidade_acoes.entity'

@Entity({ name: 'perfis' })
export class Perfis {
  listarPerfis(): Perfis[] | PromiseLike<Perfis[]> {
      throw new Error('Method not implemented.');
  }
  @PrimaryColumn({ name: 'co_perfil', type: 'int' })
  coPerfil: number;

  @Column({ name: 'no_perfil', type: 'varchar', length: 255 })
  noPerfil: string;

  @Column({ name: 'ic_situacao_ativo', type: 'bit' })
  icSituacaoAtivo: boolean;

  @OneToMany(() => Usuarios, (usuario) => usuario.perfil)
  usuarios: Usuarios[];

  @OneToMany(() => PerfilFuncionalidadeAcoes, (pfa) => pfa.coPerfil)
  perfilFuncionalidadeAcoes: PerfilFuncionalidadeAcoes[];
}