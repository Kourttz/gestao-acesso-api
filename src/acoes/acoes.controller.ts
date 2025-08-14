import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CriarAcaoDto, AtualizarAcaoDto, DeletarAcaoDto, AlternarStatusDto } from './acoes.dto';
import { AcoesService } from './acoes.service';
import { Acoes } from './acoes.entity';

@ApiTags('Ações')
@Controller('acoes')
export class AcoesController {
  constructor(private readonly acoesService: AcoesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as ações' })
  async listar(): Promise<Acoes[]> {
    return this.acoesService.listarAcoes();
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova ação' })
  @ApiBody({ type: CriarAcaoDto, examples: {
    exemplo: {
      summary: 'Exemplo de criação',
      value: { coAcao: 1, noAcao: 'Ação de teste', icSituacaoAtivo: true }
    }
  }})
  async criar(@Body() dados: CriarAcaoDto): Promise<Acoes> {
    return this.acoesService.criarAcao(dados);
  }

  @Post('atualizar')
  @ApiOperation({ summary: 'Atualiza uma ação existente' })
  @ApiBody({ type: AtualizarAcaoDto, examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { coAcao: 1, noAcao: 'Ação atualizada', icSituacaoAtivo: false }
    }
  }})
  async atualizar(@Body() dados: AtualizarAcaoDto): Promise<Acoes> {
    return this.acoesService.atualizarAcao(dados);
  }

  @Post('deletar')
  @ApiOperation({ summary: 'Deleta uma ação existente' })
  @ApiBody({ type: DeletarAcaoDto, examples: {
    exemplo: {
      summary: 'Exemplo de deleção',
      value: { coAcao: 1 }
    }
  }})
  async deletar(@Body() dados: DeletarAcaoDto): Promise<void> {
    return this.acoesService.deletarAcao(dados.coAcao);
  }

  @Post('alternarStatus')
  @ApiOperation({ summary: 'Alterna o status ativo/inativo da ação' })
  @ApiBody({ type: AlternarStatusDto, examples: {
    exemplo: {
      summary: 'Exemplo de alternância de status',
      value: { coAcao: 1 }
    }
  }})
  async alternarStatus(@Body() dados: AlternarStatusDto): Promise<Acoes> {
    return this.acoesService.alternarStatus(dados.coAcao);
  }
}
