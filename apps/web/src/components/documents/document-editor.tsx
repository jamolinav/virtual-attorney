"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface DocumentEditorProps {
  id?: string
  initialTitle?: string
  initialContent?: string
  isEditing?: boolean
}

export function DocumentEditor({
  id,
  initialTitle = "",
  initialContent = "",
  isEditing = false,
}: DocumentEditorProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar documentos",
        variant: "destructive",
      })
      return
    }

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "El título es obligatorio",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // En producción, aquí llamaríamos a la API
      // const response = await fetch(isEditing ? `/api/documents/${id}` : "/api/documents", {
      //   method: isEditing ? "PUT" : "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({
      //     title,
      //     content,
      //   }),
      // })
      
      // const data = await response.json()
      
      // Simulamos una respuesta exitosa
      setTimeout(() => {
        toast({
          title: isEditing ? "Documento actualizado" : "Documento creado",
          description: isEditing 
            ? "Tu documento ha sido actualizado exitosamente" 
            : "Tu documento ha sido guardado exitosamente",
        })
        
        if (!isEditing) {
          // Reset form after creating
          setTitle("")
          setContent("")
        }
        
        // En producción, aquí redirigimos al documento o lista de documentos
        // router.push("/documentos")
        
        setLoading(false)
      }, 1500)
      
    } catch (error) {
      console.error("Error saving document", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el documento",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título del documento</Label>
          <Input
            id="title"
            placeholder="Ingrese un título para su documento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Contenido</Label>
          <Textarea
            id="content"
            placeholder="Escriba el contenido de su documento legal aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px]"
            disabled={loading}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
