import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
// const prisma = new PrismaClient();

// Schema for registration validation
const registerSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  firstName: z.string().min(1, { message: 'El nombre es requerido' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido' }),
  rut: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Datos de registro inválidos', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { email, password, firstName, lastName, rut } = result.data;

    // In a real application, we would check if the user already exists
    // const existingUser = await prisma.user.findUnique({ where: { email } });
    
    // For demo purposes, simulate a check
    const existingUser = false; // simulado

    if (existingUser) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // In a real application, we would create the user in the database
    /*
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        rut,
        role: 'USER',
      },
    });
    */

    // For demo purposes, simulate a successful registration
    const user = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      rut,
      role: 'USER',
      createdAt: new Date(),
    };

    // Return success response
    return NextResponse.json({
      message: 'Registro exitoso',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error al registrar el usuario' },
      { status: 500 }
    );
  }
}
