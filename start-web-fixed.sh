#!/bin/bash

# Define la URL de la base de datos SQLite
export DATABASE_URL="file:./packages/database/prisma/dev.db"

# Actualiza la configuración de Next.js para simplificar el routing
echo "Actualizando configuración..."
cat > apps/web/next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@virtual-attorney/ui",
    "@virtual-attorney/database"
  ],
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

module.exports = nextConfig;
EOL

# Crear una página de redirección básica en la raíz para evitar errores de routing
mkdir -p apps/web/src/app
cat > apps/web/src/app/page.tsx << 'EOL'
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir a la página específica del idioma
  redirect('/es-CL');
}
EOL

# Crear un layout básico para evitar errores
cat > apps/web/src/app/layout.tsx << 'EOL'
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Virtual Chile',
  description: 'Asistencia legal inteligente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
EOL

# Habilitar i18n en la configuración
cat > apps/web/src/middleware.ts << 'EOL'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define una lista de locales disponibles
const locales = ['es-CL', 'en'];
const defaultLocale = 'es-CL';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Detectar si la URL ya incluye un locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();

  // Redireccionar a la versión con locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

// Configuración para el matcher de middleware
export const config = {
  matcher: [
    // Rutas para aplicar middleware excepto las que empiezan con /api/, /_next/, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
EOL

# Inicia la aplicación web en modo desarrollo
echo "Iniciando la aplicación web..."
cd apps/web && pnpm dev
