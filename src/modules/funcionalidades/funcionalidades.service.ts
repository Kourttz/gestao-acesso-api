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

  async listarFuncionalidades(): Promise<Funcionalidades[]> {
    return this.funcionalidadesRepository.find();
  }

  async criarFuncionalidade(
    dados: Partial<Funcionalidades>,
  ): Promise<Funcionalidades> {
    if (dados.coFuncionalidade) {
      throw new HttpException(
        'Não é permitido informar um ID (coFuncionalidade) para a nova funcionalidade',
        HttpStatus.BAD_REQUEST,
      );
    }

    const funcionalidade = this.funcionalidadesRepository.create(dados);
    return await this.funcionalidadesRepository.save(funcionalidade);
  }

  async atualizarFuncionalidade(
    id: number,
    dados: Partial<Funcionalidades>,
  ): Promise<Funcionalidades> {
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.funcionalidadesRepository.update(id, dados);

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

    if (!funcionalidadeAtualizada) {
      throw new HttpException(
        'Erro ao recuperar funcionalidade após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return funcionalidadeAtualizada;
  }

  async deletarFuncionalidade(id: number): Promise<void> {
    const resultado = await this.funcionalidadesRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrada para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(id: number): Promise<Funcionalidades> {
    const funcionalidade = await this.funcionalidadesRepository.findOneBy({
      coFuncionalidade: id,
    });

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
