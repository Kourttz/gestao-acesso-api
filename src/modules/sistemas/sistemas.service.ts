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

  /**
   *  
   * @returns Lista todos os sistemas
   */
  async listarSistemas(): Promise<Sistemas[]> {
    return this.SistemasRepository.find();
  }

  /**
   * 
   * @param dados Dados para criar um novo sistema
   * @returns 
   */
  async criarSistema(dados: Partial<Sistemas>): Promise<Sistemas> {

    /* Verifica se o campo coSistema foi fornecido */
    if (dados.coSistema) {
      throw new HttpException(
        'Não é permitido informar um ID (coSistema) para o novo sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sistema = this.SistemasRepository.create(dados);
    return await this.SistemasRepository.save(sistema);
  }

  /**
   * 
   * @param coSistema ID do sistema a ser atualizado
   * @param dados 
   * @returns 
   */
  async atualizarSistema(
    coSistema: number,
    dados: Partial<Sistemas>,
  ): Promise<Sistemas> {

    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar o campo icSituacaoAtivo diretamente. Use o endpoint específico para alternar o status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.SistemasRepository.update(coSistema, dados);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Sistema não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const sistemaAtualizado = await this.SistemasRepository.findOneBy({ coSistema });

    /* Verifica se o sistema atualizado foi recuperado com sucesso */
    if (!sistemaAtualizado) {
      throw new HttpException(
        'Erro ao recuperar sistema após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return sistemaAtualizado;
  }

  /**
   *  
   * @param coSistema 
   */
  async deletarSistema(coSistema: number): Promise<void> {

    const resultado = await this.SistemasRepository.delete(coSistema);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Sistema não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** 
   * 
   * @param coSistema ID do sistema para alternar o status
   */
  async alternarStatus(coSistema: number): Promise<Sistemas> {

    const sistema = await this.SistemasRepository.findOneBy({ coSistema });

    /* Verifica se o sistema foi encontrado */
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
