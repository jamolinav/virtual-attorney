"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { MessageRole } from "@prisma/client"

interface Message {
  id: string
  role: MessageRole
  content: string
  createdAt: string
}

export function ChatInterface() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "SYSTEM",
      content: "Hola, soy tu Abogado Virtual. ¿En qué puedo ayudarte hoy?",
      createdAt: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para utilizar el chat",
        variant: "destructive",
      })
      return
    }

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "USER",
      content: input,
      createdAt: new Date().toISOString(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // En producción, aquí llamaríamos a la API para obtener una respuesta
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: { 
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ message: input }),
      // });
      
      // const data = await response.json();
      
      // Simular respuesta del asistente
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "ASSISTANT",
          content: `Gracias por tu consulta sobre "${input}". Como tu abogado virtual, puedo ayudarte a entender tus derechos y opciones legales en Chile. ¿Puedes proporcionar más detalles sobre tu situación para ofrecerte una orientación más precisa?`,
          createdAt: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setLoading(false)
      }, 1500)
      
    } catch (error) {
      console.error("Error sending message", error)
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Abogado Virtual
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[500px] overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "USER" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`flex items-start gap-3 max-w-[80%] ${
                message.role === "USER" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.role !== "USER" && (
                <Avatar className="w-8 h-8">
                  <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-xs font-semibold">
                    AV
                  </div>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.role === "USER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "USER" && (
                <Avatar className="w-8 h-8">
                  <div className="bg-secondary text-secondary-foreground w-full h-full flex items-center justify-center text-xs font-semibold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="w-8 h-8">
                <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-xs font-semibold">
                  AV
                </div>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="w-full flex gap-2">
          <Input
            placeholder="Escribe tu consulta legal..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1"
            disabled={loading}
          />
          <Button onClick={handleSendMessage} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
