"use client"

import { 
  BookOpen, 
  FileText, 
  Gavel, 
  MessageCircle, 
  Shield, 
  Clock 
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: "Consultas Instantáneas",
      description: "Recibe respuestas legales inmediatas a cualquier hora del día o de la noche, sin esperas ni citas."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Privacidad Garantizada",
      description: "Todas tus consultas son tratadas con absoluta confidencialidad y protegidas por encriptación de nivel bancario."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Conocimiento Actualizado",
      description: "Nuestro sistema se mantiene al día con la última legislación chilena y jurisprudencia relevante."
    },
    {
      icon: <Gavel className="h-10 w-10 text-primary" />,
      title: "Revisión de Documentos",
      description: "Sube contratos, documentos legales o cartas para análisis y recomendaciones personalizadas."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Generación de Documentos",
      description: "Crea borradores de cartas legales, contratos simples y reclamaciones formales con nuestro asistente."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Historial de Consultas",
      description: "Accede a todas tus consultas anteriores y documentos generados en cualquier momento."
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Nuestros Servicios
          </div>
          <div className="space-y-4 max-w-[800px]">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Soluciones legales completas
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl/relaxed lg:text-xl/relaxed">
              Nuestro abogado virtual ofrece una amplia gama de servicios para ayudarte con tus necesidades legales en Chile.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group relative flex flex-col items-center space-y-4 rounded-xl border bg-background p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
