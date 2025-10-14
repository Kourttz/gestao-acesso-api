import { IsString, IsEmail, IsBoolean, IsInt, IsNumber, Min } from 'class-validator';

export class CadastrarPerfilUsuarioDto {
    @IsString()
    noName: string;

    @IsString()
    coMatricula: string;

    @IsEmail()
    noEmail: string;

    @IsBoolean()
    icSituacaoAtivo: boolean;
}

export class AtualizarPerfilUsuarioDto {
    @IsNumber()
    @Min(1)
    coUsuario: number;
  
    @IsNumber()
    @Min(1)
    coPerfil: number;

}

