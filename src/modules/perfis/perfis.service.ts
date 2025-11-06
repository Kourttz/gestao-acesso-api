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

  /**
   * @returns Lista todos os perfis
   * 
   */
  async listarPerfis(): Promise<Perfis[]> {
    return this.PerfisRepository.find();
  }

  /**
   * 
   * @param coPerfil ID do perfil a ser obtido
   * @returns Obtém um perfil pelo seu código
   */
  async obterPerfilPorCodigo(coPerfil: number): Promise<Perfis> {
    const perfil = await this.PerfisRepository.findOneBy({ coPerfil });

    if (!perfil) {
      throw new HttpException(
        `Perfil com código ${coPerfil} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return perfil;
  }

  /**
   * 
   * @param dados Dados para criar um novo perfil
   * @returns 
   */
  async criarPerfil(dados: Partial<Perfis>): Promise<Perfis> {

    /* Verifica se o campo coPerfil foi fornecido */
    if (dados.coPerfil) {
      throw new HttpException(
        'Não é permitido informar um ID (coPerfil) para o novo perfil',
        HttpStatus.BAD_REQUEST,
      );
    }

    const perfil = this.PerfisRepository.create(dados);
    return await this.PerfisRepository.save(perfil);
  }

  /**
   * 
   * @param dados 
   * @returns 
   */
  async atualizarPerfil(dados: Partial<Perfis>): Promise<Perfis> {
    
    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar o campo icSituacaoAtivo diretamente. Use o endpoint específico para alternar o status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    /* Verifica se o ID (coPerfil) foi fornecido */
    if (!dados.coPerfil) {
      throw new HttpException(
        'ID (coPerfil) não informado para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.PerfisRepository.update(dados.coPerfil, dados);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Perfil não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const perfilAtualizada = await this.PerfisRepository.findOneBy({
      coPerfil: dados.coPerfil,
    });

    /* Verifica se o perfil atualizado foi recuperado com sucesso */
    if (!perfilAtualizada) {
      throw new HttpException(
        'Erro ao recuperar perfil após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return perfilAtualizada;
  }

  /**
   * 
   * @param coPerfil ID do perfil a ser deletado
   */
  async deletarPerfil(coPerfil: number): Promise<void> {

    const resultado = await this.PerfisRepository.delete(coPerfil);

    /* Verifica se algum registro foi afetado */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Perfil não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * 
   * @param coPerfil ID do perfil para alternar o status
   * @returns 
   */
  async alternarStatus(coPerfil: number): Promise<Perfis> {

    const perfil = await this.PerfisRepository.findOneBy({ coPerfil });

    /* Verifica se o perfil foi encontrado */
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
