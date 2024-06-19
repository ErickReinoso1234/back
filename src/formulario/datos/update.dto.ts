// src/formulario/dto/update-formulario.dto.ts
import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';

export class UpdateFormularioDto {
  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'Nombre solo puede contener letras' })
  nombre?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z]+$/, { message: 'Apellido solo puede contener letras' })
  apellido?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'Cédula solo puede contener números' })
  cedula?: string;
}
