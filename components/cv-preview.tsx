interface CVPreviewProps {
  data: any
}

export function CVPreview({ data }: CVPreviewProps) {
  return (
    <div className="max-w-[21cm] mx-auto bg-white">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>
                {data.personalInfo.address}
                {data.personalInfo.postalCode && `, ${data.personalInfo.postalCode}`}
                {data.personalInfo.city && ` ${data.personalInfo.city}`}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-[2fr_1fr] gap-8">
        {/* Left Column */}
        <div>
          {/* Profile */}
          {data.sections && data.sections.hobbies && data.sections.hobbies.description && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Profil</h2>
              <div className="mb-4">
                <div dangerouslySetInnerHTML={{ __html: data.sections.hobbies.description }} />
              </div>
            </section>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Arbetslivserfarenhet</h2>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Utbildning</h2>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="mt-2">{edu.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Other sections... */}
        </div>

        {/* Right Column */}
        <div>
          {/* Personal Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Personuppgifter</h2>
            <div className="space-y-2">
              {data.personalInfo.birthDate && (
                <p>
                  <span className="font-medium">Födelsedatum:</span> {data.personalInfo.birthDate}
                </p>
              )}
              {data.personalInfo.nationality && (
                <p>
                  <span className="font-medium">Nationalitet:</span> {data.personalInfo.nationality}
                </p>
              )}
              {data.personalInfo.civilStatus && (
                <p>
                  <span className="font-medium">Civilstånd:</span> {data.personalInfo.civilStatus}
                </p>
              )}
            </div>
          </section>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Färdigheter</h2>
              <div className="space-y-2">
                {data.skills.map((skill: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Språk</h2>
              <div className="space-y-2">
                {data.languages.map((language: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <span>{language.name}</span>
                      <span>{language.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Traits */}
          {data.traits && data.traits.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Egenskaper</h2>
              <ul className="list-disc list-inside">
                {data.traits.map((trait: any, index: number) => (
                  <li key={index}>{trait.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
