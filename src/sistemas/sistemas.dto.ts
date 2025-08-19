import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CriarSistemaDto {
  @IsString()
  noSistema: string;

  @IsString()
  deSistema: string;

  @IsBoolean()
  icSituacaoAtivo: boolean;
}

export class AtualizarSistemaDto {
    @IsNumber()
    @Min(1)
    coSistema: number;
  
    @IsString()
    noSistema: string;

    @IsString()
    deSistema: string;
  
    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class DeletarSistemaDto {
    @IsNumber()
    @Min(1)
    coSistema: number;
}

export class AlternarStatusSistemaDto {
    @IsNumber()
    @Min(1)
    coSistema: number;
}
