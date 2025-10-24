import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsArray, IsNumber } from 'class-validator';

export class AtualizarPerfilFuncionalidadeDto {
  @ApiProperty({
    description: 'Objeto onde a chave é o ID da funcionalidade e o valor é um array de IDs de ações',
    example: {
      '1': [1, 2, 4],
      '2': [2, 5],
    },
  })
  @IsObject()
  co_funcionalidade: Record<
    number,
    number[]
  >;
}

export interface FuncionalidadePermissao {
  co_funcionalidade: number;
  no_funcionalidade: string;
  co_sistema: number;    
  no_sistema: string;     
  acoes: {
    co_acao: number;
    no_acao: string;
    vinculada: boolean;
  }[];
}

export interface PerfilPermissao {
  co_perfil: number;
  no_perfil: string;
  funcionalidades: FuncionalidadePermissao[];
}

export interface UsuarioPermissao {
  co_usuario: number;
  co_matricula: number;
  no_name: string;
  co_perfil: number;
  no_perfil: string;
  funcionalidades: FuncionalidadePermissao[];
}

