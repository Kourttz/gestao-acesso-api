import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly UsuariosRepository: Repository<Usuarios>,
  ) {}

  async listarUsuarios(): Promise<Usuarios[]> {
    return this.UsuariosRepository.find({
      relations: ['coPerfil'],
    });
  }

  async atualizarPerfilUsuario( coUsuario: number, coPerfil: number ): Promise<void> {
    await this.UsuariosRepository.update(coUsuario, { coPerfil: { coPerfil }});
  }

}
