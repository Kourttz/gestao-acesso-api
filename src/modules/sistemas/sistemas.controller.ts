import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Put,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  CriarSistemaDto,
  AtualizarSistemaDto,
  DeletarSistemaDto,
  AlternarStatusSistemaDto,
} from './sistemas.dto';
import { SistemasService } from './sistemas.service';
import { Sistemas } from './sistemas.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

@ApiTags('Sistemas')
@UseFilters(HttpExceptionFilter)
@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os Sistemas' })
  async listar(): Promise<ResponseDto<Sistemas[]>> {
    const sistemas = await this.sistemasService.listarSistemas();
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistemas listados com sucesso',
      data: sistemas,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Sistema' })
  @ApiBody({
    type: CriarSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noSistema: 'Sistema de teste', icSituacaoAtivo: true },
      },
    },
  })
  async criar(@Body() dados: CriarSistemaDto): Promise<ResponseDto<Sistemas>> {
    const sistema = await this.sistemasService.criarSistema(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Sistema criado com sucesso',
      data: sistema,
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma sistema existente' })
  @ApiBody({
    type: AtualizarSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: { coSistema: 1, noSistema: 'Sistema atualizado'},
      },
    },
  })
  async atualizar(@Body() dados: AtualizarSistemaDto): Promise<ResponseDto<Sistemas>> {
    const sistemaAtualizado = await this.sistemasService.atualizarSistema(dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistema atualizado com sucesso',
      data: sistemaAtualizado,
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um sistema existente' })
  @ApiBody({
    type: DeletarSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de deleção',
        value: { coSistema: 1 },
      },
    },
  })
  async deletar(@Body() dados: DeletarSistemaDto): Promise<ResponseDto<null>> {
    await this.sistemasService.deletarSistema(dados.coSistema);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sistema deletado com sucesso',
    };
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo do Sistema' })
  @ApiBody({
    type: AlternarStatusSistemaDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de alternância de status',
        value: { coSistema: 1 },
      },
    },
  })
  async alternarStatus(@Body() dados: AlternarStatusSistemaDto): Promise<ResponseDto<Sistemas>> {
    const sistemaAtualizado = await this.sistemasService.alternarStatus(dados.coSistema);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status do sistema alternado com sucesso',
      data: sistemaAtualizado,
    };
  }
}
