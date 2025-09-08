"use client"

import Link from "next/link"
import { Container, Row, Col } from "react-bootstrap"

export function BootstrapFooter() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="py-3">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                <span className="fw-bold">A</span>
              </div>
              <h5 className="mb-0">Abogado Virtual</h5>
            </div>
            <p className="text-white-50 mb-4">
              Asistencia legal inteligente para todos los chilenos, disponible 24/7.
            </p>
            <div className="d-flex gap-3">
              <Link href="#" className="text-white-50 hover-text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-white-50 hover-text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-white-50 hover-text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </Col>
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="mb-3">Servicios</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/chat" className="text-white-50 text-decoration-none">Consultas Legales</Link></li>
              <li className="mb-2"><Link href="/documents" className="text-white-50 text-decoration-none">Documentos Legales</Link></li>
              <li className="mb-2"><Link href="/servicios" className="text-white-50 text-decoration-none">Servicios Premium</Link></li>
              <li className="mb-2"><Link href="/precios" className="text-white-50 text-decoration-none">Planes y Precios</Link></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="mb-3">Empresa</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/about" className="text-white-50 text-decoration-none">Sobre Nosotros</Link></li>
              <li className="mb-2"><Link href="/faq" className="text-white-50 text-decoration-none">Preguntas Frecuentes</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-white-50 text-decoration-none">Contacto</Link></li>
              <li className="mb-2"><Link href="/blog" className="text-white-50 text-decoration-none">Blog</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="mb-3">Contáctanos</h6>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 me-2 text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-white-50">+56 2 2123 4567</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 me-2 text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-white-50">contacto@abogadovirtual.cl</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 me-2 text-primary">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-white-50">Av. Libertador Bernardo O'Higgins 1234, Santiago, Chile</span>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <Row>
          <Col className="text-center text-md-start">
            <p className="mb-0 text-white-50">&copy; {new Date().getFullYear()} Abogado Virtual Chile. Todos los derechos reservados.</p>
          </Col>
          <Col className="text-center text-md-end">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <Link href="/terms" className="text-white-50 text-decoration-none">Términos</Link>
              <Link href="/privacy" className="text-white-50 text-decoration-none">Privacidad</Link>
              <Link href="/cookies" className="text-white-50 text-decoration-none">Cookies</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
