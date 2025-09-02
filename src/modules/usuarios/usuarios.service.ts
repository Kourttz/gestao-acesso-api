import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  async atualizarPerfilUsuario(
    coUsuario: number,
    coPerfil: number,
  ): Promise<Usuarios> {
    const usuario = await this.UsuariosRepository.findOne({
      where: { coUsuario },
    });
  
    if (!usuario) {
      throw new HttpException(
        `Usuário com código ${coUsuario} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
  
    usuario.coPerfil = coPerfil as any; 
  
    return await this.UsuariosRepository.save(usuario);
  }

}
