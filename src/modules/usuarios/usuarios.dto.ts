import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class AtualizarPerfilUsuarioDto {
    @IsNumber()
    @Min(1)
    coUsuario: number;
  
    @IsNumber()
    @Min(1)
    coPerfil: number;

}