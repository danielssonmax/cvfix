import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Roboto } from "next/font/google"
import { Header } from "@/components/header"
import Image from "next/image"
import { FAQ } from "@/components/faq"
import { Section } from "@/components/section"
import { CVTemplateCard } from "@/components/cv-template-card"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

const faqItems = [
  {
    question: "Hur långt bör mitt CV vara?",
    answer:
      "Ett CV bör vanligtvis vara 1-2 sidor långt. För nyutexaminerade eller de med mindre erfarenhet räcker ofta en sida, medan mer erfarna kandidater kan behöva två sidor för att presentera all relevant information.",
  },
  {
    question: "Ska jag inkludera ett foto på mitt CV?",
    answer:
      "I Sverige är det inte standard att inkludera ett foto på CV:t. Det är oftast bättre att fokusera på dina kvalifikationer och erfarenheter. Om en arbetsgivare specifikt ber om ett foto kan du inkludera det.",
  },
  {
    question: "I vilken ordning ska jag lista min arbetslivserfarenhet?",
    answer:
      "Det är vanligast att lista arbetslivserfarenhet i omvänd kronologisk ordning, med den senaste erfarenheten först. Detta ger arbetsgivaren en tydlig bild av din senaste och mest relevanta erfarenhet.",
  },
  {
    question: "Hur anpassar jag mitt CV för olika jobb?",
    answer:
      "Anpassa ditt CV genom att lyfta fram de färdigheter och erfarenheter som är mest relevanta för den specifika tjänsten. Läs jobbannonsen noga och använd liknande nyckelord i ditt CV för att visa hur du matchar kraven.",
  },
  {
    question: "Bör jag inkludera referenser i mitt CV?",
    answer:
      "Det är inte nödvändigt att inkludera referenser direkt i CV:t. Istället kan du skriva 'Referenser lämnas på begäran' i slutet av ditt CV. Ha dock en separat lista med referenser redo om arbetsgivaren ber om den.",
  },
]

const cvTemplates = [
  {
    id: "elegant",
    name: "Elegant",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elegant%20preview%20lila-4oQxxFwA3ufQe4fOQ41tZnZdnSPPmt.png",
    alt: "Elegant CV mall",
  },
  {
    id: "lyxig",
    name: "Lyxig",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lyxig%20preview%20svart-QDhvZHVFvTYWMCJcPak5CTCCcfSRyK.png",
    alt: "Lyxig CV mall",
  },
  {
    id: "standard",
    name: "Standard",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/standard%20preview-VSOYHTSzrlcj4bav3G6uSO8mLKamNL.png",
    alt: "Standard CV mall",
  },
]

export const metadata = {
  title: "CVfixaren.se - Skapa professionella CV på minuter",
  description:
    "Använd våra expertgranskade CV-mallar som följer arbetsgivarnas önskemål. Enkelt, snabbt och professionellt - skapa ditt CV på minuter. Börja gratis idag!",
  alternates: {
    canonical: "https://cvfixaren.se",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container px-4 py-16 md:py-24 pb-0">
          <div className="text-center space-y-4 mb-16">
            <h1 className={`${roboto.className} text-3xl md:text-[3.36rem] font-bold`}>
              Bara 2% av alla CV:n går vidare. Var en av dem.
            </h1>
            <p className={`${roboto.className} text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto`}>
              Använd våra expertgranskade CV-mallar som följer arbetsgivarnas önskemål. Enkelt, snabbt och
              professionellt - skapa ditt CV på minuter. Börja gratis idag!
            </p>
            <Link href="/profil/skapa-cv">
              <Button size="lg" className="mt-8 bg-[#00bf63] hover:bg-[#00a857] text-white">
                Skapa ditt CV nu
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-[1800px] mx-auto aspect-[4/1] mb-0 mt-16">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Namnl%C3%B6s%20%282000%20x%20500%20px%29-Yxqjp3R1HILswifDnCFBvutjvd2434.png"
              alt="CV mallar i olika stilar och färger"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </section>

        <Section background="gray">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Varför välja CVfixaren.se?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Professionella mallar</h3>
              <p>Våra mallar är designade av experter för att hjälpa dig sticka ut från mängden.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Enkelt att använda</h3>
              <p>Vår användarvänliga plattform gör det enkelt att skapa ett imponerande CV på kort tid.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">ATS-vänligt</h3>
              <p>Våra CV:n är optimerade för att passera Applicant Tracking Systems (ATS).</p>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Så här fungerar det</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-[#00bf63] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step === 1 && "Välj en mall"}
                  {step === 2 && "Fyll i din information"}
                  {step === 3 && "Anpassa designen"}
                  {step === 4 && "Ladda ner och använd"}
                </h3>
                <p>
                  {step === 1 && "Bläddra igenom vårt urval av professionella mallar och välj den som passar dig bäst."}
                  {step === 2 && "Lägg till dina personuppgifter, arbetslivserfarenhet, utbildning och färdigheter."}
                  {step === 3 && "Justera färger, typsnitt och layout för att göra ditt CV unikt."}
                  {step === 4 && "Ladda ner ditt färdiga CV i PDF-format och börja söka jobb!"}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section background="white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Våra populäraste CV-mallar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cvTemplates.map((template) => (
              <CVTemplateCard
                key={template.id}
                templateId={template.id}
                templateName={template.name}
                imageSrc={template.imageSrc}
                alt={template.alt}
              />
            ))}
          </div>
        </Section>

        <Section background="gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Vanliga frågor</h2>
          <FAQ items={faqItems} />
        </Section>

        <Section background="gray">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Redo att skapa ditt professionella CV nu?</h2>
            <Link href="/profil/skapa-cv">
              <Button size="lg" className="bg-[#00bf63] hover:bg-[#00a857] text-white">
                Skapa ditt CV nu
              </Button>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
