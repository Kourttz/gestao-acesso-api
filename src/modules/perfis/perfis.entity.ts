import { Entity, PrimaryColumn, Column ,OneToMany} from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { PerfilFuncionalidadeAcao } from '../../modules/perfil_funcionalidade_acao/perfil_funcionalidade_acao.entity'

@Entity({ name: 'tb_perfis' })
export class Perfis {
  listarPerfis(): Perfis[] | PromiseLike<Perfis[]> {
      throw new Error('Method not implemented.');
  }
  @PrimaryColumn({ name: 'co_perfil', type: 'int' })
  coPerfil: number;

  @Column({ name: 'no_perfil', type: 'varchar', length: 255 })
  noPerfil: string;

  @Column({ name: 'ic_situacao_ativo', type: 'bit', default: true })
  icSituacaoAtivo: boolean;

  @OneToMany(() => Usuarios, (usuario) => usuario.perfil)
  usuarios: Usuarios[];

  @OneToMany(() => PerfilFuncionalidadeAcao, (pfa) => pfa.coPerfil)
  perfilFuncionalidadeAcao: PerfilFuncionalidadeAcao[];
}