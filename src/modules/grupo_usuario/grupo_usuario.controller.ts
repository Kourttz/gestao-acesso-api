  import {
    Controller,
    Get,
    Body,
    HttpStatus,
    UseFilters,
    Req,
    Param, 
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe, 
    Optional,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiOkResponse } from '@nestjs/swagger';
  import { GrupoUsuarioService } from './grupo_usuario.service';
  import { ResponseDto } from '../../common/filters/response.dto';
  import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
  import { CoUsuariosDto } from './grupo_usuario.dto'; 
  import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
  
  @ApiTags('Grupos Usuarios')
  @UseFilters(HttpExceptionFilter)
  @Controller('gu')
  export class GrupoUsuarioController {
      constructor(
          private readonly grupoUsuarioService: GrupoUsuarioService,
      ) {}
  
      @Get() 
      @ApiOperation({ summary: 'Lista todos os grupos e seus usuários aninhados.' })
      async listarTodosGrupos(@Req() request: Request): Promise<ResponseDto<any>> {
          const data = await this.grupoUsuarioService.listarTodosGruposComUsuarios();
          return {
              statusCode: 200,
              message: 'Grupos e usuários listados com sucesso.',
              timestamp: getGMT3Timestamp(),
              path: request.url,
              data, 
          };
      }
  
      @Get(':coGrupo') 
      @ApiOperation({ summary: 'Lista todos os usuários de um grupo específico.' })
      @ApiParam({
          name: 'coGrupo',
          description: 'ID do Grupo.',
          required: true,
          type: Number,
      })
      async listarUsuariosDeUmGrupo(
          @Req() request: Request,
          @Param('coGrupo', ParseIntPipe) coGrupo: number,
      ): Promise<ResponseDto<any>> {
          const data = await this.grupoUsuarioService.listarUsuariosPorGrupo(coGrupo);
          return {
              statusCode: 200,
              message: `Usuários do Grupo ${coGrupo} listados com sucesso.`,
              timestamp: getGMT3Timestamp(),
              path: request.url,
              data, 
          };
      }
  
      @Post(':coGrupo')
      @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
      @ApiOperation({
          summary: 'Atualiza ou cadastra (substitui) completamente os usuários vinculados a um grupo específico.',
          description: 'Deleta todos os vínculos existentes do grupo {coGrupo} e insere a nova lista de coUsuarios (transacionalmente).',
      })
      @ApiParam({
          name: 'coGrupo',
          description: 'ID do Grupo cujos usuários serão atualizados.',
          type: Number,
      })
      @ApiBody({ type: CoUsuariosDto })
      async atualizarOuCadastrar(
          @Param('coGrupo', ParseIntPipe) coGrupo: number,
          @Body() coUsuariosDto: CoUsuariosDto,
          @Req() request: Request,
      ): Promise<ResponseDto<null>> {
          await this.grupoUsuarioService.atualizarOuCadastrar(coGrupo, coUsuariosDto);
          return {
              statusCode: HttpStatus.OK, 
              message: `Vínculos do Grupo ${coGrupo} atualizados com sucesso!`,
              timestamp: getGMT3Timestamp(),
              path: request.url,
          };
      }
  }