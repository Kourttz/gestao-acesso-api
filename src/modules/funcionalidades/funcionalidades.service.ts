import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionalidades } from './funcionalidades.entity';

@Injectable()
export class FuncionalidadesService {
  constructor(
    @InjectRepository(Funcionalidades)
    private readonly FuncionalidadesRepository: Repository<Funcionalidades>,
  ) {}

  async listarFuncionalidades(): Promise<Funcionalidades[]> {
    return this.FuncionalidadesRepository.find();
  }

  async criarFuncionalidade(dados: Partial<Funcionalidades>): Promise<Funcionalidades> {

    if (dados.coFuncionalidade) {
      throw new HttpException(
        'Não é permitido informar um ID (coFuncionalidades) para a nova funcionalidade',
        HttpStatus.BAD_REQUEST,
      );
    }

    const funcionalidade = this.FuncionalidadesRepository.create(dados);
    return await this.FuncionalidadesRepository.save(funcionalidade);
  }

  async atualizarFuncionalidade(dados: Partial<Funcionalidades>): Promise<Funcionalidades> {

    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar o campo icSituacaoAtivo diretamente. Use o endpoint específico para alternar o status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dados.coFuncionalidade) {
      throw new HttpException(
        'ID (coFuncionalidades) não informado para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.FuncionalidadesRepository.update(dados.coFuncionalidade, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrada para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const funcionalidadeAtualizada = await this.FuncionalidadesRepository.findOneBy({
      coFuncionalidade: dados.coFuncionalidade,
    });

    if (!funcionalidadeAtualizada) {
      throw new HttpException(
        'Erro ao recuperar funcionalidade após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return funcionalidadeAtualizada;
  }

  async deletarFuncionalidade(coFuncionalidades: number): Promise<void> {
    const resultado = await this.FuncionalidadesRepository.delete(coFuncionalidades);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrada para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(coFuncionalidade: number): Promise<Funcionalidades> {
    const funcionalidade = await this.FuncionalidadesRepository.findOneBy({ coFuncionalidade });

    if (!funcionalidade) {
      throw new HttpException(
        'Funcionalidade não encontrada para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    funcionalidade.icSituacaoAtivo = !funcionalidade.icSituacaoAtivo;
    await this.FuncionalidadesRepository.save(funcionalidade);

    return funcionalidade;
  }
}
