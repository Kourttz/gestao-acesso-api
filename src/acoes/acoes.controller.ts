import { Controller, Post, Body, Get } from '@nestjs/common';
import { AcoesService } from './acoes.service';
import { Acoes } from './acoes.entity';

@Controller('acoes')
export class AcoesController {
    constructor(private readonly acoesService: AcoesService) {}
    
    @Get()
    async listar(): Promise<Acoes[]> {
      return this.acoesService.listarAcoes();
    }

    @Post()
    async criar(@Body() dados: Partial<Acoes>): Promise<Acoes> {
      return this.acoesService.criarAcao(dados);
    }

    @Post('atualizar')
    async atualizar(@Body() dados: Partial<Acoes>): Promise<Acoes> {
        return this.acoesService.atualizarAcao(dados);
    }

    @Post('deletar')
    async deletar(@Body() dados: Partial<Acoes>): Promise<void> {
        if (!dados.coAcao) {
            throw new Error('coAcao é obrigatório para deletar a ação');
        }
        return this.acoesService.deletarAcao(dados.coAcao);
    }

    @Post('alternarStatus')
    async alternarStatus(@Body() dados: { coAcao: number }): Promise<Acoes> {
      if (typeof dados.coAcao !== 'number') {
        throw new Error('coAcao (number) é obrigatório');
      }
      return this.acoesService.alternarStatus(dados.coAcao);
    }

}
