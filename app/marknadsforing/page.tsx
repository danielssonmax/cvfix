import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata = {
  title: "Marknadsföringspolicy | CVfixaren.se",
  description: "Läs om hur vi hanterar marknadsföring och kommunikation med våra användare på CVfixaren.se.",
}

export default function MarknadsforingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Marknadsföringspolicy", href: "/marknadsforing" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Marknadsföringspolicy</h1>
        <div className="prose max-w-none">
          <p>
            På CVfixaren.se värnar vi om din integritet och strävar efter att vara transparenta med hur vi kommunicerar
            med dig. Här är vår marknadsföringspolicy:
          </p>

          <h2>1. E-postkommunikation</h2>
          <p>
            Vi kan skicka e-post till dig gällande din användning av tjänsten, såsom bekräftelser och påminnelser. Du
            kan också välja att prenumerera på vårt nyhetsbrev för tips och uppdateringar.
          </p>

          <h2>2. Personaliserad marknadsföring</h2>
          <p>
            Vi kan använda information om din användning av tjänsten för att skräddarsy marknadsföring och
            rekommendationer till dig. Detta görs alltid i enlighet med vår integritetspolicy.
          </p>

          <h2>3. Sociala medier</h2>
          <p>
            Vi kan använda sociala medier för att marknadsföra våra tjänster. Om du interagerar med oss på sociala
            medier, kan vi använda denna information för att anpassa vår kommunikation.
          </p>

          <h2>4. Tredjepartsannonsering</h2>
          <p>
            Vi kan använda tredjepartsplattformar för annonsering. Dessa plattformar kan använda cookies och liknande
            teknologier för att visa relevanta annonser.
          </p>

          <h2>5. Avregistrering</h2>
          <p>
            Du kan när som helst välja att avregistrera dig från vår marknadsföringskommunikation. Varje e-post
            innehåller en länk för avregistrering.
          </p>

          <h2>6. Uppdateringar av policyn</h2>
          <p>
            Vi kan uppdatera denna policy från tid till annan. Större ändringar kommer att meddelas via e-post eller på
            vår webbplats.
          </p>

          <h2>7. Kontakt</h2>
          <p>Om du har frågor om vår marknadsföringspolicy, vänligen kontakta oss via vår kontaktsida.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
