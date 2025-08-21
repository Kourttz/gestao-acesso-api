import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenusSistemas } from './menus_sistemas.entity';
import { Menus } from '../menus/menus.entity';
import { Sistemas } from '../sistemas/sistemas.entity';

@Injectable()
export class MenusSistemasService {
  constructor(
    @InjectRepository(MenusSistemas)
    private readonly MenusSistemasRepository: Repository<MenusSistemas>,
  ) {}

  async listarMS(): Promise<MenusSistemas[]> {
    return this.MenusSistemasRepository.find({
      relations: ['coMenu', 'coSistema'],
    });
  }

  async atualizarOuCadastrar(
    dados: Record<number, number[]>, 
  ): Promise<void> {
    for (const [coMenu, sistemas] of Object.entries(dados)) {
      const menuId = Number(coMenu);
  

      await this.MenusSistemasRepository.createQueryBuilder()
        .delete()
        .where("co_menu = :menuId", { menuId })
        .execute();
  
      
      if (sistemas && sistemas.length > 0) {
        const novosMS: MenusSistemas[] = sistemas.map((coSistema) =>
          this.MenusSistemasRepository.create({
            coMenu: { coMenu: menuId } as Menus,               
            coSistema: { coSistema: Number(coSistema) } as Sistemas, 
          })
        );
  
        await this.MenusSistemasRepository.save(novosMS);
      }
    }
  }
    

  async getPermissoesAgrupadasPorPerfil(coMenu: number) {
    const registros = await this.MenusSistemasRepository
      .createQueryBuilder('a')
      .leftJoin(
        'perfil_funcionalidade_acoes',
        'pfa',
        'pfa.co_acao = a.co_acao AND pfa.co_perfil = :coMenu',
        { coMenu },
      )
      .leftJoinAndSelect('pfa.coFuncionalidade', 'f')
      .leftJoinAndSelect('pfa.coMenu', 'p')
      .addSelect(
        `CASE WHEN pfa.co_perfil_funcionalidade_acoes IS NOT NULL THEN true ELSE false END`,
        'vinculada',
      )
      .getRawMany();
  
    // Cria mapa de sistemas existentes
    const funcionalidadesMap: Record<number, { co_funcionalidade: number; no_funcionalidade: string; acoes: any[] }> = {};
  
    registros.forEach(r => {
      // ignorar registros que não possuem funcionalidade vinculada
      if (!r.f_co_funcionalidade) return;
  
      const co_funcionalidade = r.f_co_funcionalidade;
      const no_funcionalidade = r.f_no_funcionalidade;
  
      if (!funcionalidadesMap[co_funcionalidade]) {
        funcionalidadesMap[co_funcionalidade] = {
          co_funcionalidade,
          no_funcionalidade,
          acoes: [],
        };
      }
  
      if (r.a_co_acao) {
        funcionalidadesMap[co_funcionalidade].acoes.push({
          co_acao: r.a_co_acao,
          no_acao: r.a_no_acao,
          vinculada: r.vinculada,
        });
      }
    });
  
    // Adiciona ações não vinculadas a cada funcionalidade
    const todasAcoes = registros.map(r => ({ co_acao: r.a_co_acao, no_acao: r.a_no_acao }));
  
    Object.values(funcionalidadesMap).forEach(func => {
      const existentes = func.acoes.map(a => a.co_acao);
      todasAcoes.forEach(a => {
        if (!existentes.includes(a.co_acao)) {
          func.acoes.push({
            co_acao: a.co_acao,
            no_acao: a.no_acao,
            vinculada: false,
          });
        }
      });
    });
  
    return [
      {
        co_perfil: coMenu,
        no_perfil: registros.find(r => r.p_co_perfil === coMenu)?.p_no_perfil || '',
        funcionalidades: Object.values(funcionalidadesMap),
      },
    ];
  }
  
  
}
