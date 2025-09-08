import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export type AuthUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  rut?: string | null;
  image?: string | null;
};

/**
 * Authenticates a user with email and password
 * In production, this would connect to your database via Prisma
 */
export async function getUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    // In a real app, you'd query the database
    // const user = await prisma.user.findUnique({ where: { email } });
    
    // For demo, simulate some mock users
    const mockUsers: AuthUser[] = [
      {
        id: 'user-1',
        email: 'admin@abogadovirtual.cl',
        password: '$2b$10$DJVm1JJPPoOKJcg5mIRIR.Sn9jJexCai4.sK2vQMul1yrgDn/Z5bS', // "password123"
        firstName: 'Admin',
        lastName: 'Usuario',
        role: 'ADMIN',
      },
      {
        id: 'user-2',
        email: 'usuario@ejemplo.com',
        password: '$2b$10$DJVm1JJPPoOKJcg5mIRIR.Sn9jJexCai4.sK2vQMul1yrgDn/Z5bS', // "password123"
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'USER',
        rut: '12345678-9',
      },
    ];

    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return null;
    }

    // Validate password
    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

/**
 * Gets a user by ID
 * In production, this would connect to your database via Prisma
 */
export async function getUserById(id: string): Promise<Omit<AuthUser, 'password'> | null> {
  try {
    // In a real app, you'd query the database
    // const user = await prisma.user.findUnique({ where: { id } });
    
    // For demo, simulate some mock users
    const mockUsers: AuthUser[] = [
      {
        id: 'user-1',
        email: 'admin@abogadovirtual.cl',
        password: '$2b$10$DJVm1JJPPoOKJcg5mIRIR.Sn9jJexCai4.sK2vQMul1yrgDn/Z5bS',
        firstName: 'Admin',
        lastName: 'Usuario',
        role: 'ADMIN',
      },
      {
        id: 'user-2',
        email: 'usuario@ejemplo.com',
        password: '$2b$10$DJVm1JJPPoOKJcg5mIRIR.Sn9jJexCai4.sK2vQMul1yrgDn/Z5bS',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: 'USER',
        rut: '12345678-9',
      },
    ];

    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return null;
    }

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}
