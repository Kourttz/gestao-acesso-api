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

  async listarMenus(): Promise<Menus[]> {
    return this.menusRepository.find();
  }

  async criarMenu(dados: Partial<Menus>): Promise<Menus> {
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
    if (dados.icSituacaoAtivo !== undefined) {
      throw new HttpException(
        'Não é permitido atualizar icSituacaoAtivo diretamente. Use o endpoint de alternar status.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = await this.menusRepository.update(id, dados);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Menu não encontrado para atualização',
        HttpStatus.NOT_FOUND,
      );
    }

    const menuAtualizado = await this.menusRepository.findOneBy({ coMenu: id });

    if (!menuAtualizado) {
      throw new HttpException(
        'Erro ao recuperar menu após atualização',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return menuAtualizado;
  }

  async deletarMenu(id: number): Promise<void> {
    const resultado = await this.menusRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Menu não encontrado para exclusão',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async alternarStatus(id: number): Promise<Menus> {
    const menu = await this.menusRepository.findOneBy({ coMenu: id });

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
