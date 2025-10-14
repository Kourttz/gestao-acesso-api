import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilFuncionalidadeAcao } from './perfil_funcionalidade_acao.entity';
import { Acoes } from '../acoes/acoes.entity';
import { PerfilPermissao, FuncionalidadePermissao, UsuarioPermissao } from './perfil_funcionalidade_acao.dto';

@Injectable()
export class PerfilFuncionalidadeAcaoService {
  constructor(
    @InjectRepository(PerfilFuncionalidadeAcao)
    private readonly perfilFuncionalidadeAcaoRepository: Repository<PerfilFuncionalidadeAcao>,
    @InjectRepository(Acoes)
    private readonly acoesRepository: Repository<Acoes>,
  ) {}

  async listarPFA(): Promise<PerfilFuncionalidadeAcao[]> {
    return this.perfilFuncionalidadeAcaoRepository.find({
      relations: ['coPerfil', 'coFuncionalidade', 'coAcao'],
    });
  }

  async atualizarOuCadastrar(
      coPerfil: number,
      funcionalidades: Record<number, number[]>,
    ): Promise<void> {
      if (!coPerfil) throw new Error('ID do perfil não informado');
      if (!funcionalidades || Object.keys(funcionalidades).length === 0) {
        throw new Error('Nenhuma funcionalidade informada');
      }

      await this.perfilFuncionalidadeAcaoRepository
        .createQueryBuilder()
        .delete()
        .where('co_perfil = :coPerfil', { coPerfil })
        .execute();

      const novosPFAs = Object.entries(funcionalidades).flatMap(
        ([coFuncionalidade, acoes]) =>
          acoes.map((coAcao) =>
            this.perfilFuncionalidadeAcaoRepository.create({
              coPerfil: { coPerfil },
              coFuncionalidade: { coFuncionalidade: Number(coFuncionalidade) },
              coAcao: { coAcao: Number(coAcao) },
            }),
          ),
      );

      if (novosPFAs.length > 0) {
        await this.perfilFuncionalidadeAcaoRepository.save(novosPFAs);
      }
    }

  async getPermissoesAgrupadasPorPerfil(coPerfil: number): Promise<PerfilPermissao[]> {
    
    if (!coPerfil) throw new Error('ID do perfil não informado');

    const registros = await this.acoesRepository
      .createQueryBuilder('a')
      .leftJoin(
        PerfilFuncionalidadeAcao,
        'pfa',
        'pfa.co_acao = a.co_acao AND pfa.co_perfil = :coPerfil',
        { coPerfil },
      )
      .leftJoinAndSelect('pfa.coFuncionalidade', 'f','f.ic_situacao_ativo = true')
      .leftJoinAndSelect('f.coSistema', 's','s.ic_situacao_ativo = true') 
      .leftJoinAndSelect('pfa.coPerfil', 'p','p.ic_situacao_ativo = true')
      .addSelect(
        `CASE WHEN pfa.co_perfil_funcionalidade_acao IS NOT NULL THEN true ELSE false END`,
        'vinculada',
      ).where('a.ic_situacao_ativo = true')
      .getRawMany();

    const funcionalidadesMap: Record<number, FuncionalidadePermissao> = {};

    registros.forEach((r) => {
      if (!r.f_co_funcionalidade) return;

      if (!funcionalidadesMap[r.f_co_funcionalidade]) {
        funcionalidadesMap[r.f_co_funcionalidade] = {
          co_funcionalidade: r.f_co_funcionalidade,
          no_funcionalidade: r.f_no_funcionalidade,
          co_sistema: r.s_co_sistema,      
          no_sistema: r.s_no_sistema,  
          acoes: [],
        };
      }

      if (r.a_co_acao) {
        funcionalidadesMap[r.f_co_funcionalidade].acoes.push({
          co_acao: r.a_co_acao,
          no_acao: r.a_no_acao,
          vinculada: r.vinculada,
        });
      }
    });

    const todasAcoes = registros.map((r) => ({
      co_acao: r.a_co_acao,
      no_acao: r.a_no_acao,
    }));

    Object.values(funcionalidadesMap).forEach((func) => {
      const existentes = func.acoes.map((a) => a.co_acao);
      todasAcoes.forEach((a) => {
        if (!existentes.includes(a.co_acao)) {
          func.acoes.push({ ...a, vinculada: false });
        }
      });
      func.acoes.sort((a, b) => a.co_acao - b.co_acao);
    });

    return [
      {
        co_perfil: coPerfil,
        no_perfil: registros.find((r) => r.p_co_perfil === coPerfil)?.p_no_perfil || '',
        funcionalidades: Object.values(funcionalidadesMap),
      },
    ];
  }

  async getPermissoesAgrupadasPorMatricula(coMatricula: number): Promise<UsuarioPermissao[]> {
    
      if (!coMatricula) throw new Error('Matricula do usuário não informada');

      const registros = await this.acoesRepository
          .createQueryBuilder('a')
          .leftJoinAndSelect('tb_perfil_funcionalidade_acao','pfa','pfa.co_acao = a.co_acao')
          .leftJoinAndSelect('tb_usuarios','u','u.co_perfil = pfa.co_perfil')
          .leftJoinAndSelect('pfa.coFuncionalidade', 'f','f.ic_situacao_ativo = true')
          .leftJoinAndSelect('f.coSistema', 's','s.ic_situacao_ativo = true')
          .leftJoinAndSelect('pfa.coPerfil', 'p','p.ic_situacao_ativo = true')
          .addSelect(
              `CASE WHEN pfa.co_perfil_funcionalidade_acao IS NOT NULL THEN true ELSE false END`,
              'vinculada',
          )
          .where('a.ic_situacao_ativo = true AND u.co_matricula = :coMatricula', { coMatricula })
          .getRawMany();

      const funcionalidadesMap: Record<number, FuncionalidadePermissao> = {};

      registros.forEach((r) => {
          if (!r.f_co_funcionalidade) return;

          if (!funcionalidadesMap[r.f_co_funcionalidade]) {
              funcionalidadesMap[r.f_co_funcionalidade] = {
                  co_funcionalidade: r.f_co_funcionalidade,
                  no_funcionalidade: r.f_no_funcionalidade,
                  co_sistema: r.s_co_sistema,      
                  no_sistema: r.s_no_sistema,  
                  acoes: [],
              };
          }

          if (r.a_co_acao) {
              funcionalidadesMap[r.f_co_funcionalidade].acoes.push({
                  co_acao: r.a_co_acao,
                  no_acao: r.a_no_acao,
                  vinculada: r.vinculada,
              });
          }
      });

      const todasAcoes = Array.from(
          new Map(
              registros.map((r) => [
                  r.a_co_acao, 
                  { co_acao: r.a_co_acao, no_acao: r.a_no_acao }
              ])
          ).values()
      );

      Object.values(funcionalidadesMap).forEach((func) => {
          const existentes = func.acoes.map((a) => a.co_acao);
          todasAcoes.forEach((a) => {
              if (!existentes.includes(a.co_acao)) {
                  func.acoes.push({ ...a, vinculada: false });
              }
          });
          func.acoes.sort((a, b) => a.co_acao - b.co_acao);
      });

      // Extração do Perfil (co_perfil e no_perfil) do primeiro registro.
      const perfilRegistro = registros.find((r) => r.p_co_perfil);
      const noName = perfilRegistro?.u_no_name || null;
      const coPerfil = perfilRegistro?.p_co_perfil || null;
      const noPerfil = perfilRegistro?.p_no_perfil || '';

      return [
          {
              co_matricula: coMatricula,
              no_name: noName,
              co_perfil: coPerfil, 
              no_perfil: noPerfil, 
              funcionalidades: Object.values(funcionalidadesMap),
          },
      ];
  }

}
