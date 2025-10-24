import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'sc_bases', name: 'tb_empregados' })
export class Empregado {
  @PrimaryGeneratedColumn()
  id_empregado: number;

  @Column({ nullable: true })
  co_matricula: string;

  @Column({ nullable: true })
  co_matricula_cliente: string;

  @Column({ nullable: true })
  no_nome: string;

  @Column({ nullable: true })
  co_cpf: string;

  @Column({ nullable: true })
  co_funcao: string;

  @Column({ nullable: true })
  co_matricula_gestor: string;

  @Column({ nullable: true })
  co_matricula_monitor: string;

  @Column({ nullable: true })
  co_matricula_alteracao: string;

  @Column({ nullable: true })
  nu_telefone: string;

  @Column({ nullable: true })
  nu_telefone2: string;

  @Column({ nullable: true })
  no_nome_social: string;

  @Column({ type: 'char', length: 1, nullable: true })
  ds_sexo: string;

  @Column({ nullable: true })
  ds_situacao: string;

  @Column({ nullable: true })
  nu_certificado: string;

  @Column({ nullable: true })
  ds_dados_adicionais: string;

  @Column({ type: 'bigint', nullable: true })
  nu_pis: string;

  @Column({ type: 'int', nullable: true })
  nu_filial: number;

  @Column({ type: 'int', nullable: true })
  id_situacao: number;

  @Column({ type: 'int', nullable: true })
  co_bairro: number;

  @Column({ type: 'int', nullable: true })
  co_municipio: number;

  @Column({ type: 'int', nullable: true })
  co_local_trabalho: number;

  @Column({ type: 'date', nullable: true })
  dt_funcao: Date;

  @Column({ type: 'date', nullable: true })
  dt_nascimento: Date;

  @Column({ type: 'date', nullable: true })
  dt_admissao: Date;

  @Column({ type: 'date', nullable: true })
  dt_demissao: Date;

  @Column({ type: 'date', nullable: true })
  dt_situacao: Date;

  @Column({ type: 'date', nullable: true })
  dt_hist_alteracao: Date;

  @Column({ type: 'date', nullable: true })
  dt_alteracao: Date;

  @Column({ type: 'time', nullable: true })
  hr_jornada_entrada: string;

  @Column({ type: 'time', nullable: true })
  hr_jornada_saida: string;

  @Column({ type: 'time', nullable: true })
  hr_descanso1: string;

  @Column({ type: 'time', nullable: true })
  hr_descanso2: string;

  @Column({ type: 'time', nullable: true })
  hr_lanche: string;

  @Column({ type: 'boolean', nullable: true })
  ic_certificado_digital: boolean;
}