import { Controller, Post, Body, Get, Put, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CriarSistemaDto, AtualizarSistemaDto, DeletarSistemaDto, AlternarStatusSistemaDto } from './sistemas.dto';
import { SistemasService } from './sistemas.service';
import { Sistemas } from './sistemas.entity';

@ApiTags('Sistemas')
@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os sistemas' })
  async listar(): Promise<Sistemas[]> {
    return this.sistemasService.listarSistemas();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo sistema' })
  @ApiBody({ type: CriarSistemaDto, examples: {
    exemplo: {
      summary: 'Exemplo de criação',
      value: { coSistema: 1, noSistema: 'Sistema de Teste', icSituacaoAtivo: true }
    }
  }})
  async criar(@Body() dados: CriarSistemaDto): Promise<Sistemas> {
    return this.sistemasService.criarSistema(dados);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza um sistema existente' })
  @ApiBody({ type: AtualizarSistemaDto, examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { coSistema: 1, noSistema: 'Sistema Atualizado', icSituacaoAtivo: false }
    }
  }})
  async atualizar(@Body() dados: AtualizarSistemaDto): Promise<Sistemas> {
    return this.sistemasService.atualizarSistema(dados);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um sistema existente' })
  @ApiBody({ type: DeletarSistemaDto, examples: {
    exemplo: {
      summary: 'Exemplo de deleção',
      value: { coSistema: 1 }
    }
  }})
  async deletar(@Body() dados: DeletarSistemaDto): Promise<void> {
    return this.sistemasService.deletarSistema(dados.coSistema);
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo de um sistema' })
  @ApiBody({ type: AlternarStatusSistemaDto, examples: {
    exemplo: {
      summary: 'Exemplo de alternância de status',
      value: { coSistema: 1 }
    }
  }})
  async alternarStatus(@Body() dados: AlternarStatusSistemaDto): Promise<Sistemas> {
    return this.sistemasService.alternarStatus(dados.coSistema);
  }
}
