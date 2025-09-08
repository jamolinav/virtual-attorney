"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DocumentGrid } from "@/components/documents/document-grid";
import { DocumentView } from "@/components/documents/document-view";
import { DocumentCreate } from "@/components/documents/document-create";
import { toast } from "@/components/ui/use-toast";
import type { DocumentWithId } from "@/lib/documents";

export default function DocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentWithId[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentWithId | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Fetch documents on load
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("/api/documents");
        
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los documentos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDocuments();
  }, []);

  const handleCreateDocument = async (document: DocumentWithId) => {
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create document");
      }
      
      const newDocument = await response.json();
      
      // Add the new document to the list
      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      
      // Reset the form
      setIsCreating(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el documento",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDocument = async (document: DocumentWithId) => {
    try {
      const response = await fetch(`/api/documents/${document.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update document");
      }
      
      const updatedDocument = await response.json();
      
      // Update the document in the list
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === updatedDocument.id ? updatedDocument : doc
        )
      );
      
      // Update the selected document if it's the one being edited
      if (selectedDocument?.id === updatedDocument.id) {
        setSelectedDocument(updatedDocument);
      }
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
      
      // Remove the document from the list
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
      
      // Clear the selected document if it's the one being deleted
      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el documento",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const handleSelectDocument = (id: string) => {
    const document = documents.find((doc) => doc.id === id);
    if (document) {
      setSelectedDocument(document);
      setIsCreating(false);
    }
  };

  const handleNewDocument = () => {
    setSelectedDocument(null);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setSelectedDocument(null);
    setIsCreating(false);
  };

  const toggleView = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Documentos</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={toggleView}>
            {view === 'grid' ? 'Vista Lista' : 'Vista Cuadrícula'}
          </Button>
          {!selectedDocument && !isCreating && (
            <Button onClick={handleNewDocument}>Nuevo Documento</Button>
          )}
          {(selectedDocument || isCreating) && (
            <Button variant="outline" onClick={handleCancel}>
              Volver a la lista
            </Button>
          )}
        </div>
      </div>

      {isCreating ? (
        <DocumentCreate
          onSave={handleCreateDocument}
          onCancel={handleCancel}
        />
      ) : selectedDocument ? (
        <DocumentView
          document={selectedDocument}
          onSave={handleUpdateDocument}
          onDelete={handleDeleteDocument}
          onCancel={handleCancel}
        />
      ) : (
        <DocumentGrid
          documents={documents}
          isLoading={isLoading}
          view={view}
          onSelectDocument={handleSelectDocument}
          onDeleteDocument={handleDeleteDocument}
        />
      )}
    </div>
  );
}
