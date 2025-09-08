import { z } from 'zod';

// Document schema for validation
export const documentSchema = z.object({
  title: z.string().min(1, { message: 'El título no puede estar vacío' }),
  content: z.string().min(1, { message: 'El contenido no puede estar vacío' }),
  id: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

// Document type from schema
export type Document = z.infer<typeof documentSchema>;

// Document with required ID (for existing documents)
export type DocumentWithId = Document & { id: string };

// Mock documents for demo purposes
export const mockDocuments: DocumentWithId[] = [
  {
    id: 'doc-1',
    title: 'Contrato de arrendamiento',
    content: 'Este contrato de arrendamiento se celebra entre las partes [ARRENDADOR] y [ARRENDATARIO], para el inmueble ubicado en [DIRECCIÓN], por un periodo de [DURACIÓN] y por un canon mensual de [MONTO]. El arrendatario se compromete a mantener el inmueble en buen estado y el arrendador a garantizar el uso pacífico del mismo.',
    createdAt: '2025-07-15T10:30:00.000Z',
    updatedAt: '2025-07-15T10:30:00.000Z',
  },
  {
    id: 'doc-2',
    title: 'Demanda por incumplimiento de contrato',
    content: 'SEÑOR JUEZ DE LETRAS EN LO CIVIL DE [CIUDAD]\n\n[NOMBRE], abogado, cédula nacional de identidad N° [RUT], con domicilio en [DIRECCIÓN], en representación de [CLIENTE], según mandato judicial que acompaño en el primer otrosí, a S.S. respetuosamente digo:\n\nQue vengo en interponer demanda de cumplimiento de contrato con indemnización de perjuicios en contra de [DEMANDADO], [PROFESIÓN], domiciliado en [DIRECCIÓN DEMANDADO], en base a los siguientes antecedentes de hecho y de derecho...',
    createdAt: '2025-08-01T14:22:00.000Z',
    updatedAt: '2025-08-10T09:15:00.000Z',
  },
  {
    id: 'doc-3',
    title: 'Testamento',
    content: 'Yo, [NOMBRE COMPLETO], mayor de edad, de nacionalidad chilena, estado civil [ESTADO CIVIL], cédula nacional de identidad N° [RUT], domiciliado en [DIRECCIÓN], encontrándome en pleno uso de mis facultades mentales, vengo en otorgar mi testamento abierto, de acuerdo a lo dispuesto en el artículo 1014 y siguientes del Código Civil:\n\nPRIMERO: Declaro ser nacido en [LUGAR DE NACIMIENTO], el día [FECHA], hijo de don [NOMBRE DEL PADRE] y doña [NOMBRE DE LA MADRE].\n\nSEGUNDO: Declaro que al momento de otorgar este testamento, me encuentro casado con doña [NOMBRE DEL CÓNYUGE], con quien he procreado [NÚMERO] hijos llamados [NOMBRES DE LOS HIJOS].\n\nTERCERO: Dispongo que la totalidad de mis bienes sean distribuidos en partes iguales entre mis hijos antes mencionados, respetando siempre la porción conyugal que por ley le corresponde a mi cónyuge...',
    createdAt: '2025-08-20T16:45:00.000Z',
    updatedAt: '2025-08-20T16:45:00.000Z',
  },
];

// Document service mock functions (in production, these would interact with a database)
export const documentService = {
  // Get all documents
  getAll: async (userId: string): Promise<DocumentWithId[]> => {
    // In production, filter by userId
    return mockDocuments;
  },
  
  // Get a document by ID
  getById: async (id: string, userId: string): Promise<DocumentWithId | null> => {
    const document = mockDocuments.find(doc => doc.id === id);
    return document || null;
  },
  
  // Create a new document
  create: async (data: Document, userId: string): Promise<DocumentWithId> => {
    const newDocument: DocumentWithId = {
      ...data,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In production, save to database
    return newDocument;
  },
  
  // Update a document
  update: async (id: string, data: Partial<Document>, userId: string): Promise<DocumentWithId | null> => {
    const documentIndex = mockDocuments.findIndex(doc => doc.id === id);
    
    if (documentIndex === -1) {
      return null;
    }
    
    // In production, update in database
    const updatedDocument: DocumentWithId = {
      ...mockDocuments[documentIndex],
      ...data,
      id, // ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    return updatedDocument;
  },
  
  // Delete a document
  delete: async (id: string, userId: string): Promise<boolean> => {
    const documentIndex = mockDocuments.findIndex(doc => doc.id === id);
    
    if (documentIndex === -1) {
      return false;
    }
    
    // In production, delete from database
    return true;
  }
};
