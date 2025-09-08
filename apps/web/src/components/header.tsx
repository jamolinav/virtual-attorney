"use client"

import Link from "next/link"
import { MainNav } from "./main-nav"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { UserNav } from "./user-nav"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Precios", href: "/precios" },
  { label: "Chat", href: "/chat" },
  { label: "Documentos", href: "/documents" },
  { label: "FAQ", href: "/faq" }
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground size-8 rounded-full flex items-center justify-center font-bold text-lg">A</div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">Abogado Virtual</span>
          </Link>
          <MainNav items={navItems} />
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
              <Link href="/signin">Iniciar sesión</Link>
            </Button>
            <Button asChild size="sm" className="shadow-sm hover:shadow-md transition-all">
              <Link href="/signup">Registrarse</Link>
            </Button>
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
}
