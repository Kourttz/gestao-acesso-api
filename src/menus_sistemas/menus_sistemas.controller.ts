import { Controller,Get,Post,Body,Param,ParseIntPipe } from '@nestjs/common';
import { ApiTags,ApiOperation,ApiParam,ApiBody,ApiResponse } from '@nestjs/swagger';
import { MenusSistemasService } from './menus_sistemas.service';
import { MenusSistemas } from './menus_sistemas.entity';
import { Sistemas } from 'src/sistemas/sistemas.entity';

@ApiTags('Menus Sistemas')
@Controller('MS')
export class MenusSistemasController {
  constructor(
    private readonly MenusSistemasService: MenusSistemasService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as ações de perfil-funcionalidade' })
  @ApiResponse({status: 200,description: 'Lista de ações retornada com sucesso.',type: [MenusSistemas]})
  async listar(): Promise<MenusSistemas[]> {
    return this.MenusSistemasService.listarMS();
  }

  @Get(':co_perfil')
  @ApiOperation({ summary: 'Obter permissões agrupadas por perfil' })
  @ApiParam({name: 'co_perfil',type: Number,description: 'Código do perfil'})
  @ApiResponse({status: 200,description: 'Permissões agrupadas retornadas com sucesso.'})
  async obterPorPerfil(
    @Param('co_perfil', ParseIntPipe) co_perfil: number,
  ) {
    return this.MenusSistemasService.getPermissoesAgrupadasPorPerfil(
      co_perfil,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Atualizar ou cadastrar vínculos de menus e sistemas'})
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'number' },
      },
      example: {
        "1": [1, 2, 4],
        "2": [2, 5],
      },
    },
  })
  async atualizarOuCadastrar(
    @Body() sistemas: Record<number, number[]>,
  ) {
    await this.MenusSistemasService.atualizarOuCadastrar(sistemas);
    return { message: 'Menus atualizados com sucesso!' };
  }

}
