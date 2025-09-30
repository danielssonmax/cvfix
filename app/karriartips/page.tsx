import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"

export const metadata = {
  title: "Karriärtips | CVfixaren.se",
  description: "Få värdefulla karriärtips och råd för att lyckas i din jobbsökning och professionella utveckling.",
  alternates: {
    canonical: "https://cvfixaren.se/karriartips",
  },
}

export default function KarriarTipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Karriärtips", href: "/karriartips" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Karriärtips</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Optimera ditt CV</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Anpassa ditt CV för varje jobb du söker</li>
              <li>Använd nyckelord från jobbannonsen</li>
              <li>Framhäv dina prestationer med konkreta exempel</li>
              <li>Håll det koncist och relevant</li>
              <li>Använd en professionell och lättläst layout</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nätverka effektivt</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Bygg upp din LinkedIn-profil</li>
              <li>Delta i branschevenemang och konferenser</li>
              <li>Engagera dig i relevanta online-forum och grupper</li>
              <li>Följ upp med kontakter regelbundet</li>
              <li>Var generös med att dela kunskap och hjälpa andra</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Utveckla dina färdigheter</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Identifiera efterfrågade kompetenser i din bransch</li>
              <li>Ta online-kurser eller certifieringar</li>
              <li>Läs branschrelevanta böcker och artiklar</li>
              <li>Sök mentorskap från erfarna professionella</li>
              <li>Arbeta på sidoprojekt för att bygga praktisk erfarenhet</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Hantera din karriärutveckling</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Sätt tydliga kortsiktiga och långsiktiga mål</li>
              <li>Sök regelbunden feedback från chefer och kollegor</li>
              <li>Var öppen för nya möjligheter och utmaningar</li>
              <li>Balansera arbete och privatliv för långsiktig framgång</li>
              <li>Reflektera regelbundet över din karriärväg och justera vid behov</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Förbered dig för jobbintervjuer</h2>
          <p className="mb-4">
            Att vara väl förberedd inför en jobbintervju kan göra stor skillnad. Här är några snabba tips:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Researcha företaget och positionen noggrant</li>
            <li>Förbered svar på vanliga intervjufrågor</li>
            <li>Ha konkreta exempel på dina färdigheter och erfarenheter redo</li>
            <li>Förbered egna frågor till intervjuaren</li>
            <li>Öva på att presentera dig själv koncist och övertygande</li>
          </ul>
          <p>
            För mer detaljerade råd om hur du kan lyckas i jobbintervjuer, kolla in vår{" "}
            <Link href="/intervjuguide" className="text-blue-600 hover:underline">
              intervjuguide
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
