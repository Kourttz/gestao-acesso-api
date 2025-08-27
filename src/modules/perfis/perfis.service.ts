import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfis } from './perfis.entity';

@Injectable()
export class PerfisService {
  constructor(
    @InjectRepository(Perfis)
    private readonly PerfisRepository: Repository<Perfis>,
  ) {}

  async listarPerfis(): Promise<Perfis[]> {
    return this.PerfisRepository.find();
  }

  async criarPerfil(dados: Partial<Perfis>): Promise<Perfis> {
    const perfil = this.PerfisRepository.create(dados);
    return await this.PerfisRepository.save(perfil);
  }

  async atualizarPerfil(dados: Partial<Perfis>): Promise<Perfis> {
    if (!dados.coPerfil) {
      throw new HttpException(
        'ID (coPerfil) não informado para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.PerfisRepository.update(dados.coPerfil, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Perfil não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const perfilAtualizada = await this.PerfisRepository.findOneBy({
      coPerfil: dados.coPerfil,
    });

    if (!perfilAtualizada) {
      throw new HttpException(
        'Erro ao recuperar perfil após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return perfilAtualizada;
  }

  async deletarPerfil(coPerfil: number): Promise<void> {
    const resultado = await this.PerfisRepository.delete(coPerfil);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Perfil não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(coPerfil: number): Promise<Perfis> {
    const perfil = await this.PerfisRepository.findOneBy({ coPerfil });

    if (!perfil) {
      throw new HttpException(
        'Perfil não encontrado para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    perfil.icSituacaoAtivo = !perfil.icSituacaoAtivo;
    await this.PerfisRepository.save(perfil);

    return perfil;
  }
}
