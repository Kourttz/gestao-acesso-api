import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseFilters,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  AtualizarPerfilFuncionalidadeDto,
  PerfilPermissao
} from './perfil_funcionalidade_acao.dto';
import { PerfilFuncionalidadeAcaoService } from './perfil_funcionalidade_acao.service';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { request } from 'express';

@ApiTags('Perfil Funcionalidade Ações')
@UseFilters(HttpExceptionFilter)
@Controller('pfa')
export class PerfilFuncionalidadeAcaoController {
  constructor(
    private readonly perfilFuncionalidadeAcaoService: PerfilFuncionalidadeAcaoService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as ações de perfil-funcionalidade' })
  async listar( @Req() request:Request): Promise<ResponseDto<any[]>> {
    const dados = await this.perfilFuncionalidadeAcaoService.listarPFA();
    return {
      statusCode: HttpStatus.OK,
      message: 'Ações de perfil listadas com sucesso.',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: dados
    };
  }

  @Get(':coPerfil')
  @ApiOperation({ summary: 'Obter permissões agrupadas por perfil' })
  async obterPorPerfil(
    @Param('coPerfil', ParseIntPipe) coPerfil: number,
  @Req() request:Request
  ): Promise<ResponseDto<PerfilPermissao[]>> {
    const dados = await this.perfilFuncionalidadeAcaoService.getPermissoesAgrupadasPorPerfil(coPerfil);
    return {
      statusCode: HttpStatus.OK,
      message: 'Acessos do perfil listados com sucesso.',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: dados
    };
  }

  @Post(':coPerfil')
  @ApiOperation({ summary: 'Atualizar ou cadastrar funcionalidades para um perfil' })
  @ApiBody({ type: AtualizarPerfilFuncionalidadeDto })
  async atualizarOuCadastrar(
    @Param('coPerfil', ParseIntPipe) coPerfil: number,
    @Body() dto: AtualizarPerfilFuncionalidadeDto,
    @Req() request:Request
  ): Promise<ResponseDto<null>> {
    await this.perfilFuncionalidadeAcaoService.atualizarOuCadastrar(
      coPerfil,
      dto.co_funcionalidade,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Perfil atualizado com sucesso!',
      timestamp: getGMT3Timestamp(),
      path: request.url,
    };
  }
}