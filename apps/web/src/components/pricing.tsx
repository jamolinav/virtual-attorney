"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "Básico",
      description: "Para consultas ocasionales y necesidades legales simples",
      price: "Gratis",
      features: [
        "5 consultas gratuitas al mes",
        "Respuestas basadas en leyes chilenas",
        "Acceso a documentos legales básicos",
        "Sin acceso a revisión de documentos",
        "Sin historial de consultas"
      ],
      cta: "Comenzar gratis",
      ctaLink: "/signup",
      popular: false
    },
    {
      name: "Profesional",
      description: "Para individuos con necesidades legales frecuentes",
      price: "$9.990",
      period: "mensual",
      features: [
        "Consultas ilimitadas",
        "Revisión de documentos (hasta 5 al mes)",
        "Generación de documentos personalizados",
        "Historial completo de consultas",
        "Acceso prioritario al chat",
        "1 consulta con abogado real (30 min)"
      ],
      cta: "Suscribirse",
      ctaLink: "/signup?plan=pro",
      popular: true
    },
    {
      name: "Empresa",
      description: "Para empresas y organizaciones con equipos legales",
      price: "$24.990",
      period: "mensual",
      features: [
        "Todo lo incluido en Profesional",
        "Hasta 5 usuarios",
        "Revisión de documentos ilimitada",
        "Acceso a plantillas especiales de documentos",
        "3 consultas con abogado real (30 min)",
        "Panel de administración"
      ],
      cta: "Contactar ventas",
      ctaLink: "/contacto",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Planes</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Elije el plan adecuado para ti
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Precios transparentes y sin sorpresas. Cancela en cualquier momento.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div key={i} className={`relative flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm ${plan.popular ? 'border-primary shadow-md' : ''}`}>
              {plan.popular && (
                <div className="absolute right-0 top-0 mr-4 mt-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <div className="p-6 pt-10">
                <div className="flex flex-col space-y-2">
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mt-6 flex items-baseline text-3xl font-bold">
                  {plan.price}
                  {plan.period && (
                    <span className="ml-1 text-sm font-normal text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                    <Link href={plan.ctaLink}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground">
            ¿Necesitas un plan personalizado para tu organización? <Link href="/contacto" className="underline underline-offset-4 font-medium text-primary">Contáctanos</Link> para una cotización personalizada.
          </p>
        </div>
      </div>
    </section>
  )
}
