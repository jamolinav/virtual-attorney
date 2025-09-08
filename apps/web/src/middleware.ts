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
