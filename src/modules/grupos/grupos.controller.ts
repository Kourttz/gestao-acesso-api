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
    CriarGrupoDto,
    AtualizarGrupoDto,
  } from './grupos.dto';
  import { GruposService } from './grupos.service';
  import { Grupos } from './grupos.entity';
  import { ResponseDto } from '../../common/filters/response.dto';
  import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
  import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
  import { Request } from 'express';
  import { CoUsuariosDto } from '../grupo_usuario/grupo_usuario.dto';
  
  @ApiTags('Grupos')
  @UseFilters(HttpExceptionFilter)
  @Controller('grupos')
  export class GruposController {
    constructor(private readonly gruposService: GruposService) {}
  
    @Get()
    @ApiOperation({ summary: 'Lista todos os Grupos' })
    async listar(@Req() request: Request): Promise<ResponseDto<Grupos[]>> {
      const grupos = await this.gruposService.listarGrupos();
      return {
        statusCode: HttpStatus.OK,
        message: 'Grupos listados com sucesso',
        timestamp: getGMT3Timestamp(),
        path: request.url,
        data: grupos,
      };
    }
  
    @Post()
    @ApiOperation({ summary: 'Cria um novo Grupo' })
    @ApiBody({
      type: CriarGrupoDto,
      examples: {
        exemplo: {
          summary: 'Exemplo de criação',
          value: { noGrupo: 'Grupo de teste', coGrupoPai: null, coUsuarioDono: 1,  icSituacaoAtivo: true },
        },
      },
    })
    async criar(
      @Body() dados: CriarGrupoDto,
      @Req() request: Request,
    ): Promise<ResponseDto<Grupos>> {
      const grupo = await this.gruposService.criarGrupo(dados);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Grupo criado com sucesso',
        timestamp: getGMT3Timestamp(),
        path: request.url,
        data: grupo,
      };
    }
  
    @Patch(':coGrupo')
    @ApiOperation({ summary: 'Atualiza um grupo existente' })
    @ApiBody({
      type: AtualizarGrupoDto,
      examples: {
        exemplo: {
          summary: 'Exemplo de atualização',
          value: { noGrupo: 'Grupo atualizado', icSituacaoAtivo: true },
        },
      },
    })
    @ApiParam({ name: 'coGrupo', type: Number, description: 'ID do Grupo' })
    async atualizar(
      @Param('coGrupo') id: number,
      @Body() dados: AtualizarGrupoDto,
      @Req() request: Request,
    ): Promise<ResponseDto<Grupos>> {
      const grupoAtualizado = await this.gruposService.atualizarGrupo(id, dados);
      return {
        statusCode: HttpStatus.OK,
        message: 'Grupo atualizado com sucesso',
        timestamp: getGMT3Timestamp(),
        path: request.url,
        data: grupoAtualizado,
      };
    }
  
    @Delete(':coGrupo')
    @ApiOperation({ summary: 'Deleta um grupo existente' })
    @ApiParam({ name: 'coGrupo', type: Number, description: 'ID do Grupo' })
    async deletar(
      @Param('coGrupo') id: number,
      @Req() request: Request,
    ): Promise<ResponseDto<null>> {
      await this.gruposService.deletarGrupo(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Grupo deletado com sucesso',
        timestamp: getGMT3Timestamp(),
        path: request.url,
      };
    }
  
    @Put(':coGrupo')
    @ApiOperation({ summary: 'Alterna o status ativo/inativo do grupo' })
    @ApiParam({ name: 'coGrupo', type: Number, description: 'ID do Grupo' })
    async alternarStatus(
      @Param('coGrupo') id: number,
      @Req() request: Request,
    ): Promise<ResponseDto<Grupos>> {
      const grupoAtualizado = await this.gruposService.alternarStatus(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Status do grupo alternado com sucesso',
        timestamp: getGMT3Timestamp(),
        path: request.url,
        data: grupoAtualizado,
      };
    }
  }
  