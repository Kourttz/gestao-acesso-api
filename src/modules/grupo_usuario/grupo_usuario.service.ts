import { 
    Injectable, 
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { GrupoUsuario } from './grupo_usuario.entity';
import { Grupos } from '../grupos/grupos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';
import { CoUsuariosDto } from './grupo_usuario.dto';

@Injectable()
export class GrupoUsuarioService {
    constructor(
        @InjectRepository(GrupoUsuario)
        private readonly GrupoUsuarioRepository: Repository<GrupoUsuario>,
        @InjectRepository(Grupos)
        private readonly GruposRepository: Repository<Grupos>,
        private dataSource: DataSource,
    ) {}

    /**
     * Lista todos os grupos com seus respectivos usuários participantes,
     * incluindo o nome e a matrícula do dono do grupo.
     */
    async listarTodosGruposComUsuarios(): Promise<any> { 
        
        const gruposComUsuarios = await this.GruposRepository.find({ 
            // Inclui o relacionamento do dono ('coDono') e dos participantes
            relations: [
                'coDono', 
                'GruposUsuarios', 
                'GruposUsuarios.coUsuario'
            ], 
            select: {
                coGrupo: true,
                noGrupo: true,
                /* Seleciona apenas os campos necessários do dono do grupo */ 
                coDono: {
                    coUsuario: true,
                    noName: true,
                    coMatricula: true,
                },
                /* Seleciona apenas os campos necessários dos usuários participantes */
                GruposUsuarios: {
                    coUsuario: {
                        coUsuario: true,
                        noName: true,
                        coMatricula: true,
                    },
                },
            },
        });
        
        const conditions = gruposComUsuarios.filter(grupo => grupo.GruposUsuarios.length > 0);

        /* Verifica se há grupos com usuários */
        if (conditions.length === 0) {
            throw new HttpException(
                'Nenhum grupo com usuários encontrado.',
                HttpStatus.NOT_FOUND,
            );
            
        }
        
        return gruposComUsuarios.map(grupo => ({
            coGrupo: grupo.coGrupo,
            noGrupo: grupo.noGrupo,
            /* Info do dono do grupo */
            dono: {
                coUsuario: grupo.coDono.coUsuario,
                noName: grupo.coDono.noName,
                coMatricula: grupo.coDono.coMatricula,
            },
            /* Lista de usuários participantes do grupo */
            usuarios: grupo.GruposUsuarios.map(gu => ({
                coUsuario: gu.coUsuario.coUsuario,
                noName: gu.coUsuario.noName,
                coMatricula: gu.coUsuario.coMatricula,
            })), 
        }));
    }

    /**
     * Lista todos os usuários de um grupo específico.
     * @param coGrupo ID do grupo.
     */
    async listarUsuariosPorGrupo(coGrupo: number): Promise<any> { 
        
        const vinculos = await this.GrupoUsuarioRepository.createQueryBuilder('gu')
            .leftJoinAndSelect('gu.coUsuario', 'coUsuario')
            .where('gu.coGrupo = :idGrupo', { idGrupo: coGrupo }) 
            .select([
                'gu.coGrupoUsuario', 
                'coUsuario.coUsuario',
                'coUsuario.noName'
            ])
            .getMany();
        
        if (vinculos.length === 0) {
            throw new HttpException(
                `Nenhum usuário encontrado para o Grupo ${coGrupo}.`
                , HttpStatus.NOT_FOUND);
        }

        return vinculos.map(v => v.coUsuario);
    }

    /** 
     * Atualiza ou cadastra os vínculos entre um grupo e seus usuários.
     * @param coGrupo ID do grupo.
     * @param coUsuariosDto DTO contendo a lista de IDs de usuários.
     */

    async atualizarOuCadastrar(
        coGrupo: number,
        coUsuariosDto: CoUsuariosDto,
    ): Promise<void> {
        const coUsuarios = coUsuariosDto.coUsuarios || [];
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        /* Tenta encontrar o grupo pelo ID fornecido */
        try {
            const grupoExiste = await queryRunner.manager.findOne(Grupos, { where: { coGrupo } });
            
            if (!grupoExiste) {
                throw new HttpException(
                    `Grupo com ID ${coGrupo} não encontrado.`,
                    HttpStatus.NOT_FOUND,
                );
            }
            /* Remove todos os vínculos existentes para o grupo */
            await queryRunner.manager.delete(GrupoUsuario, {
                coGrupo: { coGrupo } as Grupos,
            });

            if (coUsuarios.length === 0) {
                await queryRunner.commitTransaction();
                return;
            }
            
            /* Cria novos vínculos com os IDs de usuários fornecidos */
            const novosGU: GrupoUsuario[] = coUsuarios.map((coUsuario) => 
                queryRunner.manager.create(GrupoUsuario, {
                    coGrupo: { coGrupo } as Grupos,
                    coUsuario: { coUsuario } as Usuarios,
                })
            );
            
            /* Salva os novos vínculos no banco de dados */
            await queryRunner.manager.save(novosGU);
            
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            
            if (error instanceof HttpException) {
                throw error;
            }
            
            throw new HttpException(
                'Erro ao processar a atualização de vínculos. Verifique os IDs de grupo e usuários.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        } finally {
            await queryRunner.release();
        }
    }
}