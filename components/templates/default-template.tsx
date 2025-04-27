import React from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface OptionalField {
  id: string
  label: string
  value: string
}

interface TemplateProps {
  data: {
    personalInfo: {
      firstName: string
      lastName: string
      title: string
      email?: string
      phone?: string
      address?: string
      postalCode?: string
      location?: string
      photo?: string
      summary?: string
      optionalFields?: Array<{
        id: string
        type: string
        label: string
        value: string
      }>
    }
    education?: any[]
    experience?: any[]
    skills?: any[]
    languages?: any[]
    sections: {
      [key: string]: any[]
    }
  }
  textColor?: string
  sectionOrder: string[]
  fontSize?: string
  selectedFont?: string
  sections?: Array<{ id: string; title: string; hidden?: boolean }>
  headerColor?: string
}

const formatDate = (date: string, year: string) => {
  if (!date && !year) return ""
  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ]
  const monthIndex = Number.parseInt(date, 10) - 1
  const monthName = monthNames[monthIndex] || date // Use the original date string if not a valid month number
  return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year || ""}`.trim()
}

const hasContent = (item: any) => {
  if (!item) return false
  return Object.values(item).some((value) => value && typeof value === "string" && value.trim() !== "")
}

const hasArrayContent = (items: any[] | undefined) => {
  return Array.isArray(items) && items.some(hasContent)
}

const getLanguageLevel = (level: number | string): number => {
  if (typeof level === "number") {
    return Math.min(Math.max(level, 1), 5) // Ensure the level is between 1 and 5
  }

  const levels: { [key: string]: number } = {
    nybörjare: 1,
    grundläggande: 2,
    konversationsnivå: 3,
    flytande: 4,
    modersmål: 5,
  }
  return levels[level.toLowerCase()] || 1 // Default to 1 if not found
}

export function DefaultTemplate({
  data,
  sectionOrder,
  textColor,
  fontSize,
  selectedFont,
  sections = [],
  headerColor,
}: TemplateProps) {
  // Uppdatera renderSection-funktionen för att hantera certifikat separat
  const renderSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section || section.hidden) return null

    const sectionStyle = {
      fontSize: fontSize,
    }

    switch (sectionId) {
      case "profile":
        if (!data.sections.hobbies || !data.sections.hobbies.description) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              PROFIL
            </h2>
            <div
              className="mt-2 text-sm break-words text-black"
              dangerouslySetInnerHTML={{ __html: data.sections.hobbies.description }}
            />
          </div>
        )
      case "experience":
        if (!hasArrayContent(data.workExperience)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              ARBETSLIVSERFARENHET
            </h2>
            {data.workExperience.filter(hasContent).map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold break-words text-black">{exp.title}</h3>
                  <p className="text-sm text-black">
                    {formatDate(exp.startDate, exp.startYear)}
                    {(exp.startDate || exp.startYear) && (exp.endDate || exp.endYear || exp.current) && " - "}
                    {exp.current ? "Nutid" : formatDate(exp.endDate, exp.endYear)}
                  </p>
                </div>
                <p className="break-words text-black">{exp.company}</p>
                <p className="break-words text-black">{exp.location}</p>
                {exp.description && (
                  <div
                    className="mt-2 text-sm break-words text-black"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      case "education":
        if (!hasArrayContent(data.education)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              UTBILDNING
            </h2>
            {data.education.filter(hasContent).map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold break-words text-black">{edu.degree}</h3>
                  <p className="text-sm text-black">
                    {formatDate(edu.startDate, edu.startYear)}
                    {(edu.startDate || edu.startYear) && (edu.endDate || edu.endYear || edu.current) && " - "}
                    {edu.current ? "Nutid" : formatDate(edu.endDate, edu.endYear)}
                  </p>
                </div>
                <p className="break-words text-black">{edu.school}</p>
                <p className="break-words text-black">{edu.location}</p>
                {edu.description && (
                  <div
                    className="mt-2 text-sm break-words text-black"
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      case "courses":
      case "internship":
      case "achievements":
        const sectionData = sectionId === "experience" ? data.experience : data.sections[sectionId]
        if (!hasArrayContent(sectionData)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              {section.title.toUpperCase()}
            </h2>
            {sectionData.filter(hasContent).map((item: any, index: number) => (
              <div key={index} className="mb-4">
                {sectionId === "certificates" ? (
                  item.name && <h3 className="font-semibold break-words text-black">{item.name}</h3>
                ) : (
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold break-words text-black">{item.title || item.degree || item.name}</h3>
                    <p className="text-sm text-black">
                      {formatDate(item.startDate, item.startYear)}
                      {(item.startDate || item.startYear) && (item.endDate || item.endYear || item.current) && " - "}
                      {item.current ? "Nutid" : formatDate(item.endDate, item.endYear)}
                    </p>
                  </div>
                )}
                <p className="break-words text-black">{item.company || item.school || item.institution}</p>
                <p className="break-words text-black">{item.location}</p>
                {item.description && (
                  <div
                    className="mt-2 text-sm break-words text-black"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      case "certificates":
        const certificatesData = data.sections.certificates
        if (!Array.isArray(certificatesData) || certificatesData.length === 0) {
          return null
        }
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              CERTIFIKAT
            </h2>
            {certificatesData.map((item: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold break-words text-black">{item.name}</h3>
                  <p className="text-sm text-black">
                    {formatDate(item.startDate, item.startYear)}
                    {(item.startDate || item.startYear) && (item.endDate || item.endYear || item.current) && " - "}
                    {item.current ? "Nutid" : formatDate(item.endDate, item.endYear)}
                  </p>
                </div>
                {item.description && (
                  <div
                    className="mt-2 text-sm break-words text-black"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      case "references":
        const referencesData = data.sections.references
        if (!hasArrayContent(referencesData)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b border-gray-300"
              style={{ color: headerColor || "#000000" }}
            >
              {section.title.toUpperCase()}
            </h2>
            {referencesData.filter(hasContent).map((item: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold break-words text-black">{item.name}</h3>
                <p className="break-words text-black">{item.title}</p>
                <p className="break-words text-black">{item.company}</p>
                {item.email && (
                  <p className="break-words text-black">
                    <Mail className="inline-block mr-1" size={14} />
                    {item.email}
                  </p>
                )}
                {item.phone && (
                  <p className="break-words text-black">
                    <Phone className="inline-block mr-1" size={14} />
                    {item.phone}
                  </p>
                )}
                {item.description && (
                  <div
                    className="mt-2 text-sm break-words text-black"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  const renderSideSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section || section.hidden) return null

    const sectionStyle = {
      fontSize: fontSize,
    }

    const getFieldLabel = (key: string): string => {
      const labels: Record<string, string> = {
        birthDate: "Födelsedatum",
        birthPlace: "Födelseort",
        drivingLicense: "Körkort",
        gender: "Kön",
        nationality: "Nationalitet",
        civilStatus: "Civilstånd",
        website: "Webbplats",
        linkedin: "LinkedIn",
        custom: "Anpassat fält"
      }
      return labels[key] || key
    }

    switch (sectionId) {
      case "personalInfo":
        const relevantFields = [
          "birthDate",
          "birthPlace",
          "drivingLicense",
          "gender",
          "nationality",
          "civilStatus",
          "website",
          "linkedin",
        ]
        const hasRelevantFields = data.personalInfo.optionalFields && 
          Object.entries(data.personalInfo.optionalFields).some(([key, value]) => 
            (relevantFields.includes(key) || key === "custom") && value && value.toString().trim() !== ""
          )
        if (!hasRelevantFields) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2 className="text-lg font-bold mb-2" style={{ color: headerColor || "#000000" }}>
              Personuppgifter
            </h2>
            {data.personalInfo.optionalFields && 
              Object.entries(data.personalInfo.optionalFields)
                .filter(([key, value]) => 
                  (relevantFields.includes(key) || key === "custom") && value && value.toString().trim() !== ""
                )
                .map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <p className="text-sm text-gray-500">{getFieldLabel(key)}</p>
                    <p className="mt-1px text-black">{value}</p>
                  </div>
                ))}
          </div>
        )
      case "skills":
        if (!hasArrayContent(data.skills)) return null
        return (
          <div className="mb-6 flex flex-col items-center pr-4" style={sectionStyle}>
            <h2 className="text-lg font-bold mb-2 self-start" style={{ color: headerColor || "#000000" }}>
              Färdigheter
            </h2>
            {data.skills.filter(hasContent).map((skill: any, index: number) => (
              <div key={index} className="mb-2 w-full">
                <p className="text-black">{skill.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${skill.level * 20}%`,
                      backgroundColor: headerColor || "#000000",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )
      case "languages":
        if (!hasArrayContent(data.languages)) return null
        const validLanguages = data.languages.filter((language) => language.name && language.name.trim() !== "")
        if (validLanguages.length === 0) return null
        return (
          <div className="mb-6 flex flex-col items-center pr-4" style={sectionStyle}>
            <h2 className="text-lg font-bold mb-2 self-start" style={{ color: headerColor || "#000000" }}>
              Språk
            </h2>
            {validLanguages.map((language: any, index: number) => (
              <div key={index} className="mb-2 w-full">
                <p className="text-black mb-1">{language.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${((language.level || 3) / 5) * 100}%`,
                      backgroundColor: headerColor || "#000000",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )
      case "traits":
        const traits = data.sections.traits
        if (!hasArrayContent(traits)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2 className="text-lg font-bold mb-2" style={{ color: headerColor || "#000000" }}>
              Egenskaper
            </h2>
            <ul className="list-disc list-inside">
              {traits.filter(hasContent).map((trait: any, index: number) => (
                <li key={index} className="text-black">
                  {trait.trait}
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  const headerHeight = "180px"

  return (
    <div
      className={`bg-white ${poppins.className}`}
      style={{
        width: "210mm",
        minHeight: "297mm",
        color: textColor || "#000000",
        fontFamily: selectedFont === "Poppins" ? "inherit" : selectedFont,
        fontSize: fontSize,
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <header
        className="text-white"
        style={{
          height: headerHeight,
          backgroundColor: headerColor || "#000000",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "32px",
        }}
      >
        {data.personalInfo.photo && (
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: headerHeight, height: headerHeight }}>
            <img
              src={data.personalInfo.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`flex flex-col justify-center h-full ${data.personalInfo.photo ? "ml-[180px]" : ""}`}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">
              {data.personalInfo.firstName || data.personalInfo.lastName
                ? `${data.personalInfo.firstName || ""} ${data.personalInfo.lastName || ""}`
                : "Curriculum Vitae"}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center">
                  <Mail size={16} className="mr-1" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="mr-1" />
                  {data.personalInfo.phone}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {data.personalInfo.title && <p className="text-xl">{data.personalInfo.title}</p>}
            {data.personalInfo.address && (
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-1" />
                {data.personalInfo.address}, {data.personalInfo.postalCode} {data.personalInfo.location}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0 left-2/3 w-px bg-gray-300"
        style={{ 
          top: headerHeight, 
          height: `calc(100% - ${headerHeight})`,
          pointerEvents: 'none'
        }}
      ></div>

      {/* Main content */}
      <div className="flex relative" style={{ 
        paddingTop: headerHeight, 
        minHeight: `calc(297mm - ${headerHeight})`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left column */}
        <div className="w-8/12 p-8 overflow-hidden">
          {sectionOrder.map((sectionId) => {
            // Lägg till denna loggning
            return <React.Fragment key={sectionId}>{renderSection(sectionId)}</React.Fragment>
          })}
        </div>

        {/* Right column */}
        <div className="w-4/12 p-8 overflow-hidden">
          {["personalInfo", "skills", "languages", "traits"].map((sectionId) => (
            <React.Fragment key={sectionId}>{renderSideSection(sectionId)}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DefaultTemplate
