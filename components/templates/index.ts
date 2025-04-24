import dynamic from 'next/dynamic'

const DefaultTemplate = dynamic(() => import('./default-template').then(mod => mod.DefaultTemplate))
const LyxigTemplate = dynamic(() => import('./lyxig-template').then(mod => mod.LyxigTemplate))
const ElegantTemplate = dynamic(() => import('./elegant-template').then(mod => mod.ElegantTemplate))
const ProfessionalTemplate = dynamic(() => import('./professional-template').then(mod => mod.ProfessionalTemplate))

export const templates = [
  {
    id: "default",
    name: "Standard",
    description: "En enkel och professionell mall som passar alla",
    preview: "/templates/default-preview.png",
    component: DefaultTemplate,
  },
  {
    id: "lyxig",
    name: "Lyxig",
    description: "En elegant och sofistikerad mall för den som vill sticka ut",
    preview: "/templates/lyxig-preview.png",
    component: LyxigTemplate,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "En klassisk och tidlös mall med fokus på läsbarhet",
    preview: "/templates/elegant-preview.png",
    component: ElegantTemplate,
  },
  {
    id: "professional",
    name: "Professional",
    description: "En modern och professionell mall för karriären",
    preview: "/templates/professional-preview.png",
    component: ProfessionalTemplate,
  },
]
