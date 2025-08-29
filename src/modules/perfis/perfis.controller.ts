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
  async listar(@Req() request:Request): Promise<ResponseDto<Perfis[]>> {
    const perfis = await this.perfisService.listarPerfis();
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfis listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfis
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
  async criar(@Body() dados: CriarPerfilDto, @Req() request:Request): Promise<ResponseDto<Perfis>> {
    const perfil = await this.perfisService.criarPerfil(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Perfil criado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfil
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma perfil existente' })
  @ApiBody({
    type: AtualizarPerfilDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { coPerfil: 1, noPerfil: 'Perfil atualizada'},
      },
    },
  })
  async atualizar(@Body() dados: AtualizarPerfilDto, @Req() request:Request): Promise<ResponseDto<Perfis>> {
    const perfilAtualizado = await this.perfisService.atualizarPerfil(dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfilAtualizado
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um perfil existente' })
  @ApiBody({
    type: DeletarPerfilDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de deleção',
        value: { coPerfil: 1 },
      },
    },
  })
  async deletar(@Body() dados: DeletarPerfilDto, @Req() request:Request): Promise<ResponseDto<null>> {
    await this.perfisService.deletarPerfil(dados.coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil deletado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: null
    };
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo do Perfil' })
  @ApiBody({
    type: AlternarStatusPerfilDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de alternância de status',
        value: { coPerfil: 1 },
      },
    },
  })
  async alternarStatus(@Body() dados: AlternarStatusPerfilDto, @Req() request:Request): Promise<ResponseDto<Perfis>> {
    const perfilAtualizado = await this.perfisService.alternarStatus(dados.coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status da perfil alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: perfilAtualizado
    };
  }
}
