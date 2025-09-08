import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { getUser } from '@/lib/auth';
import { z } from 'zod';

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

// JWT secret key - should be in .env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Datos de inicio de sesión inválidos', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    
    // Validate credentials (would connect to API in production)
    const user = await getUser(email, password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // Token expires in 24 hours
      .sign(JWT_SECRET);
    
    // Set cookies
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
      path: '/',
    });
    
    // Return success with user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      access_token: token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error de autenticación' },
      { status: 500 }
    );
  }
}
