import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata = {
  title: "Användarvillkor | CVfixaren.se",
  description:
    "Läs våra användarvillkor för att förstå dina rättigheter och skyldigheter när du använder CVfixaren.se.",
  alternates: {
    canonical: "https://cvfixaren.se/anvandarvillkor",
  },
}

export default function AnvandarvillkorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Användarvillkor", href: "/anvandarvillkor" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Användarvillkor</h1>
        <div className="prose max-w-none">
          <p>Välkommen till CVfixaren.se. Genom att använda vår tjänst godkänner du följande användarvillkor:</p>

          <h2>1. Användning av tjänsten</h2>
          <p>
            CVfixaren.se erbjuder verktyg för att skapa och redigera CV:n. Du får använda dessa verktyg för personligt
            bruk och för att skapa CV:n för dig själv.
          </p>

          <h2>2. Användarinnehåll</h2>
          <p>
            Du ansvarar för all information du lägger in i ditt CV. Se till att informationen är korrekt och att du har
            rätt att använda den.
          </p>

          <h2>3. Immateriella rättigheter</h2>
          <p>
            CVfixaren.se äger alla rättigheter till plattformen och dess design. Du äger rättigheterna till innehållet i
            ditt CV.
          </p>

          <h2>4. Ansvarsbegränsning</h2>
          <p>
            Vi strävar efter att tillhandahålla en pålitlig tjänst, men kan inte garantera att den alltid fungerar
            felfritt. Vi ansvarar inte för eventuella förluster till följd av användning av vår tjänst.
          </p>

          <h2>5. Ändringar i villkoren</h2>
          <p>
            Vi förbehåller oss rätten att ändra dessa villkor. Större ändringar kommer att meddelas via e-post eller på
            vår webbplats.
          </p>

          <h2>6. Kontakt</h2>
          <p>Om du har frågor om dessa villkor, vänligen kontakta oss via vår kontaktsida.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
