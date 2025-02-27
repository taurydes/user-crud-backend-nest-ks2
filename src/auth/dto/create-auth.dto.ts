import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Nombre de usuario o correo electrónico',
    example: 'juan123 o juan@example.com',
  })
  @IsString({ message: 'Debe ingresar un correo electrónico o nombre de usuario' })
  credential: string; // Puede ser email o username

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
