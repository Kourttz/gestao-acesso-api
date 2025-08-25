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
    const menu = this.FuncionalidadesRepository.create(dados);
    return await this.FuncionalidadesRepository.save(menu);
  }

  async atualizarFuncionalidade(dados: Partial<Funcionalidades>): Promise<Funcionalidades> {
    if (!dados.coFuncionalidade) {
      throw new HttpException(
        'ID (coFuncionalidades) não informado para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.FuncionalidadesRepository.update(dados.coFuncionalidade, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const menuAtualizado = await this.FuncionalidadesRepository.findOneBy({
      coFuncionalidade: dados.coFuncionalidade,
    });

    if (!menuAtualizado) {
      throw new HttpException(
        'Erro ao recuperar menu após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return menuAtualizado;
  }

  async deletarFuncionalidade(coFuncionalidades: number): Promise<void> {
    const resultado = await this.FuncionalidadesRepository.delete(coFuncionalidades);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Funcionalidade não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(coFuncionalidade: number): Promise<Funcionalidades> {
    const menu = await this.FuncionalidadesRepository.findOneBy({ coFuncionalidade });

    if (!menu) {
      throw new HttpException(
        'Funcionalidade não encontrada para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    menu.icSituacaoAtivo = !menu.icSituacaoAtivo;
    await this.FuncionalidadesRepository.save(menu);

    return menu;
  }
}
