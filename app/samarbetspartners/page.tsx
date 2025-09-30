import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Handshake } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Samarbetspartners | CVfixaren.se",
  description: "Lär känna våra samarbetspartners som vi rekommenderar. Upptäck kvalitetstjänster inom olika branscher.",
  alternates: {
    canonical: "https://cvfixaren.se/samarbetspartners",
  },
}

const partners = [
  {
    id: 1,
    name: "Webbyrå",
    description: "Webbyrå i Eskilstuna.",
    category: "Webb",
    website: "https://webbfix.se",
  },
  {
    id: 2,
    name: "Static Ad Templates",
    description: "Skapa annonser med mallar som redan är validerade.",
    category: "Marknadsföring",
    website: "https://staticadtemplates.com",
  },
  {
    id: 3,
    name: "Leasa Begagnad Bil",
    description: "Hitta en leasingbil till begagnad pris och spara tusentals kronor i månaden.",
    category: "Fordon",
    website: "https://leasabegagnadbil.se",
  },
  {
    id: 4,
    name: "Klockor",
    description: "Hitta din exklusiva klocka på nätet.",
    category: "Mode & Accessoarer",
    website: "https://seiko-mod.se",
  },
  {
    id: 5,
    name: "Mäklare",
    description: "Jämför Mäklare i Sverige.",
    category: "Fastighet",
    website: "https://jamfor-maklare.se",
  },
  {
    id: 6,
    name: "Verkstad",
    description: "Bilverkstad i Eskilstuna.",
    category: "Fordon",
    website: "https://bilverkstadeskilstuna.se",
  },
  {
    id: 7,
    name: "Hemrenovering",
    description: "Plattsättare i Eskilstuna.",
    category: "Byggentreprenad",
    website: "https://byggoplattsattning.se",
  },
  {
    id: 8,
    name: "Elektriker",
    description: "Elektriker i Eskilstuna.",
    category: "Byggentreprenad",
    website: "https://tornstrandelteknikab.se",
  },
  {
    id: 9,
    name: "Mode",
    description: "Underkläder på nätet.",
    category: "Mode & Accessoarer",
    website: "https://glammeringbh.se",
  },
  {
    id: 10,
    name: "Webb",
    description: "Webbyrå i Eskilstuna.",
    category: "Webb",
    website: "https://webbfix.se",
  },
  {
    id: 11,
    name: "Marknadsbyrå",
    description: "Marknadsföring som levererar riktiga resultat.",
    category: "Marknadsföring",
    website: "https://leapmarketing.se",
  },
  {
    id: 12,
    name: "Motorsport",
    description: "Reservdelar och tillbehör till MX & Enduro.",
    category: "Fordon",
    website: "https://alunsmotor.se",
  },
  {
    id: 13,
    name: "Old Money Kläder",
    description: "Old money mode för både herr och dam.",
    category: "Mode & Accessoarer",
    website: "https://old-money.se",
  },
  {
    id: 14,
    name: "Dold-Adress",
    description: "Dold adress, dölj dina uppgifter online.",
    category: "Tjänster",
    website: "https://dold-adress.se",
  },
  {
    id: 15,
    name: "Seikomodwatches",
    description: "Buy seikomodwatches.",
    category: "Mode & Accessoarer",
    website: "https://seikomodwatches.store",
  },
  {
    id: 16,
    name: "Fairing Sports Nutrition",
    description: "Kosttillskott på nätet.",
    category: "Hälsa & Träning",
    website: "https://fairing.se",
  },
  {
    id: 17,
    name: "Bostadshunden",
    description: "Bostäder.",
    category: "Fastighet",
    website: "https://www.bostadshunden.se",
  },
  {
    id: 18,
    name: "AI Mallar",
    description: "Lär dig AI.",
    category: "Utbildning",
    website: "https://aimallar.se",
  },
  {
    id: 19,
    name: "JSS Entreprenad",
    description: "Entreprenad i Rejmyre.",
    category: "Byggentreprenad",
    website: "https://jssentreprenad.se",
  },
  {
    id: 20,
    name: "Bostadscentralen",
    description: "Hitta din nästa bostad enkelt och smidigt.",
    category: "Fastighet",
    website: "https://www.bostadscentralen.se",
  },
  {
    id: 21,
    name: "Rockbeds",
    description: "Kvalitetssängar och sovlösningar för bättre sömn.",
    category: "Möbler & Inredning",
    website: "https://rockbeds.se",
  },
  {
    id: 22,
    name: "Proteinstore",
    description: "Proteinpulver och kosttillskott för din träning.",
    category: "Hälsa & Träning",
    website: "https://proteinstore.se",
  },
]

export default function SamarbetspartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Samarbetspartners", href: "/samarbetspartners" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Våra Samarbetspartners</h1>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Vi samarbetar med ett antal kvalitetsföretag inom olika branscher. Här hittar du våra rekommenderade
            partners som erbjuder tjänster och produkter av högsta kvalitet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{partner.name}</CardTitle>
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs mb-2">
                      {partner.category}
                    </span>
                  </div>
                  <Handshake className="h-6 w-6 text-[#00bf63] flex-shrink-0 ml-2" />
                </div>
                <CardDescription>{partner.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#00bf63] hover:text-[#00a857] font-medium transition-colors"
                >
                  Besök webbplats
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Vill du bli vår partner?</h2>
          <p className="text-gray-600 mb-4">
            Vi är alltid intresserade av att samarbeta med kvalitetsföretag som delar våra värderingar. Kontakta oss för
            att diskutera möjliga samarbeten.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-[#00bf63] hover:bg-[#00a857] text-white px-6 py-2 rounded-md transition-colors"
          >
            Kontakta oss
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
