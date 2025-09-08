import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { z } from 'zod';

// JWT secret key - should be in .env
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

// OpenAI API key - should be in .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Schema for chat validation
const chatSchema = z.object({
  message: z.string().min(1, { message: 'El mensaje no puede estar vacío' }),
  chatId: z.string().optional(),
});

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
    
    const result = chatSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Datos de consulta inválidos', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { message, chatId } = result.data;

    // In production, here we would:
    // 1. Store the user message in the database
    // 2. Process the message with OpenAI API
    // 3. Store the AI response in the database
    // 4. Return the AI response to the user
    
    // For demo, simulate an AI response
    const aiResponse = await simulateAIResponse(message);

    // Generate a new chat ID if none was provided
    const newChatId = chatId || `chat-${Date.now()}-${userId}`;
    
    // Return the AI response
    return NextResponse.json({
      message: aiResponse,
      chatId: newChatId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}

async function simulateAIResponse(userMessage: string): Promise<string> {
  // In production, here we would use the OpenAI API or another LLM
  // For demo, return a canned response based on the user message
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Wait for 1 second to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (lowerMessage.includes('divorcio')) {
    return 'En Chile, existen tres tipos de divorcio: de común acuerdo, unilateral por cese de convivencia (3 años) y por culpa. Para un divorcio de común acuerdo, ambos cónyuges deben estar de acuerdo y presentar un acuerdo completo y suficiente ante el tribunal. ¿En qué situación específica te encuentras?';
  }
  
  if (lowerMessage.includes('herencia') || lowerMessage.includes('heredar')) {
    return 'La ley chilena establece un orden de sucesión para las herencias intestadas: primero los hijos, luego el cónyuge sobreviviente, los padres, los hermanos, etc. Los herederos forzosos tienen derecho a una parte de la herencia llamada "legítima". ¿Tienes alguna pregunta específica sobre una situación de herencia?';
  }
  
  if (lowerMessage.includes('contrato') || lowerMessage.includes('laboral')) {
    return 'Los contratos laborales en Chile están regulados por el Código del Trabajo. Un contrato puede ser indefinido, a plazo fijo o por obra o faena. Todo trabajador tiene derecho a indemnización por años de servicio en caso de despido injustificado. ¿Necesitas información sobre algún aspecto específico de tu contrato laboral?';
  }
  
  if (lowerMessage.includes('arriendo') || lowerMessage.includes('alquiler')) {
    return 'Los contratos de arriendo en Chile pueden ser verbales o escritos, aunque se recomienda formalizarlos por escrito. La ley establece ciertas obligaciones para el arrendador y el arrendatario. ¿Tienes alguna duda específica sobre tus derechos como arrendador o arrendatario?';
  }
  
  return 'Como abogado virtual chileno, puedo ayudarte con consultas sobre divorcio, herencias, contratos laborales, arrendamientos, y muchos otros temas legales. ¿Podrías proporcionar más detalles sobre tu situación para ofrecerte información más específica?';
}
