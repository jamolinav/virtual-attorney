import { Metadata } from "next"
import { ChatBot } from "@/components/chatbot"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Chat con Abogado Virtual - Consulta legal en línea",
  description: "Resuelve tus dudas legales con nuestro asistente virtual especializado en leyes chilenas",
}

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Consulta con tu Abogado Virtual</h1>
            <p className="text-muted-foreground">
              Realiza tus consultas legales y obtén respuestas basadas en la legislación chilena actual.
            </p>
          </div>
          <div className="border rounded-xl shadow-sm overflow-hidden">
            <ChatBot />
          </div>
          <div className="text-sm text-center text-muted-foreground">
            <p>
              Este chat proporciona información legal general y orientativa basada en las leyes chilenas. 
              No reemplaza el consejo personalizado de un abogado. Para situaciones complejas, 
              recomendamos consultar con un profesional legal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
