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
  CriarAcaoDto,
  AtualizarAcaoDto,
  DeletarAcaoDto,
  AlternarStatusDto,
} from './acoes.dto';
import { AcoesService } from './acoes.service';
import { Acoes } from './acoes.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Acoes')
@UseFilters(HttpExceptionFilter)
@Controller('acoes')
export class AcoesController {
  constructor(private readonly acoesService: AcoesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as Ações' })
  async listar(@Req() request: Request): Promise<ResponseDto<Acoes[]>> {
    const acoes = await this.acoesService.listarAcoes();
    return {
      statusCode: HttpStatus.OK,
      message: 'Ações listadas com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acoes
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma novo Ação' })
  @ApiBody({
    type: CriarAcaoDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: {  noAcao: 'Ação de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(@Body() dados: CriarAcaoDto,@Req() request:Request): Promise<ResponseDto<Acoes>> {
    const acao = await this.acoesService.criarAcao(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ação criada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acao
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma ação existente' })
  @ApiBody({
    type: AtualizarAcaoDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { coAcao:1, noAcao: 'Ação atualizada' },
      },
    },
  })
  async atualizar(@Body() dados: AtualizarAcaoDto,@Req() request:Request): Promise<ResponseDto<Acoes>> {
    const acaoAtualizada = await this.acoesService.atualizarAcao(dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ação atualizada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acaoAtualizada
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma ação existente' })
  @ApiBody({
    type: DeletarAcaoDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de deleção',
        value: { coAcao: 1 },
      },
    },
  })
  async deletar(@Body() dados: DeletarAcaoDto, @Req() request:Request): Promise<ResponseDto<null>> {
    await this.acoesService.deletarAcao(dados.coAcao);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ação deletada com sucesso',
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
        value: { coAcao: 1 },
      },
    },
  })
  async alternarStatus(@Body() dados: AlternarStatusDto, @Req() request:Request): Promise<ResponseDto<Acoes>> {
    const acaoAtualizada = await this.acoesService.alternarStatus(dados.coAcao);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status da ação alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acaoAtualizada
    };
  }
}
