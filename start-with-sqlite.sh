#!/bin/bash

# Establece la variable de entorno para SQLite
export DATABASE_URL="file:./packages/database/prisma/dev.db"

# Copia el esquema SQLite sobre el original
echo "Copiando esquema SQLite..."
cp packages/database/prisma/schema-sqlite.prisma packages/database/prisma/schema.prisma

# Crea archivos de componentes faltantes para la UI
echo "Creando archivos de componentes para UI..."
mkdir -p packages/ui/src/components

# Crear los archivos de componentes faltantes con contenido básico
COMPONENTS=("button" "card" "input" "progress" "tabs" "toast" "avatar" "dialog" "checkbox" "select" "separator" "theme-provider")

for component in "${COMPONENTS[@]}"; do
  echo "export function ${component^}() { return <div>${component}</div>; }" > packages/ui/src/components/$component.tsx
done

# Genera el cliente Prisma
echo "Generando cliente Prisma..."
pnpm --filter "@virtual-attorney/database" run db:generate

# Empuja el esquema a la base de datos
echo "Creando la base de datos SQLite..."
pnpm --filter "@virtual-attorney/database" run db:push

# Opcional: Seed de datos iniciales
echo "Preparando datos iniciales..."
echo "// Seed básico para SQLite" > packages/database/src/seed.ts
echo "import { PrismaClient } from '@prisma/client';" >> packages/database/src/seed.ts
echo "const prisma = new PrismaClient();" >> packages/database/src/seed.ts
echo "async function main() {" >> packages/database/src/seed.ts
echo "  // Crear usuario administrador" >> packages/database/src/seed.ts
echo "  await prisma.user.create({" >> packages/database/src/seed.ts
echo "    data: {" >> packages/database/src/seed.ts
echo "      email: 'admin@example.com'," >> packages/database/src/seed.ts
echo "      password_hash: '\$2b\$10\$EJrDz2JUL9HtFYxOoDhq7eVqQnInDTBKMUw2bvBOwLqUEXg5OU2vy', // contraseña: admin123" >> packages/database/src/seed.ts
echo "      role: 'ADMIN'," >> packages/database/src/seed.ts
echo "      first_name: 'Admin'," >> packages/database/src/seed.ts
echo "      last_name: 'Sistema'" >> packages/database/src/seed.ts
echo "    }" >> packages/database/src/seed.ts
echo "  });" >> packages/database/src/seed.ts
echo "  console.log('Base de datos inicializada con datos de prueba');" >> packages/database/src/seed.ts
echo "}" >> packages/database/src/seed.ts
echo "" >> packages/database/src/seed.ts
echo "main()" >> packages/database/src/seed.ts
echo "  .then(async () => {" >> packages/database/src/seed.ts
echo "    await prisma.\$disconnect();" >> packages/database/src/seed.ts
echo "  })" >> packages/database/src/seed.ts
echo "  .catch(async (e) => {" >> packages/database/src/seed.ts
echo "    console.error(e);" >> packages/database/src/seed.ts
echo "    await prisma.\$disconnect();" >> packages/database/src/seed.ts
echo "    process.exit(1);" >> packages/database/src/seed.ts
echo "  });" >> packages/database/src/seed.ts

echo "Cargando datos iniciales..."
pnpm --filter "@virtual-attorney/database" run db:seed

# Inicia la aplicación en modo desarrollo
echo "Iniciando la aplicación..."
pnpm dev
