"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground size-8 rounded-full flex items-center justify-center font-bold text-lg">A</div>
              <span className="text-xl font-bold">Abogado Virtual</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Asistencia legal inteligente para todos los chilenos, disponible 24/7.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Servicios</h4>
            <ul className="space-y-2">
              <li><Link href="/chat" className="text-sm text-muted-foreground hover:text-primary">Consultas Legales</Link></li>
              <li><Link href="/documents" className="text-sm text-muted-foreground hover:text-primary">Documentos Legales</Link></li>
              <li><Link href="/servicios" className="text-sm text-muted-foreground hover:text-primary">Servicios Premium</Link></li>
              <li><Link href="/precios" className="text-sm text-muted-foreground hover:text-primary">Planes y Precios</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Empresa</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">Preguntas Frecuentes</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Términos y Condiciones</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Abogado Virtual Chile. Todos los derechos reservados.
          </p>
          <p className="text-center md:text-right text-xs text-muted-foreground mt-2 md:mt-0">
            Desarrollado con ❤️ en Chile
          </p>
        </div>
      </div>
    </footer>
  )
}
