import { Metadata } from "next"
import { Pricing } from "@/components/pricing"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Planes y Precios - Abogado Virtual Chile",
  description: "Consulta nuestros planes y precios para asistencia legal virtual en Chile. Planes flexibles para individuos y empresas.",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="py-12 md:py-20">
          <div className="container px-4 md:px-6 space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planes y Precios</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Elije el plan que mejor se adapte a tus necesidades legales
              </p>
            </div>
          </div>
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  )
}
