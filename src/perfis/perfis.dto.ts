import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CriarPerfilDto {
  @IsNumber()
  @Min(1)
  coPerfil: number;

  @IsString()
  noPerfil: string;

  @IsString()
  dePerfil: string;

  @IsBoolean()
  icSituacaoAtivo: boolean;
}

export class AtualizarPerfilDto {
    @IsNumber()
    @Min(1)
    coPerfil: number;
  
    @IsString()
    noPerfil: string;

    @IsString()
    dePerfil: string;
  
    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class DeletarPerfilDto {
    @IsNumber()
    @Min(1)
    coPerfil: number;
}

export class AlternarStatusPerfilDto {
    @IsNumber()
    @Min(1)
    coPerfil: number;
}
