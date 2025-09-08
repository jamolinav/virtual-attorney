import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getUserById } from '@/lib/auth';

// JWT secret key - should be in .env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies or authorization header
    const cookieToken = cookies().get('authToken')?.value;
    const authHeader = request.headers.get('authorization');
    const headerToken = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    const token = headerToken || cookieToken;
    
    if (!token) {
      return NextResponse.json(
        { message: 'No autenticado' },
        { status: 401 }
      );
    }
    
    // Verify JWT
    let payload;
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      payload = verified.payload;
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Get user ID from token
    const userId = payload.id as string;
    if (!userId) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      rut: user.rut || null,
      image: user.image || null,
    });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}
