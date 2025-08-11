import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeORM';
import { Repository } from 'typeorm';
import { Acoes } from './acoes.entity';

@Injectable()
export class AcoesService {
    constructor(
      @InjectRepository(Acoes)
      private readonly acoesRepository: Repository<Acoes>,
    ) {}

    async listarAcoes(): Promise<Acoes[]> {
      return this.acoesRepository.find();
    }

    async criarAcao(dados: Partial<Acoes>): Promise<Acoes> {
      const acao = this.acoesRepository.create(dados);
      return await this.acoesRepository.save(acao);
    }

    async atualizarAcao(dados: Partial<Acoes>): Promise<Acoes> {
        if (!dados.coAcao) {
            throw new Error('ID (coAcao) não informado');
        }
        await this.acoesRepository.update(dados.coAcao, dados);
        const acao = await this.acoesRepository.findOneBy({ coAcao: dados.coAcao });
        if (!acao) {
            throw new Error('Ação não encontrada após atualização');
        }
        return acao;
    }

    async deletarAcao(coAcao: number): Promise<void> {
        const resultado = await this.acoesRepository.delete(coAcao);
        if (resultado.affected === 0) {
            throw new Error('Ação não encontrada para exclusão');
        }
    }

    async alternarStatus(coAcao: number): Promise<Acoes> {
      const acao = await this.acoesRepository.findOneBy({ coAcao });
      if (!acao) {
        throw new Error('Ação não encontrada');
      }
      acao.icSituacaoAtivo = !acao.icSituacaoAtivo;
      await this.acoesRepository.save(acao);
      return acao;
    }
}
