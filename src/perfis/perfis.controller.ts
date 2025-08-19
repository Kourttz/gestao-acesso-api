import { Controller, Get, Post, Body, Patch, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CriarPerfilDto, AtualizarPerfilDto, DeletarPerfilDto, AlternarStatusPerfilDto } from './perfis.dto';
import { Perfis } from './perfis.entity';
import { PerfisService } from './perfis.service';

@ApiTags('Perfis')
@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os perfis' })
  async listar(): Promise<Perfis[]> {
    return this.perfisService.listarPerfis();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo perfil' })
  @ApiBody({ type: CriarPerfilDto, examples: {
    exemplo: {
      summary: 'Exemplo de criação',
      value: { coPerfil: 1, noPerfil: 'Administrador', icSituacaoAtivo: true }
    }
  }})
  async criar(@Body() dados: CriarPerfilDto): Promise<Perfis> {
    return this.perfisService.criarPerfil(dados);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza um perfil existente' })
  @ApiBody({ type: AtualizarPerfilDto, examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { coPerfil: 1, noPerfil: 'Usuário', icSituacaoAtivo: false }
    }
  }})
  async atualizar(@Body() dados: AtualizarPerfilDto): Promise<Perfis> {
    return this.perfisService.atualizarPerfil(dados);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um perfil existente' })
  @ApiBody({ type: DeletarPerfilDto, examples: {
    exemplo: {
      summary: 'Exemplo de deleção',
      value: { coPerfil: 1 }
    }
  }})
  async deletar(@Body() dados: DeletarPerfilDto): Promise<void> {
    return this.perfisService.deletarPerfil(dados.coPerfil);
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo de um perfil' })
  @ApiBody({ type: AlternarStatusPerfilDto, examples: {
    exemplo: {
      summary: 'Exemplo de alternância de status',
      value: { coPerfil: 1 }
    }
  }})
  async alternarStatus(@Body() dados: AlternarStatusPerfilDto): Promise<Perfis> {
    return this.perfisService.alternarStatus(dados.coPerfil);
  }
}
