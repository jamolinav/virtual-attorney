import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir a la página específica del idioma
  redirect('/es-CL');
}
