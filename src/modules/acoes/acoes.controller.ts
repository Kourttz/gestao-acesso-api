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
  CriarAcaoDto,
  AtualizarAcaoDto,
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
      data: acoes,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova Ação' })
  @ApiBody({
    type: CriarAcaoDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noAcao: 'Ação de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(
    @Body() dados: CriarAcaoDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Acoes>> {
    const acao = await this.acoesService.criarAcao(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ação criada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acao,
    };
  }

  @Patch(':CoAcao')
  @ApiOperation({ summary: 'Atualiza uma ação existente' })
  @ApiBody({
    type: AtualizarAcaoDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { noAcao: 'Ação atualizada' },
      },
    },
  })
  @ApiParam({ name: 'coAcao', type: Number, description: 'ID da Ação' })
  async atualizar(
    @Param('coAcao') id: number,
    @Body() dados: AtualizarAcaoDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Acoes>> {
    const acaoAtualizada = await this.acoesService.atualizarAcao(id, dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ação atualizada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acaoAtualizada,
    };
  }

  @Delete(':coAcao')
  @ApiOperation({ summary: 'Deleta uma ação existente' })
  @ApiParam({ name: 'coAcao', type: Number, description: 'ID da Ação' })
  async deletar(
    @Param('coAcao') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<null>> {
    await this.acoesService.deletarAcao(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ação deletada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: null,
    };
  }

  @Put(':coAcao')
  @ApiOperation({ summary: 'Alterna o status ativo/inativo da ação' })
  @ApiParam({ name: 'coAcao', type: Number, description: 'ID da Ação' })
  async alternarStatus(
    @Param('coAcao') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<Acoes>> {
    const acaoAtualizada = await this.acoesService.alternarStatus(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status da ação alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: acaoAtualizada,
    };
  }
}
