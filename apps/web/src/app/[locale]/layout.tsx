// Import corregido: el archivo globals.css está un nivel arriba
import '../globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { i18n } from '@/lib/i18n-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abogado Virtual Chile',
  description: 'Asistencia legal virtual para consultas jurídicas en Chile',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale || 'es-CL'} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
