import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Vanliga frågor | CVfixaren.se",
  description:
    "Hitta svar på de vanligaste frågorna om hur du använder CVfixaren.se för att skapa ditt professionella CV.",
}

export default function VanligaFragorPage() {
  const faqs = [
    {
      question: "Hur skapar jag ett CV på CVfixaren.se?",
      answer:
        "För att skapa ett CV, börja med att klicka på 'Skapa CV' på startsidan. Välj en mall som passar dig, och följ sedan stegen för att fylla i din information. Du kan enkelt redigera och anpassa ditt CV efter dina behov.",
    },
    {
      question: "Är det gratis att använda CVfixaren.se?",
      answer:
        "Vi erbjuder både gratis och premium-funktioner. Du kan skapa ett grundläggande CV utan kostnad, men för tillgång till alla mallar och avancerade funktioner krävs ett premium-konto.",
    },
    {
      question: "Kan jag ladda ner mitt CV som PDF?",
      answer:
        "Ja, när du är klar med ditt CV kan du enkelt ladda ner det som en PDF-fil. Detta gör det enkelt att skicka ditt CV till potentiella arbetsgivare eller dela det online.",
    },
    {
      question: "Hur ofta kan jag uppdatera mitt CV?",
      answer:
        "Du kan uppdatera ditt CV så ofta du vill. Vi rekommenderar att du håller ditt CV uppdaterat med din senaste erfarenhet och kompetenser.",
    },
    {
      question: "Är mina personuppgifter säkra på CVfixaren.se?",
      answer:
        "Vi tar datasäkerhet på största allvar. All information du anger krypteras och lagras säkert. Vi delar aldrig dina personuppgifter med tredje part utan ditt samtycke. För mer information, se vår integritetspolicy.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Vanliga frågor", href: "/vanliga-fragor" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Vanliga frågor</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  )
}
