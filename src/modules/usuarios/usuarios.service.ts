import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CadastrarPerfilUsuarioDto } from './usuarios.dto';


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

  async cadastrarUser(dados: Partial<CadastrarPerfilUsuarioDto>): Promise<Usuarios> {
    if (!dados.noName || !dados.coMatricula) {
      throw new HttpException(
        'Dados obrigatórios (nome e/ou matrícula) não foram fornecidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const usuarioExistente = await this.UsuariosRepository.findOne({
      where: [{ noEmail: dados.noEmail }, { coMatricula: dados.coMatricula }],
    });
  
    if (usuarioExistente) {
      throw new HttpException(
        'Já existe um usuário cadastrado com este e-mail ou matrícula.',
        HttpStatus.CONFLICT,
      );
    }

    // Busca a nu_filial na tabela tb_empregados,
    const nu_filial_result = await this.UsuariosRepository.createQueryBuilder()
      .select('e.nu_filial', 'nuFilial') 
      .from('sc_bases.tb_empregados', 'e')
      .where('e.co_matricula = :matricula', { matricula: dados.coMatricula })
      .getRawOne<{ nuFilial: number }>(); 
  
    const usuario = this.UsuariosRepository.create({
        noName: dados.noName,
        coMatricula: dados.coMatricula,
        noEmail: dados.noEmail,
        icSituacaoAtivo: dados.icSituacaoAtivo,
        coPerfil: { coPerfil: 2 },
        nuFilial: nu_filial_result?.nuFilial,
    });

    return await this.UsuariosRepository.save(usuario);
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
