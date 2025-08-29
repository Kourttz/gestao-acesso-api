import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sistemas } from './sistemas.entity';

@Injectable()
export class SistemasService {
  constructor(
    @InjectRepository(Sistemas)
    private readonly SistemasRepository: Repository<Sistemas>,
  ) {}

  async listarSistemas(): Promise<Sistemas[]> {
    return this.SistemasRepository.find();
  }

  async criarSistema(dados: Partial<Sistemas>): Promise<Sistemas> {

    if (dados.coSistema) {
      throw new HttpException(
        'Não é permitido informar um ID (coSistema) para o novo sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sistema = this.SistemasRepository.create(dados);
    return await this.SistemasRepository.save(sistema);
  }

  async atualizarSistema(dados: Partial<Sistemas>): Promise<Sistemas> {

    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar o campo icSituacaoAtivo diretamente. Use o endpoint específico para alternar o status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dados.coSistema) {
      throw new HttpException(
        'ID (coSistema) não informado para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.SistemasRepository.update(dados.coSistema, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Sistema não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const sistemaAtualizada = await this.SistemasRepository.findOneBy({
      coSistema: dados.coSistema,
    });

    if (!sistemaAtualizada) {
      throw new HttpException(
        'Erro ao recuperar sistema após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return sistemaAtualizada;
  }

  async deletarSistema(coSistema: number): Promise<void> {
    const resultado = await this.SistemasRepository.delete(coSistema);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Sistema não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(coSistema: number): Promise<Sistemas> {
    const sistema = await this.SistemasRepository.findOneBy({ coSistema });

    if (!sistema) {
      throw new HttpException(
        'Sistema não encontrado para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    sistema.icSituacaoAtivo = !sistema.icSituacaoAtivo;
    await this.SistemasRepository.save(sistema);

    return sistema;
  }
}
