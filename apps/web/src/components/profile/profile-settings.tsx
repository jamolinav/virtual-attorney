"use client"

import { useState, useEffect } from "react"
import { useAuth, User } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileSettings() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<Partial<User> | null>(null)
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [loading, setLoading] = useState(false)

  // Initialize profile data from user context
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  }, [user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => prev ? { ...prev, [name]: value } : null)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword((prev) => ({ ...prev, [name]: value }))
  }

  const updateProfile = async () => {
    if (!user || !profileData) return

    setLoading(true)

    try {
      // En producción, aquí llamaríamos a la API
      // const response = await fetch(`/api/users/${user.id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(profileData),
      // })
      
      // Simulamos una respuesta exitosa
      setTimeout(() => {
        toast({
          title: "Perfil actualizado",
          description: "Tu información ha sido actualizada correctamente",
        })
        setLoading(false)
      }, 1000)
      
    } catch (error) {
      console.error("Error updating profile", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar tu perfil",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const updatePassword = async () => {
    if (!user) return

    // Validación básica
    if (password.new !== password.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    if (password.new.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // En producción, aquí llamaríamos a la API
      // const response = await fetch(`/api/users/${user.id}/password`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({
      //     currentPassword: password.current,
      //     newPassword: password.new,
      //   }),
      // })
      
      // Simulamos una respuesta exitosa
      setTimeout(() => {
        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña ha sido actualizada correctamente",
        })
        
        // Reset password fields
        setPassword({
          current: "",
          new: "",
          confirm: "",
        })
        
        setLoading(false)
      }, 1000)
      
    } catch (error) {
      console.error("Error updating password", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar tu contraseña",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  if (!user || !profileData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>
            Inicia sesión para gestionar tu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>Necesitas iniciar sesión para ver tu perfil</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="profile" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gestiona tu información personal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || ""} alt={user.firstName} />
                <AvatarFallback>
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Foto de perfil</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Esta foto se mostrará en tu perfil
                </p>
                <Button variant="outline" size="sm" disabled>
                  Cambiar foto
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName || ""}
                  onChange={handleProfileChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName || ""}
                  onChange={handleProfileChange}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email || ""}
                onChange={handleProfileChange}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateProfile} disabled={loading}>
              {loading ? "Actualizando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>
              Cambia tu contraseña y ajusta configuraciones de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                name="current"
                type="password"
                value={password.current}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input
                id="newPassword"
                name="new"
                type="password"
                value={password.new}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirm"
                type="password"
                value={password.confirm}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updatePassword} disabled={loading}>
              {loading ? "Actualizando..." : "Cambiar contraseña"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
