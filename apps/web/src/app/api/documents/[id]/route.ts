import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { documentSchema, documentService } from '@/lib/documents';

// JWT secret key - should be in .env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

// Helper function to authenticate user
async function authenticateUser(request: NextRequest) {
  const cookieToken = cookies().get('authToken')?.value;
  const authHeader = request.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : null;
  
  const token = headerToken || cookieToken;
  
  if (!token) {
    return { authenticated: false, error: 'No autenticado', status: 401 };
  }
  
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const userId = verified.payload.id as string;
    
    if (!userId) {
      return { authenticated: false, error: 'Token inválido', status: 401 };
    }
    
    return { authenticated: true, userId };
  } catch (error) {
    return { authenticated: false, error: 'Token inválido', status: 401 };
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }
    
    // Get document ID from the URL
    const documentId = params.id;
    
    // Fetch the document using our document service
    const document = await documentService.getById(documentId, auth.userId);
    
    if (!document) {
      return NextResponse.json(
        { message: 'Documento no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(document);
  } catch (error) {
    console.error('Document GET error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }
    
    // Get document ID from the URL
    const documentId = params.id;
    
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

    // Update the document using our document service
    const updatedDocument = await documentService.update(documentId, { title, content }, auth.userId);
    
    if (!updatedDocument) {
      return NextResponse.json(
        { message: 'Documento no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error('Document PUT error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }
    
    // Get document ID from the URL
    const documentId = params.id;
    
    // Delete the document using our document service
    const success = await documentService.delete(documentId, auth.userId);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Documento no encontrado' },
        { status: 404 }
      );
    }
    
    // Return success message
    
    return NextResponse.json({ 
      message: 'Documento eliminado correctamente',
      id: documentId
    });
  } catch (error) {
    console.error('Document DELETE error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}
