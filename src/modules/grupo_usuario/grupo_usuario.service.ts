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
     * Lista todos os grupos com seus respectivos usuários aninhados.
     */
    async listarTodosGruposComUsuarios(): Promise<any> { 
        
        const gruposComUsuarios = await this.GruposRepository.find({ 
            relations: ['GruposUsuarios', 'GruposUsuarios.coUsuario'], 
            select: {
                coGrupo: true,
                noGrupo: true, 
            },
        });

        return gruposComUsuarios.map(grupo => ({
            coGrupo: grupo.coGrupo,
            noGrupo: grupo.noGrupo,
            usuarios: grupo.GruposUsuarios.map(gu => gu.coUsuario), 
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

    // O método atualizarOuCadastrar permanece o mesmo
    async atualizarOuCadastrar(
        coGrupo: number,
        coUsuariosDto: CoUsuariosDto,
    ): Promise<void> {
        const coUsuarios = coUsuariosDto.coUsuarios || [];
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const grupoExiste = await queryRunner.manager.findOne(Grupos, { where: { coGrupo } });
            
            if (!grupoExiste) {
                throw new HttpException(
                    `Grupo com ID ${coGrupo} não encontrado.`,
                    HttpStatus.NOT_FOUND,
                );
            }

            await queryRunner.manager.delete(GrupoUsuario, {
                coGrupo: { coGrupo } as Grupos,
            });

            if (coUsuarios.length === 0) {
                await queryRunner.commitTransaction();
                return;
            }
            
            const novosGU: GrupoUsuario[] = coUsuarios.map((coUsuario) => 
                queryRunner.manager.create(GrupoUsuario, {
                    coGrupo: { coGrupo } as Grupos,
                    coUsuario: { coUsuario } as Usuarios,
                })
            );
            
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