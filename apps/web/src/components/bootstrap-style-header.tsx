"use client"

import Link from "next/link"
import { useEffect } from "react"

export function BootstrapStyleHeader() {
  // Inicializar comportamiento de Bootstrap al cargar el componente
  useEffect(() => {
    // Asegurarse de que el documento está disponible (solo del lado del cliente)
    if (typeof document !== 'undefined') {
      // Esto se ejecutará después de que se monte el componente
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');

      if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
          navbarCollapse?.classList.toggle('show');
        });
      }

      // Cerrar el menú al hacer clic en un enlace
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navbarCollapse?.classList.remove('show');
        });
      });
    }
  }, []);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Precios", href: "/precios" },
    { label: "Chat", href: "/chat" },
    { label: "Documentos", href: "/documents" },
    { label: "FAQ", href: "/faq" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-2" 
               style={{width: "32px", height: "32px"}}>
            <span className="fw-bold">A</span>
          </div>
          <span className="fw-bold">Abogado Virtual</span>
        </Link>
        
        <button className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link href={item.href} className="nav-link px-3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="d-flex">
            <Link href="/signin" className="btn btn-outline-primary me-2">
              Iniciar sesión
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
