"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"

interface LoginPopupProps {
  isOpen: boolean
  onClose: () => void
  onOpenSignup: () => void
}

export function LoginPopup({ isOpen, onClose, onOpenSignup }: LoginPopupProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn(email, password)
      if (result.success) {
        toast({
          title: "Inloggning lyckades",
          description: "Du är nu inloggad på ditt konto.",
          duration: 3000,
        })
        onClose()
      } else {
        setError(result.error || "Ett fel uppstod vid inloggning. Vänligen försök igen.")
      }
    } catch (error: any) {
      console.error("Unexpected error during login:", error)
      setError("Ett oväntat fel uppstod. Vänligen försök igen.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logga in</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-post</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loggar in..." : "Logga in"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p>Har du inget konto?</p>
          <Button variant="link" onClick={onOpenSignup}>
            Skapa konto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
