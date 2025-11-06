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

 /**
  * 
  * @returns Lista todos os grupos
  */
  async listarGrupos(): Promise<Grupos[]> {
    return this.gruposRepository.find();
  }

  /**
   * 
   * @param id ID do grupo a ser obtido
   * @returns Obtém um grupo pelo seu código
   */
  async obterGrupoPorCodigo(id: number): Promise<Grupos> {
    const grupo = await this.gruposRepository.findOneBy({ coGrupo: id });

    if (!grupo) {
      throw new HttpException(
        `Grupo com código ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return grupo;
  }

  /**
   * 
   * @param dados Dados para criar um novo grupo
   * @returns 
   */
  async criarGrupo(dados: Partial<Grupos>): Promise<Grupos> {

    /* Verifica se o campo coGrupo foi fornecido */
    if (dados.coGrupo) {
      throw new HttpException(
        'Não é permitido informar um ID (coGrupo) para o novo grupo',
        HttpStatus.BAD_REQUEST,
      );
    }

    /* Verifica se o campo coUsuarioDono foi fornecido */
    if (!dados.coUsuarioDono) {
      throw new HttpException(
        'O campo coUsuarioDono é obrigatório para criar um grupo',
        HttpStatus.BAD_REQUEST,
      );
    }

    const grupo = this.gruposRepository.create(dados);
    return await this.gruposRepository.save(grupo);
  }
  
  /**
   * 
   * @param id ID do grupo a ser atualizado
   * @param dados 
   * @returns 
   */
  async atualizarGrupo(id: number, dados: Partial<Grupos>): Promise<Grupos> {
    
    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.gruposRepository.update(id, dados);

    /* Verifica se algum registro foi afetado */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Grupo não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const grupoAtualizado = await this.gruposRepository.findOneBy({ coGrupo: id });

    /* Verifica se o grupo atualizado foi recuperado com sucesso */
    if (!grupoAtualizado) {
      throw new HttpException(
        'Erro ao recuperar grupo após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return grupoAtualizado;
  }

  /**
   * 
   * @param id ID do grupo a ser deletado
   */
  async deletarGrupo(id: number): Promise<void> {

    const resultado = await this.gruposRepository.delete(id);

    /* Verifica se algum registro foi afetado */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Grupo não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * 
   * @param id ID do grupo para alternar o status
   * @returns 
   */
  async alternarStatus(id: number): Promise<Grupos> {
    
    const grupo = await this.gruposRepository.findOneBy({ coGrupo: id });

    /* Verifica se o grupo existe */
    if (!grupo) {
      throw new HttpException(
        'Grupo não encontrado para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    /* Alterna o status ativo/inativo */
    grupo.icSituacaoAtivo = !grupo.icSituacaoAtivo;
    await this.gruposRepository.save(grupo);

    return grupo;
  }
}
