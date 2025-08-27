import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuSistema } from './menu_sistema.entity';
import { Menus } from '../menus/menus.entity';
import { Sistemas } from '../sistemas/sistemas.entity';
import { MenuSistemaResponseDto } from './menu_sistema.dto';

@Injectable()
export class MenuSistemaService {
  constructor(
    @InjectRepository(MenuSistema)
    private readonly MenuSistemaRepository: Repository<MenuSistema>,
  ) {}

  async listarMS(): Promise<MenuSistemaResponseDto[]> {
    const menusSistemas = await this.MenuSistemaRepository.find({
      relations: ['coMenu', 'coSistema'],
    });

    return menusSistemas.map((ms) => {
      const sistemaNome = ms.coSistema.noSistema;
      const menuNome = ms.coMenu.noMenu;

      const section = menuNome
        .toLowerCase()
        .replace(/\s+/g, '-');

      const id = `${section}.${sistemaNome.toLowerCase().replace(/\s+/g, '-')}`;

      return {
        id,
        label: menuNome,
        section,
        path: `/${section}/${sistemaNome.toLowerCase().replace(/\s+/g, '-')}`,
        icon: undefined,
        featureKey: id,
      };
    });
  }

  async atualizarOuCadastrar(
    dados: Record<number, number[]>,
  ): Promise<void> {

    await this.MenuSistemaRepository.createQueryBuilder()
      .delete()
      .execute();

    const novosMS: MenuSistema[] = [];

    for (const [coMenu, sistemas] of Object.entries(dados)) {
      const menuId = Number(coMenu);

      if (sistemas && sistemas.length > 0) {
        sistemas.forEach((coSistema) => {
          novosMS.push(
            this.MenuSistemaRepository.create({
              coMenu: { coMenu: menuId } as Menus,
              coSistema: { coSistema: Number(coSistema) } as Sistemas,
            }),
          );
        });
      }
    }

    if (novosMS.length > 0) {
      await this.MenuSistemaRepository.save(novosMS);
    }
  }

}
