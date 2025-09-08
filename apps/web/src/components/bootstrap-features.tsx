"use client"

import { Card, Row, Col, Container } from "react-bootstrap"
import { 
  BookOpen, 
  FileText, 
  Gavel, 
  MessageCircle, 
  Shield, 
  Clock 
} from "lucide-react"

export function BootstrapFeatures() {
  const features = [
    {
      icon: <MessageCircle size={36} className="text-primary mb-3" />,
      title: "Consultas Instantáneas",
      description: "Recibe respuestas legales inmediatas a cualquier hora del día o de la noche, sin esperas ni citas."
    },
    {
      icon: <Shield size={36} className="text-primary mb-3" />,
      title: "Privacidad Garantizada",
      description: "Todas tus consultas son tratadas con absoluta confidencialidad y protegidas por encriptación de nivel bancario."
    },
    {
      icon: <BookOpen size={36} className="text-primary mb-3" />,
      title: "Conocimiento Actualizado",
      description: "Nuestro sistema se mantiene al día con la última legislación chilena y jurisprudencia relevante."
    },
    {
      icon: <Gavel size={36} className="text-primary mb-3" />,
      title: "Revisión de Documentos",
      description: "Sube contratos, documentos legales o cartas para análisis y recomendaciones personalizadas."
    },
    {
      icon: <FileText size={36} className="text-primary mb-3" />,
      title: "Generación de Documentos",
      description: "Crea borradores de cartas legales, contratos simples y reclamaciones formales con nuestro asistente."
    },
    {
      icon: <Clock size={36} className="text-primary mb-3" />,
      title: "Historial de Consultas",
      description: "Accede a todas tus consultas anteriores y documentos generados en cualquier momento."
    }
  ]

  return (
    <section className="py-5 bg-light">
      <Container className="py-5">
        <div className="text-center mb-5">
          <div className="badge bg-primary text-white mb-3">Nuestros Servicios</div>
          <h2 className="display-5 fw-bold mb-3">Soluciones legales completas</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            Nuestro abogado virtual ofrece una amplia gama de servicios para ayudarte con tus necesidades legales en Chile.
          </p>
        </div>
        
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0 p-2">
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    {feature.icon}
                  </div>
                  <Card.Title className="fw-bold">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
