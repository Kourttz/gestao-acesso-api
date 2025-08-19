import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menus } from './menus.entity';

@Injectable()
export class MenusService {
    constructor(
      @InjectRepository(Menus)
      private readonly acoesRepository: Repository<Menus>,
    ) {}

    async listarMenus(): Promise<Menus[]> {
      return this.acoesRepository.find();
    }

    async criarMenu(dados: Partial<Menus>): Promise<Menus> {
      const menu = this.acoesRepository.create(dados);
      return await this.acoesRepository.save(menu);
    }

    async atualizarMenu(dados: Partial<Menus>): Promise<Menus> {
        if (!dados.coMenu) {
            throw new Error('ID (coMenu) não informado');
        }
        await this.acoesRepository.update(dados.coMenu, dados);
        const menu = await this.acoesRepository.findOneBy({ coMenu: dados.coMenu });
        if (!menu) {
            throw new Error('Menu não encontrado após atualização');
        }
        return menu;
    }

    async deletarMenu(coMenu: number): Promise<void> {
        const resultado = await this.acoesRepository.delete(coMenu);
        if (resultado.affected === 0) {
            throw new Error('Menu não encontrado para exclusão');
        }
    }

    async alternarStatus(coMenu: number): Promise<Menus> {
      const menu = await this.acoesRepository.findOneBy({ coMenu });
      if (!menu) {
        throw new Error('Menu não encontrado');
      }
      menu.icSituacaoAtivo = !menu.icSituacaoAtivo;
      await this.acoesRepository.save(menu);
      return menu;
    }
}
