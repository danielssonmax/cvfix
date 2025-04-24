"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface SignupPopupProps {
  isOpen: boolean
  onClose: () => void
  onSignupSuccess: () => void
  onOpenLogin: () => void
  mode?: "signup" | "login"
  setMode: (mode: "signup" | "login") => void
}

export function SignupPopup({ isOpen, onClose, onSignupSuccess, onOpenLogin, mode = "signup", setMode }: SignupPopupProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { toast } = useToast()
  const { signUp, signIn, user } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Insert user into the premium table
        const { error: premiumError } = await supabase
          .from("premium")
          .insert([
            {
              uid: authData.user.id,
              email: email,
              premium: false,
            },
          ])

        if (premiumError) throw premiumError

        onClose()
        router.push("/profil/skapa-cv")
        onSignupSuccess()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        onClose()
        router.push("/dashboard/ads-library")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="sr-only">{mode === "signup" ? "Skapa konto" : "Logga in"} på WEBBFIX.SE</DialogTitle>
        </DialogHeader>
        <div className="px-6 pt-6 pb-4 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            {mode === "signup" ? "Skapa konto" : "Logga in"}
          </h2>
          <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="E-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white" disabled={isLoading}>
              {mode === "signup" ? "Skapa konto" : "Logga in"}
            </Button>
            {mode === "signup" && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Har du redan ett konto?{" "}
                <button 
                  onClick={onOpenLogin} 
                  className="text-[#00bf63] hover:text-[#00a857] hover:underline"
                >
                  Logga in här
                </button>
              </p>
            )}
            {mode === "login" && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Har du inget konto?{" "}
                <button 
                  onClick={() => setMode("signup")} 
                  className="text-[#00bf63] hover:text-[#00a857] hover:underline"
                >
                  Skapa konto här
                </button>
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#00bf63] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#00bf63] hover:underline">
              Privacy
            </Link>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
