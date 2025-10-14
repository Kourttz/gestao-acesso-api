import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {GrupoUsuario } from '../grupo_usuario/grupo_usuario.entity';

@Entity({ name: 'tb_grupos' })
export class Grupos {
  @PrimaryGeneratedColumn({ 
    name: 'co_grupo',
    type: 'int' 
  })
  coGrupo: number;

  @Column({ 
    name: 'no_grupo',
    type: 'varchar', 
    length: 255 
  })
  noGrupo: string;

  @Column({ 
    name: 'co_matricula_gestor',
    type: 'varchar', 
    length: 255 
  })
  coMatriculaGestor: string;

  @Column({ 
    name: 'ic_situacao_ativo', 
    type: 'boolean',
    default: true 
  })
  icSituacaoAtivo: boolean;

  @OneToMany(() => GrupoUsuario, (gu) => gu.coGrupo)
  GruposUsuarios: GrupoUsuario[];
}