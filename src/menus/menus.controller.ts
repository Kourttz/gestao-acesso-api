import { Controller, Post, Body, Get, Patch, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CriarMenuDto, AtualizarMenuDto, DeletarMenuDto, AlternarStatusDto } from './menus.dto';
import { MenusService } from './menus.service';
import { Menus } from './menus.entity';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService:MenusService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas os Menus' })
  async listar(): Promise<Menus[]> {
    return this.menusService.listarMenus();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Menu' })
  @ApiBody({ type: CriarMenuDto, examples: {
    exemplo: {
      summary: 'Exemplo de criação',
      value: { coMenu: 1, noMenu: 'Menu de teste', icSituacaoAtivo: true }
    }
  }})
  async criar(@Body() dados: CriarMenuDto): Promise<Menus> {
    return this.menusService.criarMenu(dados);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza um menu existente' })
  @ApiBody({ type: AtualizarMenuDto, examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { coMenu: 1, noMenu: 'Menu atualizado', icSituacaoAtivo: false }
    }
  }})
  async atualizar(@Body() dados: AtualizarMenuDto): Promise<Menus> {
    return this.menusService.atualizarMenu(dados);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um menu existente' })
  @ApiBody({ type: DeletarMenuDto, examples: {
    exemplo: {
      summary: 'Exemplo de deleção',
      value: { coMenu: 1 }
    }
  }})
  async deletar(@Body() dados: DeletarMenuDto): Promise<void> {
    return this.menusService.deletarMenu(dados.coMenu);
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo da ação' })
  @ApiBody({ type: AlternarStatusDto, examples: {
    exemplo: {
      summary: 'Exemplo de alternância de status',
      value: { coMenu: 1 }
    }
  }})
  async alternarStatus(@Body() dados: AlternarStatusDto): Promise<Menus> {
    return this.menusService.alternarStatus(dados.coMenu);
  }
}
