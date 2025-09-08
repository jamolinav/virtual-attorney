"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import type { DocumentWithId } from '@/lib/documents';

interface DocumentViewProps {
  document: DocumentWithId;
  onSave: (document: DocumentWithId) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onCancel?: () => void;
  isReadOnly?: boolean;
}

export function DocumentView({
  document,
  onSave,
  onDelete,
  onCancel,
  isReadOnly = false,
}: DocumentViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(document.title);
    setContent(document.content);
    setIsEditing(false);
    if (onCancel) onCancel();
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "El título no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "El contenido no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      await onSave({
        ...document,
        title,
        content,
      });
      
      setIsEditing(false);
      toast({
        title: "Éxito",
        description: "Documento guardado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el documento",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      setIsDeleting(true);
      
      await onDelete(document.id);
      
      toast({
        title: "Éxito",
        description: "Documento eliminado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el documento",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del documento"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Contenido
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenido del documento"
              className="min-h-[300px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{document.title}</h1>
            <div className="flex space-x-2">
              {!isReadOnly && (
                <>
                  <Button variant="outline" onClick={handleEdit}>
                    Editar
                  </Button>
                  {onDelete && (
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                  )}
                </>
              )}
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Volver
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 whitespace-pre-wrap">
            {document.content}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Creado: {new Date(document.createdAt).toLocaleString()}
            {document.updatedAt !== document.createdAt && (
              <>
                <br />
                Actualizado: {new Date(document.updatedAt).toLocaleString()}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
