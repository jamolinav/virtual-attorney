"use client"

export function BootstrapStyleFeatures() {
  const features = [
    {
      icon: "bi-chat-dots-fill",
      title: "Consultas Instantáneas",
      description: "Recibe respuestas legales inmediatas a cualquier hora del día o de la noche, sin esperas ni citas."
    },
    {
      icon: "bi-shield-fill-check",
      title: "Privacidad Garantizada",
      description: "Todas tus consultas son tratadas con absoluta confidencialidad y protegidas por encriptación de nivel bancario."
    },
    {
      icon: "bi-book-fill",
      title: "Conocimiento Actualizado",
      description: "Nuestro sistema se mantiene al día con la última legislación chilena y jurisprudencia relevante."
    },
    {
      icon: "bi-hammer",
      title: "Revisión de Documentos",
      description: "Sube contratos, documentos legales o cartas para análisis y recomendaciones personalizadas."
    },
    {
      icon: "bi-file-text-fill",
      title: "Generación de Documentos",
      description: "Crea borradores de cartas legales, contratos simples y reclamaciones formales con nuestro asistente."
    },
    {
      icon: "bi-clock-fill",
      title: "Historial de Consultas",
      description: "Accede a todas tus consultas anteriores y documentos generados en cualquier momento."
    }
  ]

  return (
    <section className="container-fluid py-5 bg-light">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-3">Nuestros Servicios</span>
          <h2 className="display-5 fw-bold mb-3">Soluciones legales completas</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            Nuestro abogado virtual ofrece una amplia gama de servicios para ayudarte con tus necesidades legales en Chile.
          </p>
        </div>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <i className={`bi ${feature.icon} text-primary fs-2`}></i>
                  </div>
                  <h3 className="card-title h5 fw-bold mb-3">{feature.title}</h3>
                  <p className="card-text text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
          transition: all 0.3s ease;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  )
}
