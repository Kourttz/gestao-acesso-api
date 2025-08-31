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
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import {
  CriarSistemaDto,
  AtualizarSistemaDto,
} from './sistemas.dto';
import { SistemasService } from './sistemas.service';
import { Sistemas } from './sistemas.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Sistemas')
@UseFilters(HttpExceptionFilter)
@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Sistemas' })
  async listar(@Req() request: Request): Promise<ResponseDto<Sistemas[]>> {
    const sistemas = await this.sistemasService.listarSistemas();
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistemas listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: sistemas
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Sistema' })
  @ApiBody({
    type: CriarSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noSistema: 'Sistema de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(
    @Body() dados: CriarSistemaDto,
    @Req() request: Request
  ): Promise<ResponseDto<Sistemas>> {
    const sistema = await this.sistemasService.criarSistema(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Sistema criado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: sistema
    };
  }

  @Patch(':coSistema')
  @ApiOperation({ summary: 'Atualiza um sistema existente' })
  @ApiBody({
    type: AtualizarSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { noSistema: 'Sistema atualizado'},
      },
    },
  })
  @ApiParam({ name: 'coSistema', type: Number, required: true })
  async atualizar(
    @Param('coSistema', ParseIntPipe) coSistema: number,
    @Body() dados: AtualizarSistemaDto,
    @Req() request: Request
  ): Promise<ResponseDto<Sistemas>> {
    const sistemaAtualizado = await this.sistemasService.atualizarSistema(coSistema, dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistema atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: sistemaAtualizado
    };
  }

  @Delete(':coSistema')
  @ApiOperation({ summary: 'Deleta um sistema existente' })
  @ApiParam({ name: 'coSistema', type: Number, required: true })
  async deletar(
    @Param('coSistema', ParseIntPipe) coSistema: number,
    @Req() request: Request
  ): Promise<ResponseDto<null>> {
    await this.sistemasService.deletarSistema(coSistema);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistema deletado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: null,
    };
  }

  @Put(':coSistema')
  @ApiOperation({ summary: 'Alterna o status ativo/inativo do Sistema' })
  @ApiParam({ name: 'coSistema', type: Number, required: true })
  async alternarStatus(
    @Param('coSistema', ParseIntPipe) coSistema: number,
    @Req() request: Request
  ): Promise<ResponseDto<Sistemas>> {
    const sistemaAtualizado = await this.sistemasService.alternarStatus(coSistema);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status do sistema alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: sistemaAtualizado
    };
  }
}
