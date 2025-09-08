"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DocumentView } from "@/components/documents/document-view";
import { toast } from "@/components/ui/use-toast";
import type { DocumentWithId } from "@/lib/documents";

export default function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [document, setDocument] = useState<DocumentWithId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch(`/api/documents/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            toast({
              title: "Error",
              description: "El documento no existe",
              variant: "destructive",
            });
            router.push("/documents");
            return;
          }
          
          throw new Error("Failed to fetch document");
        }
        
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el documento",
          variant: "destructive",
        });
        router.push("/documents");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDocument();
  }, [params.id, router]);

  const handleUpdateDocument = async (doc: DocumentWithId) => {
    try {
      const response = await fetch(`/api/documents/${doc.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update document");
      }
      
      const updatedDocument = await response.json();
      setDocument(updatedDocument);
      
      toast({
        title: "Éxito",
        description: "Documento actualizado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el documento",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete document");
      }
      
      toast({
        title: "Éxito",
        description: "Documento eliminado correctamente",
      });
      
      router.push("/documents");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el documento",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando documento...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className="py-4">
      <DocumentView
        document={document}
        onSave={handleUpdateDocument}
        onDelete={handleDeleteDocument}
        onCancel={() => router.push("/documents")}
      />
    </div>
  );
}
