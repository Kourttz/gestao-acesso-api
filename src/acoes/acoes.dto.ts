import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CriarAcaoDto {
  @IsNumber()
  @Min(1)
  coAcao: number;

  @IsString()
  noAcao: string;

  @IsBoolean()
  icSituacaoAtivo: boolean;
}

export class AtualizarAcaoDto {
    @IsNumber()
    @Min(1)
    coAcao: number;
  
    @IsString()
    noAcao: string;
  
    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class DeletarAcaoDto {
    @IsNumber()
    @Min(1)
    coAcao: number;
}

export class AlternarStatusDto {
    @IsNumber()
    @Min(1)
    coAcao: number;
}
