import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Documentos - Abogado Virtual",
  description: "Gestiona todos tus documentos legales en un solo lugar",
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-4">
      {children}
    </div>
  );
}
