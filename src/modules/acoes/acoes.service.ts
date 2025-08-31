import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    if (dados.coAcao) {
      throw new HttpException(
        'Não é permitido informar um ID (coAcao) para a nova ação',
        HttpStatus.BAD_REQUEST,
      );
    }

    const acao = this.acoesRepository.create(dados);
    return await this.acoesRepository.save(acao);
  }

  async atualizarAcao(id: number, dados: Partial<Acoes>): Promise<Acoes> {
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.acoesRepository.update(id, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Ação não encontrada para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const acaoAtualizado = await this.acoesRepository.findOneBy({ coAcao: id });

    if (!acaoAtualizado) {
      throw new HttpException(
        'Erro ao recuperar ação após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return acaoAtualizado;
  }

  async deletarAcao(id: number): Promise<void> {
    const resultado = await this.acoesRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Ação não encontrada para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(id: number): Promise<Acoes> {
    const acao = await this.acoesRepository.findOneBy({ coAcao: id });

    if (!acao) {
      throw new HttpException(
        'Ação não encontrada para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    acao.icSituacaoAtivo = !acao.icSituacaoAtivo;
    await this.acoesRepository.save(acao);

    return acao;
  }
}
