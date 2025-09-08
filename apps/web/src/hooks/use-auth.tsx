"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Decodificador JWT mínimo (NO verifica firma, sólo decodifica payload base64url)
function decodeJwt<T = any>(token: string): T {
  const parts = token.split('.')
  if (parts.length < 2) throw new Error('Token inválido')
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
  const json = typeof window === 'undefined'
    ? Buffer.from(padded, 'base64').toString('utf8')
    : decodeURIComponent(atob(padded).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0')).join(''))
  return JSON.parse(json)
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  image?: string | null
  role: 'USER' | 'ADMIN'
}

export type AuthError = {
  message: string
  status: number
}

export type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (userData: SignUpData) => Promise<boolean>
  signOut: () => void
  loading: boolean
  error: AuthError | null
  isTokenExpired: () => boolean
  refreshToken: () => Promise<boolean>
}

export type SignUpData = {
  email: string
  password: string
  firstName: string
  lastName: string
  rut?: string
}

export type JwtPayload = {
  sub: string  // User ID
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'ADMIN'
  exp: number  // Expiration timestamp
  iat: number  // Issued at timestamp
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
  loading: true,
  error: null,
  isTokenExpired: () => true,
  refreshToken: async () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  // Comprueba si el token JWT está expirado
  const isTokenExpired = (): boolean => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return true
      const decoded = decodeJwt<JwtPayload>(token)
      const currentTime = Date.now() / 1000
      return decoded.exp < currentTime + 60
    } catch {
      return true
    }
  }

  // Intenta refrescar el token JWT
  const refreshToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return false

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.access_token)
        return true
      }
      
      return false
    } catch (err) {
      console.error("Error refreshing token", err)
      return false
    }
  }

  // Función para extraer información de usuario del token
  const extractUserFromToken = (token: string): User | null => {
    try {
      const decoded = decodeJwt<JwtPayload>(token)
      return {
        id: decoded.sub,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        role: decoded.role,
      }
    } catch {
      return null
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true)
        
        // Verificar si hay un token JWT en localStorage
        const token = localStorage.getItem("token")
        
        if (!token) {
          setLoading(false)
          return
        }

        // Comprobar si el token está expirado
        if (isTokenExpired()) {
          const refreshed = await refreshToken()
          if (!refreshed) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUser(null)
            setLoading(false)
            return
          }
        }
        
        // Intentar extraer información de usuario del token
        const userFromToken = extractUserFromToken(token)
        
        if (userFromToken) {
          // Usar la información del token para establecer el usuario
          setUser(userFromToken)
          setError(null)
        } else {
          // Verificar la validez del token con la API
          const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
          
          if (response.ok) {
            const userData = await response.json()
            const user = {
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              image: userData.image || null,
              role: userData.role,
            }
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            setError(null)
          } else {
            // Si el token no es válido, limpiar localStorage
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUser(null)
          }
        }
      } catch (err) {
        console.error("Error loading user", err)
        setError({ message: "Error al cargar información del usuario", status: 500 })
      } finally {
        setLoading(false)
      }
    }

    loadUser()

    // Configurar un intervalo para verificar y refrescar el token periódicamente
    const tokenCheckInterval = setInterval(() => {
      if (isTokenExpired() && user) {
        refreshToken().catch(err => {
          console.error("Error in token refresh interval", err)
        })
      }
    }, 5 * 60 * 1000) // Verificar cada 5 minutos

    return () => clearInterval(tokenCheckInterval)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Guardar token
        localStorage.setItem("token", data.access_token)
        
        // Extraer información del usuario del token o de la respuesta
        let userData: User
        
        if (data.user) {
          userData = {
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            image: data.user.image || null,
            role: data.user.role,
          }
        } else {
          const userFromToken = extractUserFromToken(data.access_token)
          if (!userFromToken) {
            throw new Error("No se pudo extraer información del usuario del token")
          }
          userData = userFromToken
        }
        
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido ${userData.firstName} ${userData.lastName}`,
        })
        
        return true
      } else {
        setError({
          message: data.message || "Error al iniciar sesión",
          status: response.status
        })
        
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: data.message || "Credenciales inválidas",
        })
        
        return false
      }
    } catch (err) {
      console.error("Error signing in", err)
      setError({ message: "Error al iniciar sesión", status: 500 })
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al conectar con el servidor",
      })
      
      return false
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData: SignUpData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        })
        
        // Redirigir al login después del registro
        router.push('/login')
        return true
      } else {
        setError({
          message: data.message || "Error al registrar usuario",
          status: response.status
        })
        
        toast({
          variant: "destructive",
          title: "Error de registro",
          description: data.message || "No se pudo crear la cuenta",
        })
        
        return false
      }
    } catch (err) {
      console.error("Error signing up", err)
      setError({ message: "Error al registrar usuario", status: 500 })
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al conectar con el servidor",
      })
      
      return false
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    // Opcionalmente, llamar a la API para invalidar el token en el servidor
    try {
      const token = localStorage.getItem("token")
      if (token) {
        fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch(err => console.error("Error logging out on server", err))
      }
    } catch (err) {
      console.error("Error in logout", err)
    }
    
    // Limpiar el almacenamiento local y el estado
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push('/')
    
    toast({
      title: "Sesión finalizada",
      description: "Has cerrado sesión exitosamente",
    })
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      error, 
      isTokenExpired,
      refreshToken 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
