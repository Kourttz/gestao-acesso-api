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
  CriarFuncionalidadeDto,
  AtualizarFuncionalidadeDto,
  DeletarFuncionalidadeDto,
  AlternarStatusFuncionalidadeDto,
} from './funcionalidades.dto';
import { FuncionalidadesService } from './funcionalidades.service';
import { Funcionalidades } from './funcionalidades.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

@ApiTags('Funcionalidades')
@UseFilters(HttpExceptionFilter)
@Controller('funcionalidades')
export class FuncionalidadesController {
  constructor(private readonly funcionalidadesService: FuncionalidadesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas os Funcionalidades' })
  async listar(): Promise<ResponseDto<Funcionalidades[]>> {
    const funcionalidades = await this.funcionalidadesService.listarFuncionalidades();
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidades listados com sucesso',
      data: funcionalidades,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo Funcionalidade' })
  @ApiBody({
    type: CriarFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação',
        value: { noFuncionalidade: 'Funcionalidade de teste', deFuncionalidade: 'Descrição dessa funcionalidade de teste', coSistema: 1, icSituacaoAtivo: true },
      },
    },
  })
  async criar(@Body() dados: CriarFuncionalidadeDto): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidade = await this.funcionalidadesService.criarFuncionalidade(dados);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Funcionalidade criada com sucesso',
      data: funcionalidade,
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma funcionalidade existente' })
  @ApiBody({
    type: AtualizarFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: {  coFuncionalidade:1, noFuncionalidade: 'Funcionalidade atualizada', deFuncionalidade: 'Descrição dessa funcionalidade de teste atualizada', coSistema: 1},
      },
    },
  })
  async atualizar(@Body() dados: AtualizarFuncionalidadeDto): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidadeAtualizado = await this.funcionalidadesService.atualizarFuncionalidade(dados);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidade atualizada com sucesso',
      data: funcionalidadeAtualizado,
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um funcionalidade existente' })
  @ApiBody({
    type: DeletarFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de deleção',
        value: { coFuncionalidade: 1 },
      },
    },
  })
  async deletar(@Body() dados: DeletarFuncionalidadeDto): Promise<ResponseDto<null>> {
    await this.funcionalidadesService.deletarFuncionalidade(dados.coFuncionalidade);
    return {
      statusCode: HttpStatus.OK,
      message: 'Funcionalidade deletada com sucesso',
    };
  }

  @Put()
  @ApiOperation({ summary: 'Alterna o status ativo/inativo da ação' })
  @ApiBody({
    type: AlternarStatusFuncionalidadeDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de alternância de status',
        value: { coFuncionalidade: 1 },
      },
    },
  })
  async alternarStatus(@Body() dados: AlternarStatusFuncionalidadeDto): Promise<ResponseDto<Funcionalidades>> {
    const funcionalidadeAtualizado = await this.funcionalidadesService.alternarStatus(dados.coFuncionalidade);
    return {
      statusCode: HttpStatus.OK,
      message: 'Status da funcionalidade alternado com sucesso',
      data: funcionalidadeAtualizado,
    };
  }
}
