import { Controller, Post, Body, Get } from '@nestjs/common';
import { FuncionalidadesService } from './funcionalidades.service';
import { Funcionalidades } from './funcionalidades.entity';

@Controller('funcionalidades')
export class FuncionalidadesController {
    constructor(private readonly funcionalidadesService: FuncionalidadesService) {}
    
    @Get()
    async listar(): Promise<Funcionalidades[]> {
      return this.funcionalidadesService.listarFuncionalidades();
    }

    @Post()
    async criar(@Body() dados: Partial<Funcionalidades>): Promise<Funcionalidades> {
      return this.funcionalidadesService.criarFuncionalidade(dados);
    }

    @Post('atualizar')
    async atualizar(@Body() dados: Partial<Funcionalidades>): Promise<Funcionalidades> {
        return this.funcionalidadesService.atualizarFuncionalidade(dados);
    }

    @Post('deletar')
    async deletar(@Body() dados: Partial<Funcionalidades>): Promise<void> {
        if (!dados.coFuncionalidade) {
            throw new Error('coFuncionalidade é obrigatório para deletar a funcionalidade');
        }
        return this.funcionalidadesService.deletarFuncionalidade(dados.coFuncionalidade);
    }

    @Post('alternarStatus')
    async alternarStatus(@Body() dados: { coFuncionalidade: number }): Promise<Funcionalidades> {
      if (typeof dados.coFuncionalidade !== 'number') {
        throw new Error('coFuncionalidade (number) é obrigatório');
      }
      return this.funcionalidadesService.alternarStatus(dados.coFuncionalidade);
    }
}
