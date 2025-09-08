export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Cargando documentos...</p>
      </div>
    </div>
  );
}
