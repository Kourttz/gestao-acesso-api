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

  /**
   * 
   * @returns Lista todos os usuários com seus perfis associados
   */
  async listarUsuarios(): Promise<Usuarios[]> {
    return this.UsuariosRepository.find({
      relations: ['coPerfil'],
    });
  }

  /**
   *  
   * @param dados 
   * @returns 
   */
  async cadastrarUser(dados: Partial<CadastrarPerfilUsuarioDto>): Promise<Usuarios> {

    /* Verifica se o campo coUsuario foi fornecido */
    if (!dados.noName || !dados.coMatricula) {
      throw new HttpException(
        'Dados obrigatórios (nome e/ou matrícula) não foram fornecidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const usuarioExistente = await this.UsuariosRepository.findOne({
      where: [{ noEmail: dados.noEmail }, { coMatricula: dados.coMatricula }],
    });
    
    /* Verifica se já existe um usuário com o mesmo e-mail ou matrícula */
    if (usuarioExistente) {
      throw new HttpException(
        'Já existe um usuário cadastrado com este e-mail ou matrícula.',
        HttpStatus.CONFLICT,
      );
    }

    /* Consulta para obter o nu_filial da tabela sc_bases.tb_empregados */
    const nu_filial_result = await this.UsuariosRepository.createQueryBuilder()
      .select('e.nu_filial', 'nuFilial') 
      .from('sc_bases.tb_empregados', 'e')
      .where('e.co_matricula = :matricula', { matricula: dados.coMatricula })
      .getRawOne<{ nuFilial: number }>(); 
    
    /* Cria o novo usuário com coPerfil fixo como 2 (usuário padrão) */
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

  /**
   * 
   * @param coUsuario 
   * @param coPerfil 
   * @returns 
   */
  async atualizarPerfilUsuario(
    coUsuario: number,
    coPerfil: number,
  ): Promise<Usuarios> {
    const usuario = await this.UsuariosRepository.findOne({
      where: { coUsuario },
    });
    
    /* Verifica se o usuário existe */
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
