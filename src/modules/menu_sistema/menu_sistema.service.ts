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

  /**
   * 
   * @returns Lista todos os menus sistemas
   * 
   */
  async listarMS(): Promise<MenuSistemaResponseDto[]> {
    
    /* Busca todos os registros de MenuSistema com os relacionamentos necessários */
    const menusSistemas = await this.MenuSistemaRepository.find({
      relations: ['coMenu', 'coSistema'],
    });

    /* Mapeia os resultados para o formato MenuSistemaResponseDto */
    return menusSistemas.map((ms) => {
      const sistemaNome = ms.coSistema.noSistema;
      const menuNome = ms.coMenu.noMenu;

      const section = menuNome
        .toLowerCase()
        .replace(/\s+/g, '-');

      /* Gera o ID único combinando a seção e o nome do sistema */
      const id = `${section}.${sistemaNome.toLowerCase().replace(/\s+/g, '-')}`;

      /* Retorna o objeto formatado */
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

  /**
   * 
   * @param dados Dados para atualizar ou cadastrar MenuSistema
   */
  async atualizarOuCadastrar(
    dados: Record<number, number[]>,
  ): Promise<void> {

    /* Remove todos os registros existentes de MenuSistema */
    await this.MenuSistemaRepository.createQueryBuilder()
      .delete()
      .execute();

    const novosMS: MenuSistema[] = [];

    /* Itera sobre os dados fornecidos para criar novos registros de MenuSistema */
    for (const [coMenu, sistemas] of Object.entries(dados)) {
      const menuId = Number(coMenu);
      /* Verifica se há sistemas associados ao menu */
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
      /* Salva os novos registros de MenuSistema no banco de dados */
      await this.MenuSistemaRepository.save(novosMS);
    }
  }

}
