import {
  Controller,
  Get,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

@ApiTags('Usuarios')
@UseFilters(HttpExceptionFilter)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Usuários' })
  async listar(): Promise<ResponseDto<Usuarios[]>> {
    const usuarios = await this.usuariosService.listarUsuarios();
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuários listados com sucesso',
      data: usuarios,
    };
  }
}
