import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: "elegant",
    name: "Elegant CV Mall",
    description:
      "En modern och professionell CV-mall med en stilren lila design. Perfekt för kreativa yrken och moderna arbetsplatser.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elegant%20preview%20lila-GrO1ijYSfR6swfJFW1YLhcJNUFauui.png",
  },
  {
    id: "standard",
    name: "Standard CV Mall",
    description:
      "En klassisk och professionell CV-mall med en tidlös design. Passar perfekt för traditionella branscher och företag.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/standard%20preview-FpFDyr3gxAI9flujNHZGgXsY5aTm0u.png",
  },
  {
    id: "lyxig",
    name: "Lyxig CV Mall",
    description:
      "En unik och iögonfallande CV-mall med en distinkt orange design. Idealisk för att sticka ut från mängden.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lyxig%20preview%20orange-eEdf32ZOAWROS2ndtwKdHorB9aQoKg.png",
  },
]

export default function CVTemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Våra CV-mallar</h1>
        <p className="text-xl text-gray-600">
          Välj bland våra professionellt designade CV-mallar för att skapa ett CV som sticker ut från mängden
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={`${template.name} förhandsvisning`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <Link href={`/profil/skapa-cv?template=${template.id}`}>
                <Button className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white">Använd denna mall</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const metadata = {
  title: "CV-mallar | CVfixaren",
  description: "Utforska våra professionella CV-mallar och skapa ditt perfekta CV med CVfixaren.",
}
