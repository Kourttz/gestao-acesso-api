import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Put,
  Param,
  UseFilters,
  HttpStatus,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import {
  CriarPerfilDto,
  AtualizarPerfilDto,
  DeletarPerfilDto,
  AlternarStatusPerfilDto,
} from './perfis.dto';
import { PerfisService } from './perfis.service';
import { Perfis } from './perfis.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Perfis')
@UseFilters(HttpExceptionFilter)
@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Perfis' })
  async listar(@Req() request: Request): Promise<ResponseDto<Perfis[]>> {
    const perfis = await this.perfisService.listarPerfis();
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfis listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfis
    };
  }

  @Get(':coPerfil')
  @ApiOperation({ summary: 'Obtém um Perfil pelo código' })
  @ApiParam({ name: 'coPerfil', description: 'ID do Perfil a ser obtido', type: Number })
  async obterPorCodigo(@Req() request: Request, @Param('coPerfil') coPerfil: number): Promise<ResponseDto<Perfis>> {
    const perfil = await this.perfisService.obterPerfilPorCodigo(coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil obtido com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfil
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Perfil' })
  @ApiBody({
    type: CriarPerfilDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noPerfil: 'Perfil de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(@Body() dados: CriarPerfilDto, @Req() request: Request): Promise<ResponseDto<Perfis>> {
    const perfil = await this.perfisService.criarPerfil(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Perfil criado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfil
    };
  }

  @Patch(':coPerfil')
  @ApiOperation({ summary: 'Atualiza uma perfil existente' })
  @ApiParam({ name: 'coPerfil', description: 'ID do Perfil a ser atualizado', type: Number })
  @ApiBody({
    type: AtualizarPerfilDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { noPerfil: 'Perfil atualizado' },
      },
    },
  })
  async atualizar(
    @Param('coPerfil') coPerfil: number,
    @Body() dados: Partial<Perfis>,
    @Req() request: Request
  ): Promise<ResponseDto<Perfis>> {
    const perfilAtualizado = await this.perfisService.atualizarPerfil({ coPerfil, ...dados });
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfilAtualizado
    };
  }

  @Delete(':coPerfil')
  @ApiOperation({ summary: 'Deleta um perfil existente' })
  @ApiParam({ name: 'coPerfil', description: 'ID do Perfil a ser deletado', type: Number })
  async deletar(
    @Param('coPerfil') coPerfil: number,
    @Req() request: Request
  ): Promise<ResponseDto<null>> {
    await this.perfisService.deletarPerfil(coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil deletado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
    };
  }

  @Put(':coPerfil')
  @ApiOperation({ summary: 'Alterna o status ativo/inativo do Perfil' })
  @ApiParam({ name: 'coPerfil', description: 'ID do Perfil para alternar status', type: Number })
  async alternarStatus(
    @Param('coPerfil') coPerfil: number,
    @Req() request: Request
  ): Promise<ResponseDto<Perfis>> {
    const perfilAtualizado = await this.perfisService.alternarStatus(coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status do perfil alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfilAtualizado
    };
  }
}
