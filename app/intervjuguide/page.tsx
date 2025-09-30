import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Intervjuguide | CVfixaren.se",
  description:
    "Förbered dig för din nästa jobbintervju med vår omfattande guide. Få tips, vanliga frågor och strategier för att göra ett starkt intryck.",
  alternates: {
    canonical: "https://cvfixaren.se/intervjuguide",
  },
}

export default function IntervjuguidePage() {
  const commonQuestions = [
    {
      question: "Kan du berätta lite om dig själv?",
      answer:
        "Detta är ofta den första frågan i en intervju. Förbered en koncis presentation av din professionella bakgrund, dina främsta styrkor och varför du är intresserad av positionen. Håll det relevant och anpassa ditt svar till jobbet du söker.",
    },
    {
      question: "Varför vill du jobba hos oss?",
      answer:
        "Visa att du har gjort din research. Prata om företagets värderingar, produkter eller tjänster som intresserar dig. Koppla dina egna mål och färdigheter till vad företaget gör och hur du kan bidra.",
    },
    {
      question: "Vad är dina styrkor och svagheter?",
      answer:
        "För styrkor, fokusera på egenskaper som är relevanta för jobbet och ge konkreta exempel. För svagheter, var ärlig men välj något som inte är kritiskt för positionen och berätta hur du arbetar på att förbättra dig.",
    },
    {
      question: "Var ser du dig själv om fem år?",
      answer:
        "Visa ambition och en vilja att växa inom företaget. Var realistisk och koppla dina mål till den position du söker och företagets möjligheter.",
    },
    {
      question: "Berätta om en utmaning du har övervunnit i ditt arbete.",
      answer:
        "Använd STAR-metoden (Situation, Task, Action, Result) för att strukturera ditt svar. Välj en relevant utmaning och fokusera på de åtgärder du vidtog och det positiva resultatet.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Intervjuguide", href: "/intervjuguide" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Intervjuguide</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Förberedelser inför intervjun</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Researcha företaget grundligt - förstå deras verksamhet, kultur och senaste nyheter</li>
            <li>Granska jobbannonsen noga och matcha dina erfarenheter mot kraven</li>
            <li>Förbered konkreta exempel på dina färdigheter och prestationer</li>
            <li>Öva på att presentera dig själv och dina kvalifikationer koncist</li>
            <li>Förbered frågor till intervjuaren om företaget och positionen</li>
            <li>Planera din resa till intervjun och kom i god tid</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Under intervjun</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Var punktlig och klä dig lämpligt för företagskulturen</li>
            <li>Visa entusiasm och positiv energi</li>
            <li>Lyssna aktivt och ställ relevanta följdfrågor</li>
            <li>Använd konkreta exempel för att illustrera dina färdigheter</li>
            <li>Var ärlig och autentisk i dina svar</li>
            <li>Håll en professionell ton genom hela intervjun</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vanliga intervjufrågor och hur du besvarar dem</h2>
          <Accordion type="single" collapsible className="w-full">
            {commonQuestions.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Efter intervjun</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Skicka ett tackmail inom 24 timmar efter intervjun</li>
            <li>I tackbrevet, upprepa ditt intresse för positionen och företaget</li>
            <li>Om du kommer på något viktigt du glömde nämna, ta upp det kortfattat i tackbrevet</li>
            <li>Följ upp enligt den tidplan som diskuterades under intervjun</li>
            <li>Reflektera över intervjun och notera områden för förbättring till framtida intervjuer</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Avslutande tips</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Var dig själv - autenticitet uppskattas av de flesta arbetsgivare</li>
            <li>
              Se intervjun som en tvåvägskommunikation - det är också din chans att utvärdera om företaget och rollen
              passar dig
            </li>
            <li>Öva, öva, öva - ju mer du förbereder dig, desto mer självsäker kommer du att känna dig</li>
            <li>Kom ihåg att nervositet är normalt - använd det som energi för att prestera bättre</li>
            <li>Var beredd på oväntade frågor - tänk snabbt och var ärlig i dina svar</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
