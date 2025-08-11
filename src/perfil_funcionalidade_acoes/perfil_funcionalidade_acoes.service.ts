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
    
      async listarUsuarios(): Promise<PerfilFuncionalidadeAcoes[]> {
        return this.PerfilFuncionalidadeAcoesRepository.find();
      }
}
