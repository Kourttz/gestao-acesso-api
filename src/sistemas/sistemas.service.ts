import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeORM';
import { Repository } from 'typeorm';
import { Sistemas } from './sistemas.entity';

@Injectable()
export class SistemasService {
    constructor(
      @InjectRepository(Sistemas)
      private readonly sistemasRepository: Repository<Sistemas>,
    ) {}

    async listarSistemas(): Promise<Sistemas[]> {
      return this.sistemasRepository.find();
    }

    async criarSistema(dados: Partial<Sistemas>): Promise<Sistemas> {
      const sistema = this.sistemasRepository.create(dados);
      return await this.sistemasRepository.save(sistema);
    }

    async atualizarSistema(dados: Partial<Sistemas>): Promise<Sistemas> {
        if (!dados.coSistema) {
            throw new Error('ID (coSistema) não informado');
        }
        await this.sistemasRepository.update(dados.coSistema, dados);
        const sistema = await this.sistemasRepository.findOneBy({ coSistema: dados.coSistema });
        if (!sistema) {
            throw new Error('Sistema não encontrado após atualização');
        }
        return sistema;
    }

    async deletarSistema(coSistema: number): Promise<void> {
        const resultado = await this.sistemasRepository.delete(coSistema);
        if (resultado.affected === 0) {
            throw new Error('Sistema não encontrado para exclusão');
        }
    }

    async alternarStatus(coSistema: number): Promise<Sistemas> {
      const sistema = await this.sistemasRepository.findOneBy({ coSistema });
      if (!sistema) {
        throw new Error('Sistema não encontrado');
      }
      sistema.icSituacaoAtivo = !sistema.icSituacaoAtivo;
      await this.sistemasRepository.save(sistema);
      return sistema;
    }
}
