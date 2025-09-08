import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookie
    cookies().delete('authToken');
    
    // In a real application, you might also want to invalidate the token on the server
    // For example, add it to a blacklist or update the user's session in the database
    
    return NextResponse.json({
      message: 'Sesión cerrada con éxito',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}
