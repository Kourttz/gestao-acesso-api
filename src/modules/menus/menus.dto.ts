import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CriarMenuDto {
  @IsString()
  noAcao: string;

  @IsBoolean()
  icSituacaoAtivo: boolean;
}

export class AtualizarMenuDto {
    @IsNumber()
    @Min(1)
    coMenu: number;
  
    @IsString()
    noMenu: string;
  
    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class DeletarMenuDto {
    @IsNumber()
    @Min(1)
    coMenu: number;
}

export class AlternarStatusDto {
    @IsNumber()
    @Min(1)
    coMenu: number;
}
