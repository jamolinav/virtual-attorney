"use client"

import Link from "next/link"
import { useState } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"

export function BootstrapHeader() {
  const [expanded, setExpanded] = useState(false)

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Precios", href: "/precios" },
    { label: "Chat", href: "/chat" },
    { label: "Documentos", href: "/documents" },
    { label: "FAQ", href: "/faq" }
  ]

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm py-3" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-2" style={{ width: '32px', height: '32px' }}>
            <span className="fw-bold">A</span>
          </div>
          <span className="fw-bold">Abogado Virtual</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index}
                as={Link} 
                href={item.href} 
                className="px-3"
                onClick={() => setExpanded(false)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <Button as={Link} href="/signin" variant="outline-primary" className="px-3">
              Iniciar sesión
            </Button>
            <Button as={Link} href="/signup" variant="primary" className="px-3">
              Registrarse
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
