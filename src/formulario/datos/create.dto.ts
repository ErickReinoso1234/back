import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  Length,
} from 'class-validator';

export class CreateFormularioDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, { message: 'Nombre solo puede contener letras' })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, { message: 'Apellido solo puede contener letras' })
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'Cédula es requerida' })
  @Matches(/^[0-9]+$/, { message: 'Cédula solo puede contener números' })
  @Length(10, 10, { message: 'Cédula debe tener exactamente 10 números' })
  cedula: string;
}
