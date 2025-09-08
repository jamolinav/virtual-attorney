import { Metadata } from "next"
import Script from "next/script"

import { BootstrapHero } from "@/components/bootstrap-hero"
import { BootstrapFeatures } from "@/components/bootstrap-features"
import { BootstrapFooter } from "@/components/bootstrap-footer"
import { BootstrapHeader } from "@/components/bootstrap-header"

export const metadata: Metadata = {
  title: "Abogado Virtual Chile - Asistencia legal inteligente",
  description: "Consultas legales simplificadas con inteligencia artificial especializada en leyes chilenas",
}

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Bootstrap Bundle with Popper */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
              integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
              crossOrigin="anonymous" />

      <BootstrapHeader />
      <main className="flex-grow-1 pt-5 mt-5">
        <BootstrapHero />
        <BootstrapFeatures />
        
        {/* CTA Section */}
        <section className="py-5 bg-primary text-white text-center">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="badge bg-white text-primary mb-3">Disponible 24/7</div>
                <h2 className="display-5 fw-bold mb-4">¿Necesitas asistencia legal ahora mismo?</h2>
                <p className="lead mb-5">
                  Consulta con nuestro Abogado Virtual y obtén respuestas inmediatas a tus preguntas legales, sin esperas ni citas previas.
                </p>
                <a href="/chat" className="btn btn-lg btn-light px-5 py-3 fw-medium">
                  Iniciar consulta gratuita
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-5 bg-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <div className="badge bg-primary text-white mb-3">Testimonios</div>
              <h2 className="display-5 fw-bold mb-3">Lo que dicen nuestros usuarios</h2>
              <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                Miles de chilenos ya han resuelto sus dudas legales con nuestro asistente virtual.
              </p>
            </div>
            
            <div className="row g-4">
              {[
                {
                  name: "María González",
                  role: "Emprendedora",
                  text: "El abogado virtual me ayudó a entender cómo estructurar mi nuevo negocio legalmente. Fue rápido, claro y muy útil."
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Arrendatario",
                  text: "Tenía dudas sobre mi contrato de arriendo y en minutos obtuve respuestas claras sobre mis derechos. ¡Excelente servicio!"
                },
                {
                  name: "Daniela Pérez",
                  role: "Trabajadora",
                  text: "Consulté sobre un problema laboral y me orientó perfectamente. Ahora sé exactamente cómo proceder y cuáles son mis derechos."
                }
              ].map((testimonial, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm p-4">
                    <div className="card-body">
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill me-1" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ))}
                      </div>
                      <p className="card-text mb-4">"{testimonial.text}"</p>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle text-primary fw-bold d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px' }}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="card-title mb-0">{testimonial.name}</h6>
                          <small className="text-muted">{testimonial.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BootstrapFooter />
    </div>
  )
}
