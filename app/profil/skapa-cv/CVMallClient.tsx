"use client"
import { useState, useEffect, useRef, useCallback } from "react"
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
import { supabase } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"

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

export default function CVMallClient() {
  const searchParams = useSearchParams()
  const { user, signIn, signUp } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.get('template') || "default")
  const [isDownloading, setIsDownloading] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showCapturePayment, setShowCapturePayment] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [popupMode, setPopupMode] = useState<"signup" | "login">("signup")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [lastLoadedId, setLastLoadedId] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isLoadingCV, setIsLoadingCV] = useState(false)

  // Use react-hook-form
  const form = useForm({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        summary: "",
      },
      workExperience: [],
      education: [],
      skills: [],
      languages: [],
      certifications: [],
      projects: [],
      references: [],
      password: "",
    },
  })

  const { control, handleSubmit, watch, reset, getValues } = form

  // Watch all form fields
  const formData = watch([
    'personalInfo.firstName',
    'personalInfo.lastName',
    'personalInfo.email',
    'personalInfo.summary',
    'workExperience',
    'education',
    'skills',
    'languages',
    'certifications',
    'projects',
    'references'
  ])

  // Add a ref to track if we've already loaded the data
  const hasLoadedData = useRef(false)

  const loadCVData = useCallback(async () => {
    const editId = searchParams.get('edit')
    if (!editId || !user || (editId === lastLoadedId && !isInitialLoad) || isLoadingCV) return

    setIsLoadingCV(true)
    setIsLoading(true)
    try {
      console.log("Loading CV data for ID:", editId)
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', editId)
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error("Error loading CV data:", error)
        throw error
      }

      if (data?.data) {
        console.log("Loaded CV data:", data)
        console.log("Loaded CV data.data:", data.data)
        
        // Debug: Log sections data
        console.log("Sections data from database:", data.data.sections)
        
        // Ensure we have all required fields in the loaded data
        const loadedData = {
          personalInfo: {
            ...data.data.personalInfo,
            title: data.data.personalInfo?.title || "",
            firstName: data.data.personalInfo?.firstName || "",
            lastName: data.data.personalInfo?.lastName || "",
            email: data.data.personalInfo?.email || "",
            phone: data.data.personalInfo?.phone || "",
            location: data.data.personalInfo?.location || "",
            summary: data.data.personalInfo?.summary || "",
            photo: data.data.personalInfo?.photo || "",
            address: data.data.personalInfo?.address || "",
            postalCode: data.data.personalInfo?.postalCode || "",
            optionalFields: data.data.personalInfo?.optionalFields || {}
          },
          workExperience: data.data.workExperience || data.data.experience || [],
          education: data.data.education || [],
          skills: data.data.skills || [],
          languages: data.data.languages || [],
          sections: {
            profile: data.data.sections?.profile || [],
            courses: data.data.sections?.courses || [],
            internship: data.data.sections?.internship || [],
            references: data.data.sections?.references || [],
            traits: data.data.sections?.traits || [],
            certificates: data.data.sections?.certificates || [],
            achievements: data.data.sections?.achievements || [],
            hobbies: data.data.sections?.hobbies || {}
          }
        }

        // Debug: Log loaded sections
        console.log("Loaded sections after initialization:", loadedData.sections)

        // Check which sections have data and add them to the form
        const sectionsWithData = Object.entries(loadedData.sections).filter(([key, value]) => {
          console.log(`Checking section ${key}:`, value)
          if (Array.isArray(value)) {
            const hasData = value.length > 0
            console.log(`Section ${key} is array, has data:`, hasData)
            return hasData
          } else if (typeof value === 'object') {
            const hasData = Object.keys(value).length > 0
            console.log(`Section ${key} is object, has data:`, hasData)
            return hasData
          }
          return false
        }).map(([key]) => key)

        console.log("Sections with data:", sectionsWithData)

        // Add sections with data to the form
        if (sectionsWithData.length > 0) {
          const currentValues = getValues()
          console.log("Current form values:", currentValues)
          
          const updatedSections = {
            ...currentValues.sections,
            ...sectionsWithData.reduce((acc, section) => ({
              ...acc,
              [section]: loadedData.sections[section]
            }), {})
          }
          
          console.log("Updated sections:", updatedSections)
          loadedData.sections = updatedSections
        }

        // Ensure workExperience is properly loaded
        if (loadedData.workExperience && loadedData.workExperience.length > 0) {
          console.log("Loading work experience data:", loadedData.workExperience)
        }

        console.log("Final loaded data before reset:", loadedData)
        reset(loadedData)
        setLastLoadedId(editId)
        setIsInitialLoad(false)
      }
    } catch (error) {
      console.error("Error in loadCVData:", error)
      toast({
        title: "Error",
        description: "Failed to load CV data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCV(false)
      setIsLoading(false)
    }
  }, [user, searchParams, lastLoadedId, isInitialLoad, isLoadingCV, reset, getValues])

  // Load CV data on mount and when dependencies change
  useEffect(() => {
    loadCVData()
  }, [loadCVData])

  // Reset states when user changes
  useEffect(() => {
    setLastLoadedId(null)
    setIsInitialLoad(true)
    setIsLoadingCV(false)
  }, [user])

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) {
        console.log("No user found, skipping subscription check")
        setIsSubscribed(false)
        return
      }

      try {
        console.log("Starting subscription check for user:", user.id)
        
        // First check if user exists in premium table
        const { data: userExists, error: checkError } = await supabase
          .from("premium")
          .select("*")
          .eq("uid", user.id)
          .maybeSingle()

        if (checkError) {
          console.error("Error checking user existence:", {
            message: checkError.message,
            code: checkError.code,
            details: checkError.details,
            hint: checkError.hint
          })
          throw checkError
        }

        if (!userExists) {
          console.log("User not found in premium table, creating record")
          const { data: insertData, error: insertError } = await supabase
            .from("premium")
            .insert([
              {
                uid: user.id,
                email: user.email,
                premium: false
              }
            ])
            .select()
          
          if (insertError) {
            console.error("Error creating premium record:", {
              message: insertError.message,
              code: insertError.code,
              details: insertError.details,
              hint: insertError.hint,
              user: {
                id: user.id,
                email: user.email
              }
            })
            throw insertError
          }
          
          console.log("Premium record created successfully:", insertData)
          setIsSubscribed(false)
          return
        }

        // If user exists, get their premium status
        const { data: premiumData, error: premiumError } = await supabase
          .from("premium")
          .select("premium")
          .eq("uid", user.id)
          .single()

        if (premiumError) {
          console.error("Error fetching premium status:", {
            message: premiumError.message,
            code: premiumError.code,
            details: premiumError.details,
            hint: premiumError.hint
          })
          throw premiumError
        }

        setIsSubscribed(premiumData?.premium || false)
      } catch (error: any) {
        console.error("Error in subscription check process:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        // Don't change subscription status on error
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

      // Get the current form values using getValues()
      const currentValues = getValues()
      console.log("Form data to save:", currentValues)
      
      // Store CV data in Supabase
      if (user) {
        const cvData = {
          user_id: user.id,
          data: {
            personalInfo: currentValues.personalInfo || {},
            workExperience: currentValues.workExperience || [],
            education: currentValues.education || [],
            skills: currentValues.skills || [],
            languages: currentValues.languages || [],
            sections: currentValues.sections || {
              profile: [],
              courses: [],
              internship: [],
              references: [],
              traits: [],
              certificates: [],
              achievements: [],
              hobbies: {}
            }
          },
          title: currentValues.personalInfo?.firstName || currentValues.personalInfo?.lastName 
            ? `${currentValues.personalInfo.firstName || ''} ${currentValues.personalInfo.lastName || ''}'s CV`.trim()
            : 'Untitled CV'
        }
        console.log("Saving CV data:", cvData)

        const { data, error } = await supabase
          .from('cvs')
          .upsert([cvData], {
            onConflict: 'user_id,title'
          })
          .select()

        if (error) {
          console.error("Error storing CV data:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          })
          toast({
            title: "Error",
            description: `Failed to save CV data: ${error.message}`,
            variant: "destructive",
          })
        } else {
          console.log("CV data saved successfully:", data)
          toast({
            title: "Success",
            description: "CV saved successfully.",
          })
        }
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
              {user && (
                <Link href="/profil">
                  <Button variant="outline" className="text-sm">
                    Profil
                  </Button>
                </Link>
              )}
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
        <ResumeEditor 
          selectedTemplate={selectedTemplate} 
          onSelectTemplate={setSelectedTemplate}
          form={form}
        />
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
        onOpenLogin={() => setPopupMode("login")}
        mode={popupMode}
        setMode={setPopupMode}
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
              <div className="overflow-y-auto max-h-[80vh]">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                  <EmbeddedCheckout
                    onComplete={() => {
                      setShowPaymentDialog(false)
                      setIsSubscribed(true)
                      downloadPDF()
                    }}
                  />
                </EmbeddedCheckoutProvider>
              </div>
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
