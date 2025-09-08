import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { documentSchema, documentService } from '@/lib/documents';

// JWT secret key - should be in .env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
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
    
    // Get user's documents from our document service
    const documents = await documentService.getAll(userId);
    
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Documents GET error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
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
    
    // Parse and validate request body
    const body = await request.json();
    
    const result = documentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Datos de documento inválidos', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { title, content } = result.data;

    // Create the document with our document service
    const newDocument = await documentService.create({ title, content }, userId);
    
    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    console.error('Documents POST error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}
