"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  message: z.string().min(1).max(500),
})

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu Abogado Virtual. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      content: values.message,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    form.reset()
    
    setIsLoading(true)
    
    // Simular respuesta del asistente con un pequeño delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        content: getResponse(values.message),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Función simple para simular respuestas
  function getResponse(message: string): string {
    const normalizedMessage = message.toLowerCase()
    
    if (normalizedMessage.includes("hola") || normalizedMessage.includes("buenos días") || normalizedMessage.includes("buenas")) {
      return "¡Hola! Soy tu Abogado Virtual. ¿En qué tema legal puedo ayudarte hoy?"
    }
    
    if (normalizedMessage.includes("divorcio")) {
      return "El divorcio en Chile puede ser de común acuerdo o unilateral. Requiere un tiempo mínimo de separación y puede tramitarse a través de un proceso judicial. ¿Tienes alguna consulta específica sobre el proceso de divorcio?"
    }
    
    if (normalizedMessage.includes("contrato") || normalizedMessage.includes("laboral")) {
      return "Los contratos laborales en Chile están regulados por el Código del Trabajo. Existen diferentes tipos como indefinido, a plazo fijo o por obra/faena. ¿Necesitas información sobre algún aspecto específico de los contratos laborales?"
    }
    
    if (normalizedMessage.includes("herencia") || normalizedMessage.includes("testamento")) {
      return "En Chile, la herencia se rige por normas de orden público que establecen herederos forzosos. El testamento permite disponer de una parte de los bienes. ¿Te gustaría saber más sobre el proceso de sucesión o cómo redactar un testamento válido?"
    }
    
    return "Entiendo tu consulta. Para darte una respuesta más precisa, ¿podrías proporcionarme más detalles sobre tu situación legal? Recuerda que estoy aquí para orientarte según la legislación chilena vigente."
  }

  return (
    <div className="flex flex-col h-full max-h-[600px] rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/lawyer-avatar.png" alt="Abogado Virtual" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="font-medium">Abogado Virtual</div>
        </div>
        <div className="text-xs text-muted-foreground">En línea</div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Escribe tu consulta legal..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
