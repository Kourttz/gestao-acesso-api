import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionalidades } from './funcionalidades.entity';

@Injectable()
export class FuncionalidadesService {
  constructor(
    @InjectRepository(Funcionalidades)
    private readonly funcionalidadesRepository: Repository<Funcionalidades>,
  ) {}

  /**
   * 
   * @returns Lista todas as funcionalidades
   */ 
  async listarFuncionalidades(): Promise<Funcionalidades[]> {
    return this.funcionalidadesRepository.find();
  }

  /**
   * 
   * @param id ID da funcionalidade a ser obtida
   * @returns Obtém uma funcionalidade pelo seu código
   */
  async obterFuncionalidadePorCodigo(
    id: number,
  ): Promise<Funcionalidades> {
    const funcionalidade = await this.funcionalidadesRepository.findOneBy({
      coFuncionalidade: id,
    });

    if (!funcionalidade) {
      throw new HttpException(
        `Funcionalidade com código ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return funcionalidade;
  }

  /**
   * 
   * @param dados Dados para criar uma nova funcionalidade
   * @returns 
   */
  async criarFuncionalidade(
    dados: Partial<Funcionalidades>,
  ): Promise<Funcionalidades> {
    /* Verifica se o campo coFuncionalidade foi fornecido */
    if (dados.coFuncionalidade) {
      throw new HttpException(
        'Não é permitido informar um ID (coFuncionalidade) para a nova funcionalidade',
        HttpStatus.BAD_REQUEST,
      );
    }

    const funcionalidade = this.funcionalidadesRepository.create(dados);
    return await this.funcionalidadesRepository.save(funcionalidade);
  }

  /**
   * 
   * @param id ID da funcionalidade a ser atualizado
   * @param dados 
   * @returns 
   */ 
  async atualizarFuncionalidade(
    id: number,
    dados: Partial<Funcionalidades>,
  ): Promise<Funcionalidades> {

    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.funcionalidadesRepository.update(id, dados);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrada para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const funcionalidadeAtualizada =
      await this.funcionalidadesRepository.findOneBy({
        coFuncionalidade: id,
      });
    
    /* Verifica se a funcionalidade atualizada foi recuperada com sucesso */
    if (!funcionalidadeAtualizada) {
      throw new HttpException(
        'Erro ao recuperar funcionalidade após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return funcionalidadeAtualizada;
  }

  /**
   * 
   * @param id ID da funcionalidade a ser deletada
   */
  async deletarFuncionalidade(id: number): Promise<void> {

    const resultado = await this.funcionalidadesRepository.delete(id);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrada para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  
  /**
   * 
   * @param id ID da funcionalidade para alternar o status
   * @returns 
   */
  async alternarStatus(id: number): Promise<Funcionalidades> {
    const funcionalidade = await this.funcionalidadesRepository.findOneBy({
      coFuncionalidade: id,
    });

    /* Verifica se a funcionalidade foi encontrada */
    if (!funcionalidade) {
      throw new HttpException(
        'Funcionalidade não encontrada para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    funcionalidade.icSituacaoAtivo = !funcionalidade.icSituacaoAtivo;
    await this.funcionalidadesRepository.save(funcionalidade);

    return funcionalidade;
  }
}
