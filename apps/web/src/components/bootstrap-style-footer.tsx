"use client"

import Link from "next/link"

export function BootstrapStyleFooter() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: "32px", height: "32px"}}>
                <span className="fw-bold">A</span>
              </div>
              <h5 className="mb-0">Abogado Virtual</h5>
            </div>
            <p className="text-white-50 mb-4">
              Asistencia legal inteligente para todos los chilenos, disponible 24/7.
            </p>
            <div className="d-flex mb-4">
              <a href="#" className="text-decoration-none me-3">
                <i className="bi bi-facebook fs-5 text-white-50"></i>
              </a>
              <a href="#" className="text-decoration-none me-3">
                <i className="bi bi-twitter-x fs-5 text-white-50"></i>
              </a>
              <a href="#" className="text-decoration-none me-3">
                <i className="bi bi-instagram fs-5 text-white-50"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-linkedin fs-5 text-white-50"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-4">Servicios</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link href="/chat" className="text-white-50 text-decoration-none hover-white">Consultas Legales</Link>
              </li>
              <li className="mb-2">
                <Link href="/documents" className="text-white-50 text-decoration-none hover-white">Documentos Legales</Link>
              </li>
              <li className="mb-2">
                <Link href="/servicios" className="text-white-50 text-decoration-none hover-white">Servicios Premium</Link>
              </li>
              <li className="mb-2">
                <Link href="/precios" className="text-white-50 text-decoration-none hover-white">Planes y Precios</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-4">Empresa</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link href="/about" className="text-white-50 text-decoration-none hover-white">Sobre Nosotros</Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-white-50 text-decoration-none hover-white">Preguntas Frecuentes</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-white-50 text-decoration-none hover-white">Contacto</Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-white-50 text-decoration-none hover-white">Blog</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4">Contáctanos</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                <span className="text-white-50">Av. Libertador Bernardo O'Higgins 1234, Santiago, Chile</span>
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                <span className="text-white-50">contacto@abogadovirtual.cl</span>
              </li>
              <li className="mb-3">
                <i className="bi bi-telephone-fill text-primary me-2"></i>
                <span className="text-white-50">+56 2 2123 4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-7 mb-3 mb-md-0">
            <p className="text-white-50 mb-0">
              &copy; {new Date().getFullYear()} Abogado Virtual Chile. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-5 text-md-end">
            <Link href="/terms" className="text-white-50 text-decoration-none me-3 hover-white">
              Términos y Condiciones
            </Link>
            <Link href="/privacy" className="text-white-50 text-decoration-none hover-white">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hover-white:hover {
          color: white !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
}
