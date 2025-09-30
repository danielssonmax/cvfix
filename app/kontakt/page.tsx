import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: "Kontakta oss | CVfixaren.se",
  description:
    "Har du frågor eller feedback? Kontakta oss på CVfixaren.se. Vi är här för att hjälpa dig med ditt CV-skapande.",
  alternates: {
    canonical: "https://cvfixaren.se/kontakt",
  },
}

export default function KontaktPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Kontakt", href: "/kontakt" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Kontakta oss</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Har du frågor, feedback eller behöver du hjälp? Tveka inte att kontakta oss. Vi strävar efter att svara på
              alla förfrågningar inom 24 timmar.
            </p>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">E-post</h2>
                <p>support@cvfixaren.se</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Telefon</h2>
                <p>08-123 45 67</p>
                <p className="text-sm text-gray-600">Mån-Fre, 09:00-17:00</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Adress</h2>
                <p>CVfixaren AB</p>
                <p>Storgatan 1</p>
                <p>123 45 Stockholm</p>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Namn</Label>
                <Input id="name" placeholder="Ditt namn" />
              </div>
              <div>
                <Label htmlFor="email">E-post</Label>
                <Input id="email" type="email" placeholder="din.epost@exempel.se" />
              </div>
              <div>
                <Label htmlFor="subject">Ämne</Label>
                <Input id="subject" placeholder="Vad gäller din förfrågan?" />
              </div>
              <div>
                <Label htmlFor="message">Meddelande</Label>
                <Textarea id="message" placeholder="Skriv ditt meddelande här" rows={5} />
              </div>
              <Button type="submit">Skicka meddelande</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
