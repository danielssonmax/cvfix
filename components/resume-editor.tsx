"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { useForm, FormProvider, useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ResumePreview } from "@/components/resume-preview"
import {
  ArrowUp,
  ArrowDown,
  LayoutIcon,
  Type,
  TextIcon as TextSize,
  Palette,
  ChevronDown,
  Check,
  ChevronUp,
  Eye,
  EyeOff,
  Save,
  Download,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PersonalInfo } from "@/components/resume-sections/PersonalInfo"
import { Experience } from "@/components/resume-sections/Experience"
import { Education } from "@/components/resume-sections/Education"
import { Skills } from "@/components/resume-sections/Skills"
import { Languages } from "@/components/resume-sections/Languages"
import { DownloadPopup } from "@/components/download-popup"
import { Courses } from "@/components/resume-sections/Courses"
import { Internship } from "@/components/resume-sections/Internship"
import { Profile } from "@/components/resume-sections/Profile"
import { References } from "@/components/resume-sections/References"
import { Traits } from "@/components/resume-sections/Traits"
import { Certificates } from "@/components/resume-sections/Certificates"
import { Achievements } from "@/components/resume-sections/Achievements"
import { templates } from "@/components/templates"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

type FormData = {
  personalInfo: {
    title: string
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    summary: string
    photo: string
    address: string
    postalCode: string
  }
  experience: Array<{
    title: string
    company: string
    location: string
    startDate: string
    startYear: string
    endDate: string
    endYear: string
    current: boolean
    description: string
  }>
  education: Array<{
    degree: string
    school: string
    location: string
    startDate: string
    startYear: string
    endDate: string
    endYear: string
    current: boolean
    description: string
  }>
  skills: Array<{
    name: string
    level: number
  }>
  languages: Array<{
    name: string
    level: string
  }>
  sections: {
    profile: Array<{ title: string; content: string }>
    courses: Array<{
      title: string
      institution: string
      location: string
      startDate: string
      startYear: string
      endDate: string
      endYear: string
      current: boolean
      description: string
    }>
    internship: Array<{
      title: string
      company: string
      location: string
      startDate: string
      startYear: string
      endDate: string
      endYear: string
      current: boolean
      description: string
    }>
    profile: Array<{ title: string; description: string }>
    references: Array<{
      name: string
      title: string
      company: string
      email: string
      phone: string
      description: string
    }>
    traits: Array<{ trait: string; description: string }>
    certificates: Array<{
      name: string
      issuer: string
      date: string
      year: string
      description: string
    }>
    achievements: Array<{
      title: string
      date: string
      year: string
      description: string
    }>
  }
}

interface ResumeEditorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
  form: ReturnType<typeof useForm>
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ selectedTemplate, onSelectTemplate, form }) => {
  const { user } = useAuth()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showCapturePayment, setShowCapturePayment] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const titles: { [key: string]: string } = {
    personalInfo: "Personuppgifter",
    education: "Utbildning",
    experience: "Arbetslivserfarenhet",
    skills: "Färdigheter",
    languages: "Språk",
    profile: "Personuppgifter",
    courses: "Kurser",
    internship: "Praktik",
    references: "Referenser",
    traits: "Egenskaper",
    certificates: "Certifikat",
    achievements: "Prestationer",
  }

  const formData = useWatch({ control: form.control })

  const [showScrollbar, setShowScrollbar] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [addedSections, setAddedSections] = useState<string[]>([
    "personalInfo",
    "experience", // Flyttad upp
    "education", // Flyttad ner
    "skills",
    "languages",
    "courses",
    "internship",
    "traits",
    "certificates",
    "achievements",
    "profile",
    "references",
  ])
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false)
  const [selectedFont, setSelectedFont] = useState("Poppins")
  const [fontSize, setFontSize] = useState("M")
  const [fontSizePixels, setFontSizePixels] = useState("16px")
  const [showTemplateMenu, setShowTemplateMenu] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [showFontMenu, setShowFontMenu] = useState(false)
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(["personalInfo"])
  const [headerColor, setHeaderColor] = useState("#000000")
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const [staticSectionSections, setStaticSectionSections] = useState([
    { id: "personalInfo", title: "Personuppgifter", component: PersonalInfo, removable: false, hidden: false },
    { id: "education", title: "Utbildning", component: Education, removable: true, hidden: false },
    { id: "experience", title: "Arbetslivserfarenhet", component: Experience, removable: true, hidden: false },
    { id: "skills", title: "Färdigheter", component: Skills, removable: true, hidden: false },
    { id: "languages", title: "Språk", component: Languages, removable: true, hidden: false },
    { id: "courses", title: "Kurser", component: Courses, removable: true, hidden: true },
    { id: "internship", title: "Praktik", component: Internship, removable: true, hidden: true },
    { id: "traits", title: "Egenskaper", component: Traits, removable: true, hidden: true },
    { id: "certificates", title: "Certifikat", component: Certificates, removable: true, hidden: true },
    { id: "achievements", title: "Prestationer", component: Achievements, removable: true, hidden: true },
    { id: "profile", title: "Profil", component: Profile, removable: true, hidden: true },
    { id: "references", title: "Referenser", component: References, removable: true, hidden: true },
  ])

  const fontSizeDropdownRef = useRef<HTMLDivElement>(null)
  const fontDropdownRef = useRef<HTMLDivElement>(null)
  const templateDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showFontSizeMenu && fontSizeDropdownRef.current) {
        if (!fontSizeDropdownRef.current.contains(event.target as Node)) {
          setShowFontSizeMenu(false)
        }
      }
      if (showFontMenu && fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
        setShowFontMenu(false)
      }
      if (
        showTemplateMenu &&
        templateDropdownRef.current &&
        !templateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTemplateMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showFontSizeMenu, showFontMenu, showTemplateMenu])

  useEffect(() => {
    const checkOverflow = () => {
      if (formContainerRef.current) {
        const isOverflowing = formContainerRef.current.scrollHeight > formContainerRef.current.clientHeight
        setShowScrollbar(isOverflowing)
      }
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)

    const observer = new MutationObserver(checkOverflow)
    if (formContainerRef.current) {
      observer.observe(formContainerRef.current, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener("resize", checkOverflow)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) {
        setIsSubscribed(false)
        return
      }

      try {
        const { data: premiumData, error: premiumError } = await supabase
          .from("premium")
          .select("premium")
          .eq("uid", user.id)
          .single()

        if (premiumError) {
          console.error("Error fetching premium status:", premiumError)
          return
        }

        setIsSubscribed(premiumData?.premium || false)
      } catch (error) {
        console.error("Error in subscription check process:", error)
      }
    }

    fetchSubscriptionStatus()
  }, [user])

  const handleSectionUpdate = useCallback(
    (sectionId: string, value: string) => {
      form.setValue(`${sectionId}.content`, value)
    },
    [form],
  )

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => (prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]))
  }

  const handleRemoveSection = useCallback((id: string) => {
    if (id !== "personalInfo") {
      setAddedSections((prev) => prev.filter((sectionId) => sectionId !== id))
    }
  }, [])

  const handleMoveSection = useCallback(
    (index: number, direction: "up" | "down") => {
      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex >= 0 && newIndex < addedSections.length) {
        const newSections = [...addedSections]
        ;[newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]]
        setAddedSections(newSections)
      }
    },
    [addedSections],
  )

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setStaticSectionSections((prevSections) =>
      prevSections.map((s) => (s.id === sectionId ? { ...s, hidden: !s.hidden } : s)),
    )
  }, [])

  const handleFontSizeChange = (size: string) => {
    const sizes = {
      XS: "12px",
      S: "14px",
      M: "16px",
      L: "18px",
      XL: "20px",
    }
    setFontSize(size)
    setFontSizePixels(sizes[size as keyof typeof sizes] || "16px")
    setShowFontSizeMenu(false)
  }

  useEffect(() => {}, [])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setHeaderColor(color)
  }

  // Uppdatera toggleColorPicker funktionen
  const toggleColorPicker = () => {
    setIsColorPickerOpen((prev) => {
      return !prev
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const memoizedResumePreviewData = useMemo(
    () => ({
      ...formData,
      sections: {
        ...formData.sections,
        personalInfo: formData.personalInfo,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        languages: formData.languages,
      },
    }),
    [formData],
  )

  const memoizedSections = useMemo(() => staticSectionSections, [staticSectionSections])

  // Uppdatera fontlistan och lägg till Poppins
  const fonts = [
    "Poppins",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
  ]

  // Uppdatera useEffect för att logga när komponenten monteras
  useEffect(() => {}, [])

  const [showPreview, setShowPreview] = useState(false)

  const ActionButton = ({ 
    icon: Icon, 
    onClick, 
    disabled = false,
    className = ""
  }: { 
    icon: React.ElementType;
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <div
      onClick={(e) => {
        e.stopPropagation()
        if (!disabled) onClick(e)
      }}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-400",
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </div>
  );

  const handleSaveClick = () => {
    if (user) {
      if (isSubscribed) {
        saveCV()
      } else {
        setShowCapturePayment(true)
      }
    } else {
      setShowSignupPopup(true)
    }
  }

  const saveCV = async () => {
    setIsSaving(true)
    try {
      const currentValues = form.getValues()
      const cvData = {
        user_id: user.id,
        data: currentValues,
        title: currentValues.personalInfo.firstName || currentValues.personalInfo.lastName 
          ? `${currentValues.personalInfo.firstName || ''} ${currentValues.personalInfo.lastName || ''}'s CV`.trim()
          : 'Untitled CV'
      }

      const { data, error } = await supabase
        .from('cvs')
        .upsert([cvData], {
          onConflict: 'user_id,title'
        })
        .select()

      if (error) {
        console.error("Error saving CV:", error)
        toast({
          title: "Error",
          description: `Failed to save CV: ${error.message}`,
          variant: "destructive",
        })
      } else {
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000) // Hide after 3 seconds
        toast({
          title: "Success",
          description: "CV saved successfully to your pages.",
        })
      }
    } catch (error) {
      console.error("Error saving CV:", error)
      toast({
        title: "Error",
        description: "Failed to save CV. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
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
      const resumePreview = document.getElementById("resume-preview")
      if (!resumePreview) {
        throw new Error("Resume preview element not found")
      }

      const canvas = await html2canvas(resumePreview as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

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

  return (
    <FormProvider {...form}>
      <div className="flex h-full">
        {/* Success message */}
        {showSuccessMessage && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50 animate-fade-in">
            CV sparades framgångsrikt!
          </div>
        )}

        {/* Left side - Form */}
        <div ref={formContainerRef} className="w-full p-4 bg-white overflow-y-auto sm:w-1/2">
          <div className="space-y-2 max-w-xl mx-auto sm:w-auto">
            {/* Main sections */}
            {addedSections.map((id, index) => {
              const section = staticSectionSections.find((s) => s.id === id)
              if (!section) return null

              const isOpen = openSections.includes(section.id)

              return (
                <Collapsible key={section.id} id={section.id} open={isOpen}>
                  <div className={`border-b border-gray-200 ${section.hidden ? "opacity-50" : ""}`}>
                    <CollapsibleTrigger
                      className="flex w-full items-center justify-between py-2 px-1"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className="text-gray-600 font-medium text-sm pb-1">{section.title}</span>
                      <div className="flex items-center">
                        {section.removable && (
                          <>
                            <ActionButton
                              icon={ArrowUp}
                              onClick={() => handleMoveSection(index, "up")}
                              disabled={index <= 0}
                              className="mr-1"
                            />
                            <ActionButton
                              icon={ArrowDown}
                              onClick={() => handleMoveSection(index, "down")}
                              disabled={index === addedSections.length - 1}
                              className="mr-1"
                            />
                            <ActionButton
                              icon={section.hidden ? EyeOff : Eye}
                              onClick={() => toggleSectionVisibility(section.id)}
                              className="mr-2"
                            />
                          </>
                        )}
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="py-2 space-y-2">
                      {section.id === "personalInfo" && <PersonalInfo />}
                      {section.id === "experience" && <Experience />}
                      {section.id === "education" && <Education />}
                      {section.id === "skills" && <Skills />}
                      {section.id === "languages" && <Languages />}
                      {section.id === "courses" && <Courses />}
                      {section.id === "internship" && <Internship />}
                      {section.id === "profile" && <Profile />}
                      {section.id === "references" && <References />}
                      {section.id === "traits" && <Traits />}
                      {section.id === "certificates" && <Certificates />}
                      {section.id === "achievements" && <Achievements />}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}

            {/* Preview and Download buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button className="w-full bg-black hover:bg-[#00a857] text-white flex items-center justify-center gap-2" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4" />
                Förhandsgranska
              </Button>
              <Button 
                className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white flex items-center justify-center gap-2" 
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Sparar..." : "Spara"}
              </Button>
              <Button 
                className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white flex items-center justify-center gap-2" 
                onClick={handleDownloadClick}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Laddar ner..." : "Ladda ner"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="hidden sm:flex w-full bg-gray-100 overflow-y-auto flex-col sm:w-1/2">
          <div className="hidden sm:flex w-full flex-grow overflow-y-auto p-4">
            <div
              className="bg-white shadow-lg mx-auto"
              style={{
                width: "210mm",
                height: "297mm",
              }}
            >
              <ResumePreview
                data={memoizedResumePreviewData}
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                fontSize={fontSizePixels}
                textColor={selectedColor}
                headerColor={headerColor}
                hasChangedTemplate={false}
                sectionOrder={addedSections}
                sections={memoizedSections}
              />
            </div>
          </div>
          {/* Preview controls */}
          <div className="bg-white border-t w-full p-3.5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center">
                <div className="relative" ref={templateDropdownRef}>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowTemplateMenu(!showTemplateMenu)
                    }}
                  >
                    <LayoutIcon className="h-4 w-4" />
                    <span className="text-sm">Mall</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showTemplateMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showTemplateMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border p-2 space-y-1 z-999">
                      {templates
                        .filter((template) => ["default", "lyxig", "elegant"].includes(template.id))
                        .map((template) => (
                          <button
                            key={template.id}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectTemplate(template.id)
                              setShowTemplateMenu(false)
                            }}
                          >
                            <span className="text-sm">{template.name}</span>
                            {selectedTemplate === template.id && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Font selector */}
                <div className="relative" ref={fontDropdownRef}>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowFontMenu(!showFontMenu)
                    }}
                  >
                    <Type className="h-4 w-4" />
                    <span className="text-sm">{selectedFont}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFontMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showFontMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border p-2 space-y-1 z-999">
                      {fonts.map((font) => (
                        <button
                          key={font}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                            selectedFont === font ? "bg-gray-100" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedFont(font)
                            setShowFontMenu(false)
                          }}
                          style={{ fontFamily: font }}
                        >
                          <span className="text-sm">{font}</span>
                          {selectedFont === font && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Font size selector */}
                <div className="relative" ref={fontSizeDropdownRef}>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full"
                    onClick={() => setShowFontSizeMenu(!showFontSizeMenu)}
                  >
                    <TextSize className="h-4 w-4" />
                    <span className="text-sm">Size {fontSize}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFontSizeMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showFontSizeMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border p-2 space-y-1 z-999">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                            fontSize === size ? "bg-gray-100" : ""
                          }`}
                          onClick={() => handleFontSizeChange(size)}
                        >
                          <span className="text-sm">Size {size}</span>
                          {fontSize === size && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Color picker */}
                <div className="relative" ref={colorPickerRef}>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={toggleColorPicker}
                  >
                    <Palette className="h-4 w-4" />
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: selectedColor }} />
                  </button>
                  {isColorPickerOpen && (
                    <div className="absolute bottom-full right-0 mb-2 p-4 bg-white rounded-lg shadow-lg border z-[9999] w-64">
                      <div className="grid grid-cols-6 gap-3 mb-3">
                        {["#000000", "#4A5568", "#2B6CB0", "#48BB78", "#9F7AEA", "#ED8936"].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-md border border-gray-200 shadow-sm"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-full h-10 cursor-pointer"
                      />
                      <div className="mt-2 text-sm font-medium text-center">{selectedColor}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent
          className="bg-gray-100 flex flex-col overflow-visible max-w-[none] transform scale-[0.4] md:scale-100 origin-center"
          style={{ minWidth: "950px", minHeight: "1300px" }}
        >
          <div className="bg-white p-8">
            <ResumePreview
              data={memoizedResumePreviewData}
              selectedTemplate={selectedTemplate}
              selectedFont={selectedFont}
              fontSize={fontSizePixels}
              textColor={selectedColor}
              headerColor={headerColor}
              hasChangedTemplate={false}
              sectionOrder={addedSections}
              sections={memoizedSections}
            />
            <div className="bg-white border-t w-full p-3.5">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <div className="relative" ref={templateDropdownRef}>
                    <button
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowTemplateMenu(!showTemplateMenu)
                      }}
                    >
                      <LayoutIcon className="h-4 w-4" />
                      <span className="text-sm">Mall</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${showTemplateMenu ? "rotate-180" : ""}`} />
                    </button>

                    {showTemplateMenu && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border p-2 space-y-1 z-999">
                        {templates
                          .filter((template) => ["default", "lyxig", "elegant"].includes(template.id))
                          .map((template) => (
                            <button
                              key={template.id}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                onSelectTemplate(template.id)
                                setShowTemplateMenu(false)
                              }}
                            >
                              <span className="text-sm">{template.name}</span>
                              {selectedTemplate === template.id && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="fixed top-4 right-4 bg-white text-black hover:bg-gray-200"
              onClick={() => setShowPreview(false)}
            >
              Stäng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DownloadPopup isOpen={isDownloadPopupOpen} onClose={() => setIsDownloadPopupOpen(false)} />

      {/* Add payment and signup popups */}
      {showCapturePayment && (
        <CapturePayment onClose={() => setShowCapturePayment(false)} />
      )}
      {showSignupPopup && (
        <SignupPopup onClose={() => setShowSignupPopup(false)} />
      )}
    </FormProvider>
  )
}

export default ResumeEditor
