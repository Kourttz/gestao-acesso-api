import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupos } from './grupos.entity';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupos)
    private readonly gruposRepository: Repository<Grupos>,
  ) {}

  async listarGrupos(): Promise<Grupos[]> {
    return this.gruposRepository.find();
  }

  async criarGrupo(dados: Partial<Grupos>): Promise<Grupos> {
    if (dados.coGrupo) {
      throw new HttpException(
        'Não é permitido informar um ID (coGrupo) para o novo grupo',
        HttpStatus.BAD_REQUEST,
      );
    }

    const grupo = this.gruposRepository.create(dados);
    return await this.gruposRepository.save(grupo);
  }

  async atualizarGrupo(id: number, dados: Partial<Grupos>): Promise<Grupos> {
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.gruposRepository.update(id, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Grupo não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const grupoAtualizado = await this.gruposRepository.findOneBy({ coGrupo: id });

    if (!grupoAtualizado) {
      throw new HttpException(
        'Erro ao recuperar grupo após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return grupoAtualizado;
  }

  async deletarGrupo(id: number): Promise<void> {
    const resultado = await this.gruposRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Grupo não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(id: number): Promise<Grupos> {
    const grupo = await this.gruposRepository.findOneBy({ coGrupo: id });

    if (!grupo) {
      throw new HttpException(
        'Grupo não encontrado para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    grupo.icSituacaoAtivo = !grupo.icSituacaoAtivo;
    await this.gruposRepository.save(grupo);

    return grupo;
  }
}
