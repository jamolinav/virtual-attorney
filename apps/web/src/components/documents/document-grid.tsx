"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DocumentWithId } from '@/lib/documents';

interface DocumentGridProps {
  documents: DocumentWithId[];
  onSelectDocument: (id: string) => void;
  onDeleteDocument?: (id: string) => void;
  isLoading?: boolean;
  view?: 'grid' | 'list';
}

export function DocumentGrid({
  documents,
  onSelectDocument,
  onDeleteDocument,
  isLoading = false,
  view = 'grid'
}: DocumentGridProps) {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-pulse">Loading documents...</div>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No documents found</h3>
        <p className="text-muted-foreground mb-4">
          Create a new document to get started.
        </p>
      </div>
    );
  }

  const gridClassName = view === 'grid' 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
    : "flex flex-col gap-4";

  return (
    <div className={gridClassName}>
      {documents.map((doc) => (
        <Card key={doc.id} className={view === 'grid' ? '' : 'flex flex-row'}>
          <div className={view === 'grid' ? '' : 'flex-grow'}>
            <CardHeader className={view === 'list' ? 'py-3' : ''}>
              <CardTitle className="truncate">{doc.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {new Date(doc.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className={view === 'list' ? 'py-2' : ''}>
              <p className={`text-sm ${view === 'grid' ? 'line-clamp-3' : 'line-clamp-1'}`}>
                {doc.content}
              </p>
            </CardContent>
          </div>
          <div className={view === 'grid' 
            ? 'flex justify-between items-center px-6 pb-4' 
            : 'flex items-center px-4'}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSelectDocument(doc.id)}
            >
              Open
            </Button>
            {onDeleteDocument && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive hover:text-destructive/80"
                onClick={() => onDeleteDocument(doc.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
