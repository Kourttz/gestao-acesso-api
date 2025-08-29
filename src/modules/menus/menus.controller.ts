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
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  CriarMenuDto,
  AtualizarMenuDto,
  DeletarMenuDto,
  AlternarStatusDto,
} from './menus.dto';
import { MenusService } from './menus.service';
import { Menus } from './menus.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';
import { request } from 'http';

@ApiTags('Menus')
@UseFilters(HttpExceptionFilter)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas os Menus' })
  async listar(@Req() request:Request): Promise<ResponseDto<Menus[]>> {
    const menus = await this.menusService.listarMenus();
    return {
      statusCode: HttpStatus.OK,
      message: 'Menus listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menus
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Menu' })
  @ApiBody({
    type: CriarMenuDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: {  noMenu: 'Menu de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(@Body() dados: CriarMenuDto, @Req() request: Request): Promise<ResponseDto<Menus>> {
    const menu = await this.menusService.criarMenu(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Menu criado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menu
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza um menu existente' })
  @ApiBody({
    type: AtualizarMenuDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { coMenu:1,  noMenu: 'Menu atualizado' },
      },
    },
  })
  async atualizar(@Body() dados: AtualizarMenuDto, @Req() request:Request): Promise<ResponseDto<Menus>> {
    const menuAtualizado = await this.menusService.atualizarMenu(dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Menu atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menuAtualizado
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um menu existente' })
  @ApiBody({
    type: DeletarMenuDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de deleção',
        value: { coMenu: 1 },
      },
    },
  })
  async deletar(@Body() dados: DeletarMenuDto, @Req() request:Request): Promise<ResponseDto<null>> {
    await this.menusService.deletarMenu(dados.coMenu);
    return {
      statusCode: HttpStatus.OK,
      message: 'Menu deletado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: null
    };
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo da ação' })
  @ApiBody({
    type: AlternarStatusDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de alternância de status',
        value: { coMenu: 1 },
      },
    },
  })
  async alternarStatus(@Body() dados: AlternarStatusDto, @Req() request:Request): Promise<ResponseDto<Menus>> {
    const menuAtualizado = await this.menusService.alternarStatus(dados.coMenu);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status do menu alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: menuAtualizado
    };
  }
}
