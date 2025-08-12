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
}
