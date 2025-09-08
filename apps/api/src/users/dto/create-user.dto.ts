import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'User email address', 
    example: 'user@example.com' 
  })
  @IsEmail({}, { message: 'Por favor ingrese un email válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'Password123!' 
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({ 
    description: 'User first name',
    example: 'Juan' 
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName: string;

  @ApiProperty({ 
    description: 'User last name',
    example: 'González' 
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName: string;

  @ApiProperty({ 
    description: 'User RUT (Chilean ID)',
    example: '12345678-9',
    required: false 
  })
  @IsString({ message: 'El RUT debe ser un texto' })
  @IsOptional()
  rut?: string;
}
