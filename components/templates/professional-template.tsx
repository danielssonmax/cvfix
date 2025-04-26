import { Mail, Phone, MapPin } from "lucide-react"
import { Poppins } from "next/font/google"
import type { TemplateProps } from "./template-types"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// ... (resten av koden är samma som i default-template.tsx)

export function ProfessionalTemplate({
  data,
  sectionOrder,
  textColor,
  fontSize,
  selectedFont,
  sections = [],
  headerColor,
}: TemplateProps) {
  const hasContent = (item: any) => {
    if (!item) return false
    return Object.values(item).some((value) => value && typeof value === "string" && value.trim() !== "")
  }

  const hasArrayContent = (items: any[] | undefined) => {
    return Array.isArray(items) && items.some(hasContent)
  }

  return (
    <div
      className="min-h-full bg-white"
      style={{
        color: textColor,
        fontSize: fontSize,
        fontFamily: selectedFont,
      }}
    >
      {/* Header */}
      <div className="bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{data.personalInfo.title}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {[data.personalInfo.address, data.personalInfo.postalCode, data.personalInfo.location]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 gap-8">
        {/* Experience */}
        {hasArrayContent(data.workExperience) && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Arbetslivserfarenhet</h2>
            <div className="space-y-6">
              {data.workExperience!.filter(hasContent).map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Nutid" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasArrayContent(data.education) && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Utbildning</h2>
            <div className="space-y-6">
              {data.education!.filter(hasContent).map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {edu.startDate} - {edu.current ? "Nutid" : edu.endDate}
                    </span>
                  </div>
                  {edu.description && <p className="text-gray-700">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasArrayContent(data.skills) && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Färdigheter</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills!.filter(hasContent).map((skill, index) => (
                <div key={index}>
                  <span className="font-medium">{skill.name}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-gray-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {hasArrayContent(data.languages) && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">Språk</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.languages!.filter(hasContent).map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other sections */}
        {Object.entries(data.sections || {}).map(([key, items]) => {
          if (!hasArrayContent(items)) return null
          return (
            <section key={key}>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-300">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <div className="space-y-2">
                {(items as any[]).filter(hasContent).map((item: any, index: number) => (
                  <div key={index} className="text-gray-700">
                    {item.name || item.title || item.trait}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default ProfessionalTemplate
