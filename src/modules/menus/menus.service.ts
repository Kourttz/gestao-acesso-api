import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menus } from './menus.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus)
    private readonly menusRepository: Repository<Menus>,
  ) {}
  /**
   *
   * @returns Lista todos os menus
   */
  async listarMenus(): Promise<Menus[]> {
    return this.menusRepository.find();
  }

  /**
   * 
   * @param dados Dados para criar um novo menu
   * @returns
   */
  async criarMenu(dados: Partial<Menus>): Promise<Menus> {

    /* Verifica se o campo coMenu foi fornecido */
    if (dados.coMenu) {
      throw new HttpException(
        'Não é permitido informar um ID (coMenu) para o novo menu',
        HttpStatus.BAD_REQUEST,
      );
    }

    const menu = this.menusRepository.create(dados);
    return await this.menusRepository.save(menu);
  }

  async atualizarMenu(id: number, dados: Partial<Menus>): Promise<Menus> {
    
    /* Impede a atualização direta do campo icSituacaoAtivo */
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.menusRepository.update(id, dados);

    /* Verifica se alguma linha foi afetada */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Menu não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const menuAtualizado = await this.menusRepository.findOneBy({ coMenu: id });

    /* Verifica se o menu atualizado foi recuperado com sucesso */
    if (!menuAtualizado) {
      throw new HttpException(
        'Erro ao recuperar menu após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return menuAtualizado;
  }

  /**
   * 
   * @param id ID do menu a ser deletado
   * @return
   */
  async deletarMenu(id: number): Promise<void> {

    const resultado = await this.menusRepository.delete(id);

    /* Verifica se algum registro foi afetado */
    if (resultado.affected === 0) {
      throw new HttpException(
        'Menu não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * 
   * @param id ID do menu para alternar o status
   * @return Menu com o status alterado
   */  
  async alternarStatus(id: number): Promise<Menus> {

    const menu = await this.menusRepository.findOneBy({ coMenu: id });

    /* Verifica se o menu foi encontrado */
    if (!menu) {
      throw new HttpException(
        'Menu não encontrado para alternar status',
        HttpStatus.NOT_FOUND,
      );
    }

    menu.icSituacaoAtivo = !menu.icSituacaoAtivo;
    await this.menusRepository.save(menu);

    return menu;
  }
}
