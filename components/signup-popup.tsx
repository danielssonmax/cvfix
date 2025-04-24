"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface SignupPopupProps {
  isOpen: boolean
  onClose: () => void
  onSignupSuccess: () => void
  onOpenLogin: () => void
}

export function SignupPopup({ isOpen, onClose, onSignupSuccess, onOpenLogin }: SignupPopupProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("register")
  const { toast } = useToast()
  const { signUp, signIn, user } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Insert user into the premium table
        const { error: premiumError } = await supabase
          .from("premium")
          .insert([
            {
              user_id: authData.user.id,
              paid: false,
            },
          ])

        if (premiumError) throw premiumError

        onClose()
        onSignupSuccess()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
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

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://cvfixaren.se/skapa-cv",
        },
      })
      if (error) throw error
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="sr-only">
            {activeTab === "register" ? "Sign Up" : "Log In"} to WEBBFIX.SE
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pt-6 pb-4 space-y-6">
          <div className="text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Namnl%C3%B6s%20(300%20x%20100%20px)%20(5)-cYUvNT8VqVrkkzUqv0waOLANWpoOh5.png"
              alt="WEBBFIX.SE Logo"
              width={160}
              height={40}
              className="mx-auto mb-6"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google%20logo-QCPZWqivNRdB7RTAzclQTM6z92vAcd.png"
              alt="Google"
              width={18}
              height={18}
              className="object-contain"
            />
            <span>Continue with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <form onSubmit={activeTab === "register" ? handleSignup : handleLogin} className="space-y-4">
            {activeTab === "register" && (
              <div>
                <Input
                  placeholder="What's your name?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={isLoading}>
              {activeTab === "register" ? "Sign Up" : "Log In"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#7C3AED] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#7C3AED] hover:underline">
              Privacy
            </Link>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
