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

type FormValues = {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    summary: string
  }
  workExperience: any[]
  education: any[]
  skills: any[]
  languages: any[]
  certifications: any[]
  projects: any[]
  references: any[]
  password: string
  sections: {
    profile: any[]
    courses: any[]
    internship: any[]
    references: any[]
    traits: any[]
    certificates: any[]
    achievements: any[]
    hobbies: any
  }
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
  const hasLoadedData = useRef(false)
  const editId = searchParams.get('edit')

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
      sections: {
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

  // Load CV data only when editId or user changes
  useEffect(() => {
    const loadData = async () => {
      if (!editId || !user || hasLoadedData.current || isLoadingCV) {
        console.log("Skipping loadCVData:", { editId, user, hasLoadedData: hasLoadedData.current, isLoadingCV })
        return
      }

      console.log("Starting to load CV data for ID:", editId)
      setIsLoadingCV(true)
      setIsLoading(true)
      try {
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
          console.log("Successfully loaded CV data:", data)
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
          hasLoadedData.current = true
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
    }

    if (editId && user) {
      console.log("Effect triggered:", { editId, user, hasLoadedData: hasLoadedData.current })
      loadData()
    }
  }, [editId, user, isLoadingCV, reset, getValues])

  // Reset states when user changes
  useEffect(() => {
    if (user) {
      hasLoadedData.current = false
      setLastLoadedId(null)
      setIsInitialLoad(true)
    }
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

  const saveCV = async () => {
    const currentValues = getValues()
    console.log("Form data to save:", currentValues)
    
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
        throw error
      } else {
        console.log("CV data saved successfully:", data)
        toast({
          title: "Success",
          description: "CV saved successfully.",
        })
      }
    }
  }

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Spara först CV:t innan nedladdning
      await saveCV()

      const resumePreview = document.getElementById("resume-preview")
      if (!resumePreview) {
        throw new Error("Resume preview element not found")
      }

      // Vänta på att alla element ska laddas
      await new Promise(resolve => setTimeout(resolve, 500))

      // Skapa en container för att fånga allt innehåll
      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      document.body.appendChild(container)

      // Klona hela preview-elementet
      const clone = resumePreview.cloneNode(true) as HTMLElement
      container.appendChild(clone)

      // Sätt explicit stilar för att säkerställa korrekt rendering
      clone.style.width = '210mm'
      clone.style.height = 'auto'
      clone.style.overflow = 'visible'
      clone.style.backgroundColor = '#FFFFFF'

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        windowWidth: 210 * 3.78, // Konvertera mm till pixlar
        windowHeight: clone.scrollHeight
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      // Beräkna antalet sidor som behövs
      const pageHeight = pdf.internal.pageSize.getHeight()
      const totalPages = Math.ceil(pdfHeight / pageHeight)

      // Lägg till innehållet på varje sida
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage()
        }
        
        const position = -i * pageHeight
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
      }

      // Spara PDF:en
      pdf.save("resume.pdf")

      // Städa upp
      document.body.removeChild(container)
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
