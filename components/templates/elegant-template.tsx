import React from "react"
import { Mail, Phone, MapPin, User } from "lucide-react"
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
  const monthName = monthNames[monthIndex] || date
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
    return Math.min(Math.max(level, 1), 5)
  }

  const levels: { [key: string]: number } = {
    nybörjare: 1,
    grundläggande: 2,
    konversationsnivå: 3,
    flytande: 4,
    modersmål: 5,
  }
  return levels[level.toLowerCase()] || 1
}

export function ElegantTemplate({
  data,
  sectionOrder,
  textColor,
  fontSize,
  selectedFont,
  sections = [],
  headerColor = "#f1efe7", // Default color
}: TemplateProps) {
  console.log("ElegantTemplate data:", JSON.stringify(data, null, 2))
  console.log("ElegantTemplate sectionOrder:", sectionOrder)
  console.log("ElegantTemplate sections:", sections)
  console.log("References data in template:", JSON.stringify(data.sections.references, null, 2))

  const renderMainSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section || section.hidden) return null

    const sectionStyle = {
      fontSize: fontSize,
    }

    console.log(`Attempting to render section: ${sectionId}`)

    switch (sectionId) {
      case "profile":
        if (!data.sections.hobbies || !data.sections.hobbies.description) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
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
        if (!hasArrayContent(data.experience)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
            >
              ARBETSLIVSERFARENHET
            </h2>
            {data.experience.filter(hasContent).map((exp: any, index: number) => (
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
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
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
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
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
        console.log("Rendering certificates section")
        console.log("Certificates data:", JSON.stringify(data.sections.certificates, null, 2))
        const certificatesData = data.sections.certificates
        if (!Array.isArray(certificatesData) || certificatesData.length === 0) {
          console.log("No certificate data to render")
          return null
        }
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
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
        console.log("Rendering references section")
        console.log("References data:", JSON.stringify(data.sections.references, null, 2))
        const referencesData = data.sections.references
        if (!hasArrayContent(referencesData)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
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
        const hasRelevantFields =
          data.personalInfo.optionalFields &&
          data.personalInfo.optionalFields.some(
            (field: OptionalField) =>
              (relevantFields.includes(field.type) || field.type === "custom") && field.value.trim() !== "",
          )
        if (!hasRelevantFields) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2 className="text-lg font-semibold uppercase mb-4 pb-2 border-b border-white/20">Personuppgifter</h2>
            {data.personalInfo.optionalFields &&
              data.personalInfo.optionalFields
                .filter(
                  (field: OptionalField) =>
                    (relevantFields.includes(field.type) || field.type === "custom") && field.value.trim() !== "",
                )
                .map((field: OptionalField) => (
                  <div key={field.id} className="mb-2">
                    <p className="text-sm text-gray-500">{field.label}</p>
                    <p className="mt-1px text-white">{field.value}</p>
                  </div>
                ))}
          </div>
        )
      case "skills":
        if (!hasArrayContent(data.skills)) return null
        return (
          <div className="mb-6" style={sectionStyle}>
            <h2 className="text-lg font-semibold uppercase mb-4 pb-2 border-b border-white/20">Färdigheter</h2>
            {data.skills.filter(hasContent).map((skill: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="text-sm text-white mb-1">{skill.name}</p>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${skill.level * 20}%`,
                      backgroundColor: headerColor || "#800020",
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
          <div className="mb-6" style={sectionStyle}>
            <h2 className="text-lg font-semibold uppercase mb-4 pb-2 border-b border-white/20">Språk</h2>
            {validLanguages.map((language: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="text-sm text-white mb-1">{language.name}</p>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${((language.level || 3) / 5) * 100}%`,
                      backgroundColor: headerColor || "#800020",
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
            <h2 className="text-lg font-semibold uppercase mb-4 pb-2 border-b border-white/20">Egenskaper</h2>
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

  return (
    <div
      className={`flex bg-white ${poppins.className}`}
      style={{
        width: "210mm",
        minHeight: "297mm",
        color: textColor || "#333333",
        fontFamily: selectedFont === "Poppins" ? "inherit" : selectedFont,
        fontSize: fontSize || "14px",
      }}
    >
      {/* Left Sidebar */}
      <div
        className="w-1/3 text-white"
        style={{
          backgroundColor: "#1a1a1a",
          minHeight: "297mm",
        }}
      >
        {/* Header with Photo */}
        <div
          className="flex align-center w-full py-6 px-8 m-8 border-8 border-white"
          style={{
            backgroundColor: headerColor || "#800020",
            minWidth: "190mm",
          }}
        >
          <div className="flex items-center gap-4">
            {data.personalInfo.photo ? (
              <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-white/50">
                <img
                  src={data.personalInfo.photo || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white/50">
                <User size={40} />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              {data.personalInfo.title && <p className="text-sm text-white/90">{data.personalInfo.title}</p>}
            </div>
          </div>
          <div className="align-items-right mt-4 space-y-2">
            {data.personalInfo.email && (
              <div className="flex align-items-right gap-2 text-sm ml-32">
                <Mail className="w-4 h-4" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex align-items-right gap-2 text-sm ml-32">
                <Phone className="w-4 h-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex align-items-right gap-2 text-sm ml-32">
                <MapPin className="w-4 h-4" />
                <span>
                  {data.personalInfo.address}
                  {data.personalInfo.postalCode && `, ${data.personalInfo.postalCode}`}
                  {data.personalInfo.location && ` ${data.personalInfo.location}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-8 space-y-8">
          {["personalInfo", "skills", "languages", "traits"].map((sectionId) => (
            <React.Fragment key={sectionId}>{renderSideSection(sectionId)}</React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 px-8 mt-64 bg-white">
        {/* Profile Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2
              className="text-lg font-semibold uppercase mb-4 pb-2 border-b-2"
              style={{
                color: headerColor || "#800020",
                borderColor: headerColor || "#800020",
              }}
            >
              Profil
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Main Sections */}
        {sectionOrder.map((sectionId) => (
          <React.Fragment key={sectionId}>{renderMainSection(sectionId)}</React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ElegantTemplate
