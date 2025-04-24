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
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  const titles: { [key: string]: string } = {
    personalInfo: "Personuppgifter",
    education: "Utbildning",
    experience: "Arbetslivserfarenhet",
    skills: "Färdigheter",
    languages: "Språk",
    profile: "Personuppgifter",
    courses: "Kurser",
    internship: "Praktik",
    profile: "Profil",
    references: "Referenser",
    traits: "Egenskaper",
    certificates: "Certifikat",
    achievements: "Prestationer",
  }

  const methods = useForm<FormData>({
    defaultValues: {
      personalInfo: {
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        photo: "",
        address: "",
        postalCode: "",
      },
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          startYear: "",
          endDate: "",
          endYear: "",
          current: false,
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          school: "",
          location: "",
          startDate: "",
          startYear: "",
          endDate: "",
          endYear: "",
          current: false,
          description: "",
        },
      ],
      skills: [
        {
          name: "",
          level: 3,
        },
      ],
      languages: [
        {
          name: "",
          level: "3",
        },
      ],
      sections: {
        profile: [{ title: "Profil", content: "" }],
        courses: [
          {
            title: "",
            institution: "",
            location: "",
            startDate: "",
            startYear: "",
            endDate: "",
            endYear: "",
            current: false,
            description: "",
          },
        ],
        internship: [
          {
            title: "",
            company: "",
            location: "",
            startDate: "",
            startYear: "",
            endDate: "",
            endYear: "",
            current: false,
            description: "",
          },
        ],
        profile: [
          {
            title: "",
            description: "",
          },
        ],
        references: [
          {
            name: "",
            title: "",
            company: "",
            email: "",
            phone: "",
            description: "",
          },
        ],
        traits: [
          {
            trait: "",
            description: "",
          },
        ],
        certificates: [
          {
            name: "",
            issuer: "",
            date: "",
            year: "",
            description: "",
          },
        ],
        achievements: [
          {
            title: "",
            date: "",
            year: "",
            description: "",
          },
        ],
      },
    },
  })

  const formData = useWatch({ control: methods.control })

  useEffect(() => {
    if (formData.sections && formData.sections.references) {
    }
  }, [formData])

  useEffect(() => {
    if (formData.sections && formData.sections.references) {
    }
  }, [formData.sections, formData.sections.references])

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

  useEffect(() => {}, [])

  const handleSectionUpdate = useCallback(
    (sectionId: string, value: string) => {
      methods.setValue(`${sectionId}.content`, value)
    },
    [methods],
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

  return (
    <FormProvider {...methods}>
      <div className="flex h-full">
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
            <div className="space-y-2">
              <Button className="w-full bg-black hover:bg-[#00a857] text-white" onClick={() => setShowPreview(true)}>
                Förhandsgranskning
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
    </FormProvider>
  )
}

export default ResumeEditor
