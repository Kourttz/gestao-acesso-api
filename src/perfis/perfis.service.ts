import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeORM';
import { Repository } from 'typeorm';
import { Perfis } from './perfis.entity';

@Injectable()
export class PerfisService {
    constructor(
      @InjectRepository(Perfis)
      private readonly perfisRepository: Repository<Perfis>,
    ) {}

    async listarPerfis(): Promise<Perfis[]> {
      return this.perfisRepository.find();
    }

    async criarPerfil(dados: Partial<Perfis>): Promise<Perfis> {
      const perfil = this.perfisRepository.create(dados);
      return await this.perfisRepository.save(perfil);
    }

    async atualizarPerfil(dados: Partial<Perfis>): Promise<Perfis> {
        if (!dados.coPerfil) {
            throw new Error('ID (coPerfil) não informado');
        }
        await this.perfisRepository.update(dados.coPerfil, dados);
        const perfil = await this.perfisRepository.findOneBy({ coPerfil: dados.coPerfil });
        if (!perfil) {
            throw new Error('Perfil não encontrado após atualização');
        }
        return perfil;
    }

    async deletarPerfil(coPerfil: number): Promise<void> {
        const resultado = await this.perfisRepository.delete(coPerfil);
        if (resultado.affected === 0) {
            throw new Error('Perfil não encontrado para exclusão');
        }
    }

    async alternarStatus(coPerfil: number): Promise<Perfis> {
      const perfil = await this.perfisRepository.findOneBy({ coPerfil });
      if (!perfil) {
        throw new Error('Perfil não encontrado');
      }
      perfil.icSituacaoAtivo = !perfil.icSituacaoAtivo;
      await this.perfisRepository.save(perfil);
      return perfil;
    }
}

