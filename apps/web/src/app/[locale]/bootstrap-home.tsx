import { Metadata } from "next"
import { BootstrapStyleHero } from "@/components/bootstrap-style-hero"
import { BootstrapStyleFeatures } from "@/components/bootstrap-style-features"
import { BootstrapStyleFooter } from "@/components/bootstrap-style-footer"
import { BootstrapStyleHeader } from "@/components/bootstrap-style-header"

export const metadata: Metadata = {
  title: "Abogado Virtual Chile - Asistencia legal inteligente",
  description: "Consultas legales simplificadas con inteligencia artificial especializada en leyes chilenas",
}

export default function BootstrapHome() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BootstrapStyleHeader />
      
      <main className="flex-grow-1 mt-5 pt-4">
        <BootstrapStyleHero />
        <BootstrapStyleFeatures />
        
        {/* Call to Action Section */}
        <section className="container-fluid py-5 bg-primary text-white">
          <div className="container py-5 text-center">
            <span className="badge bg-white text-primary mb-3">Disponible 24/7</span>
            <h2 className="display-5 fw-bold mb-4">¿Necesitas asistencia legal ahora mismo?</h2>
            <p className="lead mb-5 mx-auto" style={{maxWidth: "800px"}}>
              Consulta con nuestro Abogado Virtual y obtén respuestas inmediatas a tus preguntas legales, sin esperas ni citas previas.
            </p>
            <a href="/chat" className="btn btn-lg btn-light px-5 py-3 fw-medium">
              Iniciar consulta gratuita
            </a>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="container-fluid py-5 bg-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <span className="badge bg-primary mb-3">Testimonios</span>
              <h2 className="display-5 fw-bold mb-3">Lo que dicen nuestros usuarios</h2>
              <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
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
                          <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                        ))}
                      </div>
                      <p className="card-text mb-4">"{testimonial.text}"</p>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle text-primary fw-bold d-flex align-items-center justify-content-center me-3" style={{width: "48px", height: "48px"}}>
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
      
      <BootstrapStyleFooter />
    </div>
  )
}
