"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SignupPopup } from "./signup-popup"
import { LoginPopup } from "./login-popup"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { user, signOut, checkAuthStatus } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const updateAuthStatus = async () => {
      await checkAuthStatus()
    }
    updateAuthStatus()
  }, [checkAuthStatus])

  const isCVMallPage = pathname === "/profil/skapa-cv"

  if (isCVMallPage) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/") // Redirect to home page after signing out
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cvfixaren-ebeQXxOTCrb79kvOYjGEuecJeiitvr.png"
            alt="CVfixaren Logo"
            width={150}
            height={50}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/profil">
                <Button variant="ghost">Mina sidor</Button>
              </Link>
              <Button onClick={handleSignOut} variant="outline">
                Logga ut
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsLoginOpen(true)} variant="outline">
                Logga in
              </Button>
            </>
          )}
          <Link href="/profil/skapa-cv">
            <Button className="bg-[#00bf63] hover:bg-[#00a857] text-white">Skapa CV</Button>
          </Link>
        </nav>
      </div>
      <SignupPopup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenSignup={() => {
          setIsLoginOpen(false)
          setIsSignupOpen(true)
        }}
      />
    </header>
  )
}
