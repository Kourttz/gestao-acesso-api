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
  CriarFuncionalidadeDto,
  AtualizarFuncionalidadeDto,
} from './funcionalidades.dto';
import { FuncionalidadesService } from './funcionalidades.service';
import { Funcionalidades } from './funcionalidades.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Funcionalidades')
@UseFilters(HttpExceptionFilter)
@Controller('funcionalidades')
export class FuncionalidadesController {
  constructor(
    private readonly funcionalidadesService: FuncionalidadesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as Funcionalidades' })
  async listar(
    @Req() request: Request,
  ): Promise<ResponseDto<Funcionalidades[]>> {
    const funcionalidades =
      await this.funcionalidadesService.listarFuncionalidades();
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidades listadas com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: funcionalidades,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova Funcionalidade' })
  @ApiBody({
    type: CriarFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: {
          noFuncionalidade: 'Funcionalidade de teste',
          deFuncionalidade: 'Descrição dessa funcionalidade de teste',
          coSistema: 1,
          icSituacaoAtivo: true,
        },
      },
    },
  })
  async criar(
    @Body() dados: CriarFuncionalidadeDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidade =
      await this.funcionalidadesService.criarFuncionalidade(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Funcionalidade criada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: funcionalidade,
    };
  }

  @Patch(':coFuncionalidade')
  @ApiOperation({ summary: 'Atualiza uma funcionalidade existente' })
  @ApiBody({
    type: AtualizarFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { noFuncionalidade: 'Funcionalidade atualizada', deFuncionalidade: 'Descrição dessa funcionalidade de teste atualizada', coSistema: 1},
      },
    },
  })
  @ApiParam({ name: 'coFuncionalidade', type: Number, description: 'ID da Funcionalidade' })
  async atualizar(
    @Param('coFuncionalidade') id: number,
    @Body() dados: AtualizarFuncionalidadeDto,
    @Req() request: Request,
  ): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidadeAtualizada =
      await this.funcionalidadesService.atualizarFuncionalidade(id, dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidade atualizada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: funcionalidadeAtualizada,
    };
  }

  @Delete(':coFuncionalidade')
  @ApiOperation({ summary: 'Deleta uma funcionalidade existente' })
  @ApiParam({ name: 'coFuncionalidade', type: Number, description: 'ID da Funcionalidade' })
  async deletar(
    @Param('coFuncionalidade') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<null>> {
    await this.funcionalidadesService.deletarFuncionalidade(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidade deletada com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: null,
    };
  }

  @Put(':coFuncionalidade')
  @ApiOperation({
    summary: 'Alterna o status ativo/inativo da funcionalidade',
  })
  @ApiParam({ name: 'coFuncionalidade', type: Number, description: 'ID da Funcionalidade' })
  async alternarStatus(
    @Param('coFuncionalidade') id: number,
    @Req() request: Request,
  ): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidadeAtualizada =
      await this.funcionalidadesService.alternarStatus(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status da funcionalidade alternado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: funcionalidadeAtualizada,
    };
  }
}
