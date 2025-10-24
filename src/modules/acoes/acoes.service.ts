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

  /**
   * 
   * @returns Lista todas as ações
   */
  async listarAcoes(): Promise<Acoes[]> {
    return this.acoesRepository.find();
  }

  /**
   * 
   * @param dados Dados para criar uma nova ação
   * @returns 
   */   
  async criarAcao(dados: Partial<Acoes>): Promise<Acoes> {

    /* Verifica se o campo coAcao foi fornecido */
    if (dados.coAcao) {
      throw new HttpException(
        'Não é permitido informar um ID (coAcao) para a nova ação',
        HttpStatus.BAD_REQUEST,
      );
    }

    const acao = this.acoesRepository.create(dados);
    return await this.acoesRepository.save(acao);
  }

  /**
   * 
   * @param id ID da ação a ser atualizado
   * @param dados 
   * @returns 
   */ 
  async atualizarAcao(id: number, dados: Partial<Acoes>): Promise<Acoes> {

    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.acoesRepository.update(id, dados);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Ação não encontrada para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const acaoAtualizado = await this.acoesRepository.findOneBy({ coAcao: id });

    /* Verifica se a ação atualizada foi recuperada com sucesso */
    if (!acaoAtualizado) {
      throw new HttpException(
        'Erro ao recuperar ação após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return acaoAtualizado;
  }

  /**
   * 
   * @param id ID da ação a ser deletado
   */
  async deletarAcao(id: number): Promise<void> {

    const resultado = await this.acoesRepository.delete(id);

    /* Verifica se algum registro foi afetado */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Ação não encontrada para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** 
   *  
   * @param id ID da ação para alternar o status
   * @return Ação com o status alternado
   */    
  async alternarStatus(id: number): Promise<Acoes> {

    const acao = await this.acoesRepository.findOneBy({ coAcao: id });

    /* Verifica se a ação foi encontrada */
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
