// Seed básico para SQLite
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Verificar si el usuario admin ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  // Crear usuario administrador solo si no existe
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password_hash: '$2b$10$EJrDz2JUL9HtFYxOoDhq7eVqQnInDTBKMUw2bvBOwLqUEXg5OU2vy', // contraseña: admin123
        role: 'ADMIN',
        first_name: 'Admin',
        last_name: 'Sistema'
      }
    });
    console.log('Usuario administrador creado');
  } else {
    console.log('Usuario administrador ya existe');
  }
  
  console.log('Base de datos inicializada con datos de prueba');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
