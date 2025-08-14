import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionalidades } from './funcionalidades.entity';

@Injectable()
export class FuncionalidadesService {
    constructor(
      @InjectRepository(Funcionalidades)
      private readonly funcionalidadesRepository: Repository<Funcionalidades>,
    ) {}

    async listarFuncionalidades(): Promise<Funcionalidades[]> {
      return this.funcionalidadesRepository.find();
    }

    async criarFuncionalidade(dados: Partial<Funcionalidades>): Promise<Funcionalidades> {
      const funcionalidade = this.funcionalidadesRepository.create(dados);
      return await this.funcionalidadesRepository.save(funcionalidade);
    }

    async atualizarFuncionalidade(dados: Partial<Funcionalidades>): Promise<Funcionalidades> {
        if (!dados.coFuncionalidade) {
            throw new Error('ID (coFuncionalidade) não informado');
        }
        await this.funcionalidadesRepository.update(dados.coFuncionalidade, dados);
        const funcionalidade = await this.funcionalidadesRepository.findOneBy({ coFuncionalidade: dados.coFuncionalidade });
        if (!funcionalidade) {
            throw new Error('Funcionalidade não encontrada após atualização');
        }
        return funcionalidade;
    }

    async deletarFuncionalidade(coFuncionalidade: number): Promise<void> {
        const resultado = await this.funcionalidadesRepository.delete(coFuncionalidade);
        if (resultado.affected === 0) {
            throw new Error('Funcionalidade não encontrada para exclusão');
        }
    }

    async alternarStatus(coFuncionalidade: number): Promise<Funcionalidades> {
      const funcionalidade = await this.funcionalidadesRepository.findOneBy({ coFuncionalidade });
      if (!funcionalidade) {
        throw new Error('Funcionalidade não encontrada');
      }
      funcionalidade.icSituacaoAtivo = !funcionalidade.icSituacaoAtivo;
      await this.funcionalidadesRepository.save(funcionalidade);
      return funcionalidade;
    }
}
