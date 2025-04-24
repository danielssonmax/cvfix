export interface TemplateProps {
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
  sectionOrder?: string[]
  fontSize?: string
  selectedFont?: string
  sections?: Array<{ id: string; title: string; hidden: boolean }>
}
