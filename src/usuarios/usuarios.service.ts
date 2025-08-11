import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeORM';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async listarUsuarios(): Promise<Usuarios[]> {
    return this.usuariosRepository.find();
  }
}
