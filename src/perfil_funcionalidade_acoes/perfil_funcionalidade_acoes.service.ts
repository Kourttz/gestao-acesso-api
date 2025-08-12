import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeORM';
import { Repository } from 'typeorm';
import { PerfilFuncionalidadeAcoes } from './perfil_funcionalidade_acoes.entity';


@Injectable()
export class PerfilFuncionalidadeAcoesService {
     constructor(
        @InjectRepository(PerfilFuncionalidadeAcoes)
        private readonly PerfilFuncionalidadeAcoesRepository: Repository<PerfilFuncionalidadeAcoes>,
      ) {}
    
      async listarPFA(): Promise<PerfilFuncionalidadeAcoes[]> {
        return this.PerfilFuncionalidadeAcoesRepository.find({
          relations: ['coPerfil', 'coFuncionalidade', 'coAcao']
        });
      }

      async atualizarOuCadastrar(
        coPerfil: number,
        funcionalidades: Record<number, number[]>, 
      ): Promise<void> {
        // 1. Remove PFAs antigos para o perfil
        await this.PerfilFuncionalidadeAcoesRepository.delete({ coPerfil: { coPerfil } });
    
        // 2. Reinsere PFAs
        if (funcionalidades && Object.keys(funcionalidades).length > 0) {
          const novosPFAs: PerfilFuncionalidadeAcoes[] = [];
    
          for (const [coFuncionalidade, acoes] of Object.entries(funcionalidades)) {
            for (const coAcao of acoes) {
              const pfa = this.PerfilFuncionalidadeAcoesRepository.create({
                coPerfil: { coPerfil: Number(coPerfil) },
                coFuncionalidade: { coFuncionalidade: Number(coFuncionalidade) },
                coAcao: { coAcao: Number(coAcao) },
              });
              novosPFAs.push(pfa);
            }
          }
    
          await this.PerfilFuncionalidadeAcoesRepository.save(novosPFAs);
        }
      }

      async getPermissoesAgrupadasPorPerfil(coPerfil: number) {
        // Buscar todas as permissões com relacionamentos, filtrando pelo coPerfil
        const registros = await this.PerfilFuncionalidadeAcoesRepository
          .createQueryBuilder('pfa')
          .innerJoinAndSelect('pfa.coPerfil', 'p')
          .innerJoinAndSelect('pfa.coFuncionalidade', 'f')
          .innerJoinAndSelect('pfa.coAcao', 'a')
          .where('p.co_perfil = :coPerfil', { coPerfil })
          .getMany();
      
      
        // Montar estrutura agrupada manualmente no JS
        const resultado: Record<string, Record<string, Set<string>>> = {};
      
        registros.forEach((registro) => {
  
          const no_perfil = registro.coPerfil.noPerfil;
          const no_funcionalidade = registro.coFuncionalidade.noFuncionalidade;
          const no_acao = registro.coAcao.noAcao;
      
          if (!resultado[no_perfil]) {
            resultado[no_perfil] = {};
          }
      
          if (!resultado[no_perfil][no_funcionalidade]) {
            resultado[no_perfil][no_funcionalidade] = new Set();
          }
      
          resultado[no_perfil][no_funcionalidade].add(no_acao);
        });
      
        // Converter sets para arrays para o JSON
        const retorno = Object.entries(resultado).map(
          ([no_perfil, funcionalidades]) => ({
            no_perfil,
            funcionalidades: Object.entries(funcionalidades).map(
              ([no_funcionalidade, acoesSet]) => ({
                no_funcionalidade,
                acoes: Array.from(acoesSet),
              }),
            ),
          }),
        );
      
        return retorno;
      }
}
