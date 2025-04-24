"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ResumeEditor from "@/components/resume-editor"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, Home, Mail, CreditCard } from "lucide-react"
import Image from "next/image"
import RichTextEditor from "@/components/rich-text-editor"
import { createCheckoutSession, checkSubscriptionStatus } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const isPasswordValid = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasNonalphas = /\W/.test(password)
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas
}

export default function CVMallClient({ searchParams }: { searchParams: { template?: string } }) {
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.template || "default")
  const [isDownloading, setIsDownloading] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      summary: "",
    },
    password: "",
  })
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const status = await checkSubscriptionStatus()
        setIsSubscribed(status.isSubscribed)
      } catch (error) {
        console.error("Error checking subscription status:", error)
        setIsSubscribed(false)
      }
    }

    fetchSubscriptionStatus()
  }, [])

  const handleDownloadClick = () => {
    if (!formData.personalInfo.email) {
      setShowEmailPopup(true)
      return
    }
    handleDownloadRequest()
  }

  const handleDownloadRequest = async () => {
    if (isSubscribed) {
      await downloadPDF()
    } else {
      setShowPaymentPopup(true)
    }
  }

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false)
    toast({
      title: "Payment Successful",
      description: "Your payment was successful. Your CV will now be downloaded.",
    })
    downloadPDF()
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email } = formData.personalInfo
    const { password } = formData

    if (!isPasswordValid(password)) {
      setPasswordError("Lösenordet uppfyller inte kraven. Vänligen kontrollera kriterierna ovan.")
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create account")
      }

      const data = await response.json()

      toast({
        title: "Konto skapat",
        description: "Ditt konto har skapats framgångsrikt.",
      })
      setShowEmailPopup(false)
      setShowPaymentPopup(true)
    } catch (error) {
      console.error("Error creating account:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Det gick inte att skapa ett konto. Försök igen senare.",
        variant: "destructive",
      })
    }
  }

  const downloadPDF = async () => {
    setIsDownloading(true)
    // Implement PDF download logic here
    setIsDownloading(false)
  }

  const handleCreateCheckoutSession = async () => {
    setIsLoadingPayment(true)
    try {
      const { clientSecret } = await createCheckoutSession("price_1234567890")
      setClientSecret(clientSecret || null)
      setShowPaymentDialog(true)
    } catch (error) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingPayment(false)
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white text-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Namnl%C3%B6s%20(300%20x%20100%20px)%20(3)-jKvrgeGo8aHRekq4Pe6ZnwRE6VTeRc.png"
                alt="CV.SE Logo"
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setShowEmailPopup(true)} className="text-sm">
                Spara
              </Button>
              <Button
                className="bg-[#00bf63] hover:bg-[#00a857] text-white text-sm"
                onClick={handleDownloadRequest}
                disabled={isDownloading}
              >
                {isDownloading ? "Laddar ner..." : "Ladda ner"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <ResumeEditor selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </main>

      {/* Popups and Dialogs */}
      <Dialog open={showEmailPopup} onOpenChange={setShowEmailPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Skapa ditt konto</DialogTitle>
            <DialogDescription>
              För att spara eller ladda ner ditt CV, vänligen ange din e-postadress och ett lösenord.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-postadress</Label>
              <Input
                id="email"
                type="email"
                placeholder="din@email.com"
                required
                value={formData.personalInfo.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      email: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="summary">Sammanfattning</Label>
              <RichTextEditor
                value={formData.personalInfo.summary || ""}
                onChange={(newValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    personalInfo: {
                      ...prevData.personalInfo,
                      summary: newValue,
                    },
                  }))
                }}
              />
            </div>
            <div className="mt-4 mb-2">
              <h4 className="text-sm font-semibold mb-1">Lösenordskrav:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600">
                <li>Minst 8 tecken långt</li>
                <li>Minst en stor bokstav</li>
                <li>Minst en liten bokstav</li>
                <li>Minst en siffra</li>
                <li>Minst ett specialtecken</li>
              </ul>
            </div>
            <div>
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ange ett lösenord"
                required
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                  setPasswordError(null)
                }}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <Button type="submit" className="w-full">
              Skapa konto
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentPopup} onOpenChange={setShowPaymentPopup}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0">
          <div className="p-6">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <DialogTitle className="text-xl font-semibold">Skapa ditt CV</DialogTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPaymentPopup(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-[#00bf63]" />
                <span>Skapa professionella CV:n direkt online</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#00bf63]" />
                <span>Få tillgång till alla CV-mallar och funktioner</span>
              </div>
            </div>

            <div className="mt-6">
              <RadioGroup defaultValue="trial" className="space-y-4" value="trial" onValueChange={() => {}}>
                <div className="border-2 border-[#00bf63] rounded-lg p-4 relative">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trial" id="trial" />
                    <Label htmlFor="trial" className="flex-grow">
                      <div>
                        <div className="font-semibold">Prova 7 dagar gratis</div>
                        <div className="text-sm text-gray-500">därefter 99kr/vecka</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6">
              <div className="flex justify-center gap-4 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                  alt="Visa"
                  width={40}
                  height={25}
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                  alt="Mastercard"
                  width={40}
                  height={25}
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                  alt="Apple Pay"
                  width={40}
                  height={25}
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                  alt="Google Pay"
                  width={40}
                  height={25}
                />
              </div>
              <Button
                className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white"
                size="lg"
                onClick={handleCreateCheckoutSession}
                disabled={isLoadingPayment}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isLoadingPayment ? "Laddar..." : isSubscribed ? "Ladda ner" : "Betala nu"}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">Avsluta online när som helst</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0">
          <div className="p-6">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-0 mb-6">
              <DialogTitle className="text-xl font-semibold">Betalning</DialogTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPaymentDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            {isLoadingPayment ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : clientSecret ? (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout onComplete={handlePaymentSuccess} />
              </EmbeddedCheckoutProvider>
            ) : (
              <div className="text-center p-4">
                <p>Failed to load payment form. Please try again.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
