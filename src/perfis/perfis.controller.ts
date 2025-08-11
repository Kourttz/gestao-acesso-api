import { Controller, Get, Post, Body } from '@nestjs/common';
import { Perfis } from './perfis.entity';
import { PerfisService } from './perfis.service';

@Controller('perfis')
export class PerfisController {
    constructor(private readonly perfisService: PerfisService) {}
    
    @Get()
    async listar(): Promise<Perfis[]> {
      return this.perfisService.listarPerfis();
    }

    @Post()
    async criar(@Body() dados: Partial<Perfis>): Promise<Perfis> {
      return this.perfisService.criarPerfil(dados);
    }

    @Post('atualizar')
    async atualizar(@Body() dados: Partial<Perfis>): Promise<Perfis> {
        return this.perfisService.atualizarPerfil(dados);
    }

    @Post('deletar')
    async deletar(@Body() dados: Partial<Perfis>): Promise<void> {
        if (!dados.coPerfil) {
            throw new Error('coPerfil é obrigatório para deletar o perfil');
        }
        return this.perfisService.deletarPerfil(dados.coPerfil);
    }

    @Post('alternarStatus')
    async alternarStatus(@Body() dados: { coPerfil: number }): Promise<Perfis> {
      if (typeof dados.coPerfil !== 'number') {
        throw new Error('coPerfil (number) é obrigatório');
      }
      return this.perfisService.alternarStatus(dados.coPerfil);
    }
}
