import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilFuncionalidadeAcao } from './perfil_funcionalidade_acao.entity';
import { Acoes } from '../acoes/acoes.entity'; 

@Injectable()
export class PerfilFuncionalidadeAcaoService {
  constructor(
    @InjectRepository(PerfilFuncionalidadeAcao)
    private readonly PerfilFuncionalidadeAcaoRepository: Repository<PerfilFuncionalidadeAcao>,
    @InjectRepository(Acoes)
    private readonly AcoesRepository: Repository<Acoes>, 
  ) {}

  async listarPFA(): Promise<PerfilFuncionalidadeAcao[]> {
    return this.PerfilFuncionalidadeAcaoRepository.find({
      relations: ['coPerfil', 'coFuncionalidade', 'coAcao'],
    });
  }

  async atualizarOuCadastrar(
    coPerfil: number,
    funcionalidades: Record<number, number[]>,
  ): Promise<void> {
    await this.PerfilFuncionalidadeAcaoRepository.delete({ coPerfil: { coPerfil } });

    if (funcionalidades && Object.keys(funcionalidades).length > 0) {
      const novosPFAs: PerfilFuncionalidadeAcao[] = [];

      for (const [coFuncionalidade, acoes] of Object.entries(funcionalidades)) {
        for (const coAcao of acoes) {
          const pfa = this.PerfilFuncionalidadeAcaoRepository.create({
            coPerfil: { coPerfil: Number(coPerfil) },
            coFuncionalidade: { coFuncionalidade: Number(coFuncionalidade) },
            coAcao: { coAcao: Number(coAcao) },
          });
          novosPFAs.push(pfa);
        }
      }

      await this.PerfilFuncionalidadeAcaoRepository.save(novosPFAs);
    }
  }

  async getPermissoesAgrupadasPorPerfil(coPerfil: number) {
    const registros = await this.AcoesRepository
      .createQueryBuilder('a')
      .leftJoin(
        'perfil_funcionalidade_acoes',
        'pfa',
        'pfa.co_acao = a.co_acao AND pfa.co_perfil = :coPerfil',
        { coPerfil },
      )
      .leftJoinAndSelect('pfa.coFuncionalidade', 'f')
      .leftJoinAndSelect('pfa.coPerfil', 'p')
      .addSelect(
        `CASE WHEN pfa.co_perfil_funcionalidade_acoes IS NOT NULL THEN true ELSE false END`,
        'vinculada',
      )
      .getRawMany();
  
    // Cria mapa de funcionalidades existentes
    const funcionalidadesMap: Record<number, { co_funcionalidade: number; no_funcionalidade: string; acoes: any[] }> = {};
  
    registros.forEach(r => {
      // ignorar registros que não possuem funcionalidade vinculada
      if (!r.f_co_funcionalidade) return;
  
      const co_funcionalidade = r.f_co_funcionalidade;
      const no_funcionalidade = r.f_no_funcionalidade;
  
      if (!funcionalidadesMap[co_funcionalidade]) {
        funcionalidadesMap[co_funcionalidade] = {
          co_funcionalidade,
          no_funcionalidade,
          acoes: [],
        };
      }
  
      if (r.a_co_acao) {
        funcionalidadesMap[co_funcionalidade].acoes.push({
          co_acao: r.a_co_acao,
          no_acao: r.a_no_acao,
          vinculada: r.vinculada,
        });
      }
    });
  
    // Adiciona ações não vinculadas a cada funcionalidade
    const todasAcoes = registros.map(r => ({ co_acao: r.a_co_acao, no_acao: r.a_no_acao }));
  
    Object.values(funcionalidadesMap).forEach(func => {
      const existentes = func.acoes.map(a => a.co_acao);
      todasAcoes.forEach(a => {
        if (!existentes.includes(a.co_acao)) {
          func.acoes.push({
            co_acao: a.co_acao,
            no_acao: a.no_acao,
            vinculada: false,
          });
        }
      });
    });
  
    return [
      {
        co_perfil: coPerfil,
        no_perfil: registros.find(r => r.p_co_perfil === coPerfil)?.p_no_perfil || '',
        funcionalidades: Object.values(funcionalidadesMap),
      },
    ];
  }
  
  
}
