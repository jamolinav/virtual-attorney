"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface PlanOption {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  popular?: boolean
}

export function Pricing() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const plans: PlanOption[] = [
    {
      id: "free",
      name: "Plan Básico",
      description: "Acceso limitado a la consultoría legal virtual",
      price: 0,
      features: [
        "Límite de 3 consultas al mes",
        "Asistente legal básico",
        "Documentos legales básicos",
      ],
    },
    {
      id: "premium",
      name: "Plan Premium",
      description: "Consultoría legal completa para individuos",
      price: 29900,
      features: [
        "Consultas ilimitadas",
        "Asistente legal avanzado",
        "Todos los documentos legales",
        "Revisión manual por abogados expertos",
        "Seguimiento personalizado",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Plan Empresarial",
      description: "Solución completa para empresas",
      price: 99900,
      features: [
        "Todo lo del plan Premium",
        "Múltiples usuarios (hasta 5)",
        "Asistente legal especializado en derecho corporativo",
        "Documentos comerciales y corporativos",
        "Soporte prioritario 24/7",
      ],
    },
  ]

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para suscribirte",
        variant: "destructive",
      })
      return
    }

    setSelectedPlan(planId)
    setLoading(true)

    try {
      // En producción, aquí llamaríamos a la API
      // const response = await fetch("/api/subscriptions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ planId }),
      // })
      
      // const data = await response.json()
      
      // Simulamos una respuesta exitosa
      setTimeout(() => {
        toast({
          title: "¡Gracias por suscribirte!",
          description: "Tu suscripción ha sido procesada correctamente",
        })
        
        setLoading(false)
        setSelectedPlan(null)
        
        // En producción, aquí redirigimos al procesador de pagos o dashboard
        // window.location.href = data.paymentUrl
      }, 1500)
      
    } catch (error) {
      console.error("Error processing subscription", error)
      toast({
        title: "Error",
        description: "No se pudo procesar tu suscripción",
        variant: "destructive",
      })
      setLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Planes y Precios</h2>
        <p className="text-muted-foreground mt-2">
          Elige el plan que mejor se adapte a tus necesidades legales
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${
              plan.popular 
                ? "border-primary shadow-lg" 
                : ""
            }`}
          >
            <CardHeader>
              {plan.popular && (
                <div className="py-1 px-3 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-fit mb-2">
                  Más popular
                </div>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {plan.price === 0 ? "Gratis" : `$${plan.price.toLocaleString()}`}
                </span>
                {plan.price > 0 && <span className="text-muted-foreground ml-1">/mes</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading && selectedPlan === plan.id}
              >
                {loading && selectedPlan === plan.id 
                  ? "Procesando..." 
                  : plan.price === 0 
                    ? "Comenzar Gratis" 
                    : "Suscribirse"
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          Todos los precios están en pesos chilenos (CLP) e incluyen IVA.
          <br />
          Puedes cancelar tu suscripción en cualquier momento.
        </p>
      </div>
    </div>
  )
}
