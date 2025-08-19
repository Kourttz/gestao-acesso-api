import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CriarFuncionalidadeDto {
  @IsString()
  noFuncionalidade: string;

  @IsBoolean()
  icSituacaoAtivo: boolean;
}

export class AtualizarFuncionalidadeDto {
    @IsNumber()
    @Min(1)
    coFuncionalidade: number;
  
    @IsString()
    noFuncionalidade: string;
  
    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class DeletarFuncionalidadeDto {
    @IsNumber()
    @Min(1)
    coFuncionalidade: number;
}

export class AlternarStatusFuncionalidadeDto {
    @IsNumber()
    @Min(1)
    coFuncionalidade: number;
}
