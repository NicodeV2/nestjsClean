import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico',
  })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  //creamos role
  @ApiProperty({ example: 'admin,user', description: 'Rol del usuario' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role: string;
}
