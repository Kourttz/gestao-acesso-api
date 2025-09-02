import {
  Controller,
  Get,
  UseFilters,
  HttpStatus,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { AtualizarPerfilUsuarioDto } from './usuarios.dto';
import { getGMT3Timestamp } from '../../common/utils/timestamp.util';
import { Request } from 'express';

@ApiTags('Usuarios')
@UseFilters(HttpExceptionFilter)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Usuários' })
  async listar(@Req() request:Request): Promise<ResponseDto<Usuarios[]>> {
    const usuarios = await this.usuariosService.listarUsuarios();
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuários listados com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: usuarios
    };
  }

  @Put(':coUsuario')
  @ApiOperation({ summary: 'Atualiza o Perfil de um usuário.' })
  @ApiBody({
    type: AtualizarPerfilUsuarioDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização de perfil',
        value: { coPerfil: 2 },
      },
    },
  })
  async atualizarPerfilUsuario(
    @Param('coUsuario', ParseIntPipe) coUsuario: number,
    @Body() dto: AtualizarPerfilUsuarioDto,
    @Req() request:Request
  ): Promise<ResponseDto<Usuarios>> {
    const usuarioAtualizado = await this.usuariosService.atualizarPerfilUsuario(
      coUsuario,
      dto.coPerfil,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil do usuário foi atualizado com sucesso',
      timestamp: getGMT3Timestamp(),
      path: request.url,
      data: usuarioAtualizado
    };
  }

}
