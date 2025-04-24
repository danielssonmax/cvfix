"use client"

import React, { createContext, useState, useContext, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: any | null
  setUser: (user: any) => void
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const { toast } = useToast()

  const checkAuthStatus = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error("Error checking auth status:", error)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [checkAuthStatus])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error("Detailed login error:", JSON.stringify(error, null, 2))
        if (error.code === "invalid_credentials") {
          return { success: false, error: "Felaktig e-postadress eller lösenord. Vänligen försök igen." }
        }
        return { success: false, error: error.message }
      }
      if (data.user) {
        setUser(data.user)
        await checkAuthStatus()
        return { success: true }
      } else {
        console.error("No user data returned")
        return { success: false, error: "Ingen användardata returnerades" }
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error)
      return { success: false, error: "Ett oväntat fel uppstod. Vänligen försök igen." }
    }
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    } else {
      setUser(null)
      toast({
        title: "Utloggad",
        description: "Du har loggats ut från ditt konto.",
        duration: 3000,
      })
    }
  }

  const value = {
    user,
    setUser,
    signIn,
    signUp,
    signOut,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
