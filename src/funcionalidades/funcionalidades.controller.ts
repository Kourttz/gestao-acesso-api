import { Controller, Post, Body, Get, Patch, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CriarFuncionalidadeDto, AtualizarFuncionalidadeDto, DeletarFuncionalidadeDto, AlternarStatusFuncionalidadeDto } from './funcionalidades.dto';
import { FuncionalidadesService } from './funcionalidades.service';
import { Funcionalidades } from './funcionalidades.entity';

@ApiTags('Funcionalidades')
@Controller('funcionalidades')
export class FuncionalidadesController {
  constructor(private readonly funcionalidadesService: FuncionalidadesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as funcionalidades' })
  async listar(): Promise<Funcionalidades[]> {
    return this.funcionalidadesService.listarFuncionalidades();
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova funcionalidade' })
  @ApiBody({ type: CriarFuncionalidadeDto, examples: {
    exemplo: {
      summary: 'Exemplo de criação',
      value: { coFuncionalidade: 1, noFuncionalidade: 'Funcionalidade de Teste', icSituacaoAtivo: true }
    }
  }})
  async criar(@Body() dados: CriarFuncionalidadeDto): Promise<Funcionalidades> {
    return this.funcionalidadesService.criarFuncionalidade(dados);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma funcionalidade existente' })
  @ApiBody({ type: AtualizarFuncionalidadeDto, examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { coFuncionalidade: 1, noFuncionalidade: 'Funcionalidade Atualizada', icSituacaoAtivo: false }
    }
  }})
  async atualizar(@Body() dados: AtualizarFuncionalidadeDto): Promise<Funcionalidades> {
    return this.funcionalidadesService.atualizarFuncionalidade(dados);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma funcionalidade existente' })
  @ApiBody({ type: DeletarFuncionalidadeDto, examples: {
    exemplo: {
      summary: 'Exemplo de deleção',
      value: { coFuncionalidade: 1 }
    }
  }})
  async deletar(@Body() dados: DeletarFuncionalidadeDto): Promise<void> {
    return this.funcionalidadesService.deletarFuncionalidade(dados.coFuncionalidade);
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo de uma funcionalidade' })
  @ApiBody({ type: AlternarStatusFuncionalidadeDto, examples: {
    exemplo: {
      summary: 'Exemplo de alternância de status',
      value: { coFuncionalidade: 1 }
    }
  }})
  async alternarStatus(@Body() dados: AlternarStatusFuncionalidadeDto): Promise<Funcionalidades> {
    return this.funcionalidadesService.alternarStatus(dados.coFuncionalidade);
  }
}
