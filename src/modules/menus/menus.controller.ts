import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Put,
  UseFilters,
  HttpStatus,
  Req,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import {
  CriarMenuDto,
  AtualizarMenuDto,
} from './menus.dto';
import { MenusService } from './menus.service';
import { Menus } from './menus.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Menus')
@UseFilters(HttpExceptionFilter)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Menus' })
  async listar(@Req() request: Request): Promise<ResponseDto<Menus[]>> {
    const menus = await this.menusService.listarMenus();
    return {
      statusCode: HttpStatus.OK,
      message: 'Menus listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menus,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Menu' })
  @ApiBody({
    type: CriarMenuDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noMenu: 'Menu de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(
    @Body() dados: CriarMenuDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Menus>> {
    const menu = await this.menusService.criarMenu(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Menu criado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menu,
    };
  }

  @Patch(':coMenu')
  @ApiOperation({ summary: 'Atualiza um menu existente' })
  @ApiBody({
    type: AtualizarMenuDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { noMenu: 'Menu atualizado' },
      },
    },
  })
  @ApiParam({ name: 'coMenu', type: Number, description: 'ID do Menu' })
  async atualizar(
    @Param('coMenu') id: number,
    @Body() dados: AtualizarMenuDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Menus>> {
    const menuAtualizado = await this.menusService.atualizarMenu(id, dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Menu atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menuAtualizado,
    };
  }

  @Delete(':coMenu')
  @ApiOperation({ summary: 'Deleta um menu existente' })
  @ApiParam({ name: 'coMenu', type: Number, description: 'ID do Menu' })
  async deletar(
    @Param('coMenu') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<null>> {
    await this.menusService.deletarMenu(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Menu deletado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
    };
  }

  @Put(':coMenu')
  @ApiOperation({ summary: 'Alterna o status ativo/inativo do menu' })
  @ApiParam({ name: 'coMenu', type: Number, description: 'ID do Menu' })
  async alternarStatus(
    @Param('coMenu') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<Menus>> {
    const menuAtualizado = await this.menusService.alternarStatus(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status do menu alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menuAtualizado,
    };
  }
}
