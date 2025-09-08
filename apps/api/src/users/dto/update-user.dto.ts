import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ 
    description: 'User email address', 
    example: 'user@example.com',
    required: false
  })
  @IsEmail({}, { message: 'Por favor ingrese un email válido' })
  @IsOptional()
  email?: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'Password123!',
    required: false
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({ 
    description: 'User first name',
    example: 'Juan',
    required: false
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ 
    description: 'User last name',
    example: 'González',
    required: false
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ 
    description: 'User RUT (Chilean ID)',
    example: '12345678-9',
    required: false 
  })
  @IsString({ message: 'El RUT debe ser un texto' })
  @IsOptional()
  rut?: string;
}
