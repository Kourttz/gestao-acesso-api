import { Controller, Post, Body, Get } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { Sistemas } from './sistemas.entity';

@Controller('sistemas')
export class SistemasController {
    constructor(private readonly sistemasService: SistemasService) {}
    
    @Get()
    async listar(): Promise<Sistemas[]> {
      return this.sistemasService.listarSistemas();
    }

    @Post()
    async criar(@Body() dados: Partial<Sistemas>): Promise<Sistemas> {
      return this.sistemasService.criarSistema(dados);
    }

    @Post('atualizar')
    async atualizar(@Body() dados: Partial<Sistemas>): Promise<Sistemas> {
        return this.sistemasService.atualizarSistema(dados);
    }

    @Post('deletar')
    async deletar(@Body() dados: Partial<Sistemas>): Promise<void> {
        if (!dados.coSistema) {
            throw new Error('coSistema é obrigatório para deletar o sistema');
        }
        return this.sistemasService.deletarSistema(dados.coSistema);
    }

    @Post('alternarStatus')
    async alternarStatus(@Body() dados: { coSistema: number }): Promise<Sistemas> {
      if (typeof dados.coSistema !== 'number') {
        throw new Error('coSistema (number) é obrigatório');
      }
      return this.sistemasService.alternarStatus(dados.coSistema);
    }
}
