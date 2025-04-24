"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import ResumeEditor from "@/components/resume-editor"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { X } from "lucide-react"
import { createCheckoutSession, checkSubscriptionStatus } from "@/app/actions/stripe"
import { useAuth } from "@/contexts/AuthContext"
import CapturePayment from "@/components/capture-payment"
import { SignupPopup } from "@/components/signup-popup"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

const isPasswordValid = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasNonalphas = /\W/.test(password)
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas
}

export default function CVMallClient({ searchParams }: { searchParams: { template?: string } }) {
  const { user, signIn, signUp } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.template || "default")
  const [isDownloading, setIsDownloading] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showCapturePayment, setShowCapturePayment] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)

  // Use react-hook-form
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        summary: "",
      },
      password: "",
    },
  })

  const formData = watch()

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        try {
          const status = await checkSubscriptionStatus(user.id)
          setIsSubscribed(status.isSubscribed)
        } catch (error) {
          console.error("Error checking subscription status:", error)
          setIsSubscribed(false)
        }
      }
    }

    fetchSubscriptionStatus()
  }, [user])

  const handleSignupSuccess = () => {
    setShowCapturePayment(true)
  }

  const handleDownloadClick = () => {
    if (user) {
      if (isSubscribed) {
        downloadPDF()
      } else {
        setShowCapturePayment(true)
      }
    } else {
      setShowSignupPopup(true)
    }
  }

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Wait for the resume preview element to be available
      const waitForElement = (selector: string, timeout = 5000) => {
        return new Promise((resolve, reject) => {
          const startTime = Date.now()
          const checkElement = () => {
            const element = document.getElementById(selector)
            if (element) {
              resolve(element)
            } else if (Date.now() - startTime >= timeout) {
              reject(new Error(`Element ${selector} not found after ${timeout}ms`))
            } else {
              setTimeout(checkElement, 100)
            }
          }
          checkElement()
        })
      }

      // Get the resume preview element
      const resumePreview = await waitForElement("resume-preview")
      if (!resumePreview) {
        throw new Error("Resume preview element not found")
      }

      // Convert the resume preview to a canvas
      const canvas = await html2canvas(resumePreview as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      })

      // Create a PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add the canvas to the PDF
      const imgData = canvas.toDataURL("image/png")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

      // Download the PDF
      pdf.save("resume.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
    setIsDownloading(false)
    }
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cvfixaren-ebeQXxOTCrb79kvOYjGEuecJeiitvr.png"
                alt="CVfixaren Logo"
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                className="bg-[#00bf63] hover:bg-[#00a857] text-white text-sm"
                onClick={handleDownloadClick}
                disabled={isDownloading}
              >
                {isDownloading ? "Laddar ner..." : "Ladda ner"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex-col">
        <ResumeEditor selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </main>

      {/* Capture Payment Dialog */}
      <CapturePayment
        isOpen={showCapturePayment}
        onClose={() => setShowCapturePayment(false)}
        onPaymentSuccess={() => {
          setShowCapturePayment(false)
          setIsSubscribed(true)
          downloadPDF()
        }}
      />

      {/* Signup Popup */}
      <SignupPopup
        isOpen={showSignupPopup}
        onClose={() => setShowSignupPopup(false)}
        onSignupSuccess={() => {
          setShowSignupPopup(false)
          setShowCapturePayment(true)
        }}
      />

      {/* Stripe Checkout Dialog */}
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
                <EmbeddedCheckout
                  onComplete={() => {
                    setShowPaymentDialog(false)
                    setIsSubscribed(true)
                    downloadPDF()
                  }}
                />
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
