"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "¿Cómo funciona el Abogado Virtual?",
      answer: "Nuestro Abogado Virtual utiliza inteligencia artificial avanzada para responder a tus consultas legales. Simplemente escribe tu pregunta en el chat, y el sistema te dará una respuesta basada en las leyes chilenas vigentes, jurisprudencia y doctrina legal. Para consultas más complejas, puedes reservar una consulta con un abogado real."
    },
    {
      question: "¿Es segura la información que comparto?",
      answer: "Absolutamente. Toda la información compartida con nuestro Abogado Virtual está protegida con encriptación de extremo a extremo. No almacenamos tus conversaciones a menos que crees una cuenta y autorices explícitamente su almacenamiento. Cumplimos con todas las normativas de protección de datos personales vigentes en Chile."
    },
    {
      question: "¿Puedo confiar en las respuestas del Abogado Virtual?",
      answer: "El Abogado Virtual ofrece información legal general y orientativa, pero no sustituye el consejo personalizado de un abogado. Para casos complejos, siempre recomendamos consultar con un profesional legal. Las respuestas están basadas en la legislación chilena vigente y son actualizadas regularmente."
    },
    {
      question: "¿Qué tipos de consultas puedo realizar?",
      answer: "Puedes realizar consultas sobre derecho civil, laboral, familiar, penal, comercial, tributario, entre otros. El sistema está capacitado para responder preguntas sobre procedimientos legales, interpretación de leyes, derechos y obligaciones según el ordenamiento jurídico chileno."
    },
    {
      question: "¿Cuánto cuesta usar el servicio?",
      answer: "Ofrecemos un plan gratuito que te permite realizar un número limitado de consultas básicas. Para acceso ilimitado y funciones avanzadas como revisión de documentos y generación de escritos, contamos con planes de suscripción mensuales o anuales a precios accesibles. Consulta nuestra sección de Precios para más detalles."
    },
    {
      question: "¿Puedo usar los documentos generados en trámites oficiales?",
      answer: "Los documentos generados por el Abogado Virtual son borradores que pueden servir como base para documentos legales. Sin embargo, recomendamos que sean revisados por un abogado antes de ser utilizados en procedimientos oficiales, especialmente en casos de alta complejidad o valor."
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Preguntas Frecuentes</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Resolvemos tus dudas sobre nuestro servicio de asistencia legal virtual
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-8 py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
