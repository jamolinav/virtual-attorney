"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Asistencia Legal Inteligente
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                Asistencia legal inteligente para todos los chilenos
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                Resuelve tus dudas legales con nuestro asistente virtual especializado en leyes chilenas, disponible 24/7.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <Link href="/chat">Consulta gratuita</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-secondary transition-all">
                <Link href="/servicios">Ver servicios</Link>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-background/80 backdrop-blur p-3 rounded-lg shadow-sm">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">Sin registro previo</span>
              </div>
              <div className="flex items-center space-x-2 bg-background/80 backdrop-blur p-3 rounded-lg shadow-sm">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">Respuestas en tiempo real</span>
              </div>
              <div className="flex items-center space-x-2 bg-background/80 backdrop-blur p-3 rounded-lg shadow-sm">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">Siempre actualizado</span>
              </div>
            </div>
          </div>
          <div className="mx-auto flex w-full items-center justify-center lg:justify-end">
            <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse [animation-delay:1s]" style={{animationDuration: '3s'}} />
              <div className="bg-gradient-to-br from-primary to-blue-700 rounded-full w-full h-full flex items-center justify-center shadow-xl">
                <div className="text-white text-3xl font-bold text-center px-6">
                  Abogado<br/>Virtual<br/>Chile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
