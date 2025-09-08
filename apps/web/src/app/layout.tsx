import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Virtual Chile',
  description: 'Asistencia legal inteligente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
