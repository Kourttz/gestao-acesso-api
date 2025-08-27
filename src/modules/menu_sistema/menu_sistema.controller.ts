import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { MenuSistemaService } from './menu_sistema.service';
import { MenuSistema } from './menu_sistema.entity';
import { ResponseDto } from '../../common/filters/response.dto';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { MenuSistemaResponseDto } from './menu_sistema.dto';

@ApiTags('Menus Sistemas')
@UseFilters(HttpExceptionFilter)
@Controller('ms')
export class MenuSistemaController {
  constructor(
    private readonly menuSistemaService: MenuSistemaService,
  ) {}

  @Get()
  async listar(): Promise<{ statusCode: number; message: string; data: MenuSistemaResponseDto[] }> {
    const data = await this.menuSistemaService.listarMS();
    return {
      statusCode: 200,
      message: 'Menus e sistemas listados com sucesso.',
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Atualizar ou cadastrar vínculos de menus e sistemas',
  })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'number' },
      },
      example: {
        '1': [1, 2],
        '2': [1],
      },
    },
  })
  async atualizarOuCadastrar(
    @Body() sistemas: Record<number, number[]>,
  ): Promise<ResponseDto<null>> {
    await this.menuSistemaService.atualizarOuCadastrar(sistemas);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Menus atualizados com sucesso!',
      data: null,
    };
  }
}
