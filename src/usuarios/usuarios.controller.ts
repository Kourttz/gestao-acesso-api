import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async listar(): Promise<Usuarios[]> {
    return this.usuariosService.listarUsuarios();
  }
}
