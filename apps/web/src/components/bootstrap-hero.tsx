"use client"

import Link from "next/link"
import { Button } from "react-bootstrap"

export function BootstrapHero() {
  return (
    <section className="py-5 text-center bg-light">
      <div className="container py-5">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="badge bg-primary text-white mb-3 fs-6">Asistencia Legal Inteligente</div>
            <h1 className="fw-bold display-4 mb-4">Asistencia legal para todos los chilenos</h1>
            <p className="lead text-muted mb-5">
              Resuelve tus dudas legales con nuestro asistente virtual especializado en leyes chilenas, disponible 24/7.
            </p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Button as={Link} href="/chat" variant="primary" size="lg" className="px-4 gap-3">
                Consulta gratuita
              </Button>
              <Button as={Link} href="/servicios" variant="outline-secondary" size="lg" className="px-4">
                Ver servicios
              </Button>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="position-relative mx-auto" style={{ width: '400px', height: '400px' }}>
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-primary opacity-50 animate__animated animate__pulse animate__infinite"></div>
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-circle bg-primary">
                <div className="text-white text-center fs-3 fw-bold">
                  Abogado<br/>Virtual<br/>Chile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
