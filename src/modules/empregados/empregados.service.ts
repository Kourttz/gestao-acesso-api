
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empregado } from './entities/empregado.entity';

@Injectable()
export class EmpregadosService {
  constructor(
    @InjectRepository(Empregado)
    private readonly repo: Repository<Empregado>,
  ) {}

  /**
   * Cria um novo empregado
   */
  async create(empregado: Empregado): Promise<void> {
    await this.repo.insert(empregado);
    console.log(`🆕 CREATE - Matrícula ${empregado.co_matricula} criada`);
  }

  /**
   * Atualiza um empregado existente
   */
  async update(co_matricula: string, data: Partial<Empregado>): Promise<void> {
    await this.repo.update({ co_matricula }, data);
    console.log(`✏️ UPDATE - Matrícula ${co_matricula} atualizada`);
  }

  /**
   * Deleta um empregado existente
   */
  async delete(co_matricula: string): Promise<void> {
    await this.repo.delete({ co_matricula });
    console.log(`🗑️ DELETE - Matrícula ${co_matricula} deletada`);
  }
}