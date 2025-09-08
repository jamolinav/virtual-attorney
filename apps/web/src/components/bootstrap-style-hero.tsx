"use client"

import Link from "next/link"

export function BootstrapStyleHero() {
  return (
    <section className="container-fluid py-5 bg-light">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="text-center text-lg-start">
              <span className="badge bg-primary mb-3">Asistencia Legal Inteligente</span>
              <h1 className="display-4 fw-bold mb-4">Asistencia legal para todos los chilenos</h1>
              <p className="lead text-muted mb-5">
                Resuelve tus dudas legales con nuestro asistente virtual especializado en leyes chilenas, disponible 24/7.
              </p>
              <div className="d-grid d-md-block gap-3">
                <Link href="/chat" className="btn btn-primary btn-lg px-5 me-md-3 mb-3 mb-md-0">
                  Consulta gratuita
                </Link>
                <Link href="/servicios" className="btn btn-outline-secondary btn-lg px-5">
                  Ver servicios
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <div className="position-relative d-inline-block">
                <div className="rounded-circle position-absolute top-0 start-0 end-0 bottom-0 border border-2 border-primary" 
                     style={{animation: "pulse 2s infinite"}}></div>
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                     style={{width: "300px", height: "300px"}}>
                  <div className="fw-bold fs-1 text-center">
                    Abogado<br/>Virtual<br/>Chile
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}
