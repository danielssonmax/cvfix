import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

// This would typically come from a CMS or database
const blogPosts = {
  "sa-skriver-du-ett-cv-som-sticker-ut": {
    title: "Så skriver du ett CV som sticker ut",
    date: "2024-02-14",
    category: "CV-tips",
    excerpt:
      "Lär dig hur du skapar ett CV som fångar rekryterarens uppmärksamhet och ökar dina chanser att få drömjobbet.",
    content: `
      <h2>Vad gör ett CV minnesvärt?</h2>
      <p>Ett effektivt CV är mer än bara en lista över dina tidigare jobb. Det är ditt personliga marknadsföringsverktyg som ska fånga rekryterarens uppmärksamhet på några sekunder. Här är några nyckelelement som gör ditt CV minnesvärt:</p>
      
      <h3>1. En stark profil</h3>
      <p>Börja med en koncis och slagkraftig profilbeskrivning som sammanfattar dina främsta styrkor och vad du kan tillföra. Detta är din "elevator pitch" – gör den minnesvärd!</p>

      <h3>2. Kvantifierbara resultat</h3>
      <p>Istället för att bara lista arbetsuppgifter, fokusera på konkreta resultat. Använd siffror och statistik när det är möjligt. Till exempel: "Ökade försäljningen med 45% under första kvartalet" eller "Ledde ett team på 12 personer".</p>

      <h3>3. Relevant nyckelkompetens</h3>
      <p>Anpassa dina färdigheter efter jobbet du söker. Använd relevanta branschspecifika nyckelord som matchar jobbannonsen, men var ärlig med din kompetensnivå.</p>

      <h2>Formatering och layout</h2>
      <p>Ett professionellt utseende är avgörande. Här är viktiga formateringsprinciper:</p>
      <ul>
        <li>Använd konsekvent formatering genom hela dokumentet</li>
        <li>Välj ett lättläst typsnitt som Arial eller Calibri</li>
        <li>Använd rubriker och underrubriker för att skapa struktur</li>
        <li>Lämna tillräckligt med vitrum för att göra innehållet luftigt</li>
      </ul>

      <h2>Anpassa efter tjänsten</h2>
      <p>Ett framgångsrikt CV är skräddarsytt för den specifika tjänsten du söker. Analysera jobbannonsen noga och lyft fram de erfarenheter och kompetenser som är mest relevanta för positionen.</p>

      <h2>Språk och ton</h2>
      <p>Använd ett professionellt men personligt språk. Undvik klyschor och fokusera istället på att beskriva dina prestationer och färdigheter på ett konkret sätt. Var koncis men informativ.</p>

      <h2>Avslutande tips</h2>
      <p>Kom ihåg att ditt CV är ditt första intryck hos en potentiell arbetsgivare. Ta dig tid att finslipa det, be andra om feedback, och var inte rädd för att visa din unika personlighet. Med dessa tips är du på god väg att skapa ett CV som verkligen sticker ut från mängden.</p>
    `,
  },
  "5-vanliga-misstag-att-undvika": {
    title: "5 vanliga misstag att undvika i ditt CV",
    date: "2024-02-10",
    category: "CV-tips",
    excerpt:
      "Undvik dessa vanliga fallgropar när du skriver ditt CV för att maximera dina chanser att få jobbet du söker.",
    content: `
      <h2>Inledning</h2>
      <p>Att skriva ett CV kan vara utmanande, och även små misstag kan kosta dig möjligheten till en intervju. Här är fem vanliga misstag som du bör undvika när du skapar ditt CV:</p>

      <h3>1. Att använda en generisk mall utan anpassning</h3>
      <p>Ett av de största misstagen är att skicka samma generiska CV till alla jobb du söker. Varje CV bör vara skräddarsytt för den specifika tjänsten och företaget. Ta tid att anpassa ditt CV för varje ansökan genom att lyfta fram relevanta erfarenheter och färdigheter som matchar jobbbeskrivningen.</p>

      <h3>2. Stavfel och grammatiska misstag</h3>
      <p>Inget skriker "bristande uppmärksamhet på detaljer" som ett CV fullt av stavfel och grammatiska misstag. Dessa enkla fel kan snabbt få en rekryterare att lägga ditt CV i "nej"-högen. Korrekturläs alltid ditt CV noggrant och be gärna någon annan att gå igenom det också.</p>

      <h3>3. Överdriven längd och irrelevant information</h3>
      <p>Ett CV bör vara koncist och relevant. Att inkludera för mycket information eller irrelevanta detaljer kan göra det svårt för rekryteraren att hitta den viktiga informationen. Fokusera på de mest relevanta erfarenheterna och prestationerna för jobbet du söker. För de flesta är 1-2 sidor tillräckligt.</p>

      <h3>4. Att utelämna nyckelord från jobbannonsen</h3>
      <p>Många företag använder ATS (Applicant Tracking Systems) för att screena CV:n. Om ditt CV saknar viktiga nyckelord från jobbannonsen kan det filtreras bort innan en mänsklig rekryterare ens ser det. Se till att inkludera relevanta termer och färdigheter som nämns i jobbannonsen, förutsatt att du faktiskt besitter dessa färdigheter.</p>

      <h3>5. Att ljuga eller överdriva</h3>
      <p>Det kan vara frestande att överdriva dina prestationer eller till och med ljuga om din erfarenhet, men detta är ett allvarligt misstag. Lögner kommer ofta fram under bakgrundskontroller eller intervjuer, vilket kan skada din trovärdighet och dina chanser att få jobbet. Var ärlig och fokusera istället på att presentera dina faktiska styrkor på bästa sätt.</p>

      <h2>Sammanfattning</h2>
      <p>Genom att undvika dessa vanliga misstag kan du skapa ett starkare och mer effektivt CV. Kom ihåg att ditt CV är ditt första intryck hos en potentiell arbetsgivare. Ta dig tid att göra det rätt, var ärlig, relevant och noggrann. Med ett välskrivet CV ökar du dina chanser att få den intervju du strävar efter.</p>
    `,
  },
  "personligt-brev-guide": {
    title: "Personligt brev - En komplett guide",
    date: "2024-02-05",
    category: "Personligt brev",
    excerpt:
      "Lär dig skriva ett övertygande personligt brev som kompletterar ditt CV och ökar dina chanser att få jobbet.",
    content: `
      <h2>Vad är ett personligt brev?</h2>
      <p>Ett personligt brev är ett dokument som kompletterar ditt CV i en jobbansökan. Medan CV:t ger en översikt över din karriär och kompetenser, ger det personliga brevet dig möjlighet att förklara varför du är den perfekta kandidaten för jobbet och vad som motiverar dig att söka tjänsten.</p>

      <h2>Struktur och innehåll</h2>
      <h3>1. Inledning</h3>
      <p>Börja med en stark öppning som fångar läsarens uppmärksamhet. Nämn vilken tjänst du söker och var du hittade annonsen. Visa entusiasm för företaget och positionen.</p>

      <h3>2. Varför du?</h3>
      <p>Förklara varför du är den rätta personen för jobbet. Koppla dina färdigheter och erfarenheter till kraven i jobbannonsen. Använd konkreta exempel på hur du har använt dessa färdigheter i tidigare roller.</p>

      <h3>3. Varför företaget?</h3>
      <p>Visa att du har gjort din research. Berätta varför du är intresserad av just detta företag och denna roll. Koppla dina värderingar och karriärmål till företagets mission och kultur.</p>

      <h3>4. Avslutning</h3>
      <p>Avsluta starkt genom att sammanfatta ditt intresse och din lämplighet för tjänsten. Uttryck din önskan om en intervju och tacka för deras tid och övervägande.</p>

      <h2>Tips för ett övertygande personligt brev</h2>
      <ul>
        <li>Anpassa varje brev till den specifika tjänsten och företaget</li>
        <li>Håll det koncist - sikta på cirka en A4-sida</li>
        <li>Använd ett professionellt men personligt språk</li>
        <li>Fokusera på vad du kan göra för företaget, inte bara vad du vill ha från dem</li>
        <li>Använd konkreta exempel för att stödja dina påståenden</li>
        <li>Korrekturläs noggrant för att undvika stavfel och grammatiska misstag</li>
      </ul>

      <h2>Vanliga misstag att undvika</h2>
      <ul>
        <li>Att upprepa information som redan finns i ditt CV</li>
        <li>Att använda en generisk mall utan anpassning</li>
        <li>Att fokusera för mycket på dig själv och inte tillräckligt på företaget</li>
        <li>Att överdriva eller ljuga om dina kvalifikationer</li>
        <li>Att glömma att inkludera dina kontaktuppgifter</li>
      </ul>

      <h2>Avslutande ord</h2>
      <p>Ett välskrivet personligt brev kan vara avgörande för att få dig kallad till intervju. Genom att följa denna guide och lägga tid på att skräddarsy ditt brev för varje ansökan, ökar du dina chanser att sticka ut från mängden och fånga rekryterarens intresse. Kom ihåg att ditt personliga brev är din chans att berätta din historia och visa varför du är den perfekta kandidaten för jobbet.</p>
    `,
  },
  "linkedin-profil-optimering": {
    title: "LinkedIn-profil som kompletterar ditt CV",
    date: "2024-02-03",
    category: "Karriärtips",
    excerpt:
      "Lär dig hur du optimerar din LinkedIn-profil för att stärka ditt personliga varumärke och öka dina chanser att bli upptäckt av rekryterare.",
    content: `
      <h2>Varför är LinkedIn viktigt?</h2>
      <p>LinkedIn har blivit en oumbärlig plattform för professionell networking och jobbsökning. En väloptimerad LinkedIn-profil kan komplettera ditt CV och ge rekryterare en mer omfattande bild av din professionella identitet. Här är hur du kan optimera din LinkedIn-profil för att maximera dina karriärmöjligheter:</p>

      <h2>1. Profilbild och bakgrundsbild</h2>
      <p>Din profilbild är ditt första intryck. Använd en professionell bild där du ler och ser tillgänglig ut. Bakgrundsbilden kan användas för att visa din bransch eller personlighet. Båda bör vara av hög kvalitet och relevanta för din professionella image.</p>

      <h2>2. Rubrik</h2>
      <p>Din rubrik är mer än bara din jobbtitel. Använd de 120 tecknen för att beskriva din expertis och vad du kan erbjuda. Inkludera relevanta nyckelord för att öka dina chanser att dyka upp i sökresultat.</p>

      <h2>3. Om-sektion</h2>
      <p>Detta är din chans att berätta din professionella historia. Beskriv dina färdigheter, erfarenheter och vad som driver dig. Var personlig men professionell, och inkludera nyckelord som är relevanta för din bransch och önskade roll.</p>

      <h2>4. Arbetslivserfarenhet</h2>
      <p>Lista dina tidigare och nuvarande jobb. För varje position, beskriv dina huvudsakliga ansvarsområden och prestationer. Använd action verbs och kvantifiera dina resultat när möjligt. Detta bör spegla informationen i ditt CV, men du kan lägga till mer detaljer här.</p>

      <h2>5. Utbildning</h2>
      <p>Inkludera all relevant utbildning, certifieringar och kurser. Detta visar din kompetens och vilja att lära och utvecklas.</p>

      <h2>6. Färdigheter och rekommendationer</h2>
      <p>Lista dina viktigaste färdigheter och be kollegor och chefer att rekommendera dig för dessa. Detta ger trovärdighet till dina påståenden och stärker din profil.</p>

      <h2>7. Engagemang och aktivitet</h2>
      <p>Var aktiv på LinkedIn. Dela relevant innehåll, kommentera på andras inlägg och delta i diskussioner i grupper. Detta ökar din synlighet och visar ditt engagemang i din bransch.</p>

      <h2>8. Anpassad URL</h2>
      <p>Skapa en anpassad URL för din LinkedIn-profil. Detta ser mer professionellt ut och är lättare att dela, till exempel på ditt CV eller i din e-postsignatur.</p>

      <h2>9. Rekommendationer</h2>
      <p>Be om rekommendationer från kollegor, chefer eller klienter. Dessa personliga intyg ger en djupare inblick i dina professionella kvaliteter och prestationer. Sikta på att ha minst 3-5 starka rekommendationer som belyser olika aspekter av din kompetens.</p>

      <h2>10. Multimedia</h2>
      <p>Utnyttja möjligheten att lägga till multimedia till din profil. Detta kan inkludera presentationer, artiklar du har skrivit, eller projekt du har arbetat med. Visuellt innehåll kan göra din profil mer engagerande och ge konkreta exempel på ditt arbete.</p>

      <h2>Sammanfattning</h2>
      <p>En väloptimerad LinkedIn-profil är ett kraftfullt komplement till ditt CV. Den ger dig möjlighet att visa upp en mer nyanserad bild av din professionella identitet och kan öppna dörrar till nya möjligheter. Genom att regelbundet uppdatera och engagera dig på plattformen, bygger du ett starkt personligt varumärke som kan ge dig en konkurrensfördel i din karriär.</p>

      <p>Kom ihåg att din LinkedIn-profil är en levande representation av ditt professionella jag. Håll den uppdaterad, engagera dig aktivt, och använd den som ett verktyg för att bygga och underhålla ditt professionella nätverk. Med dessa tips är du på god väg att skapa en LinkedIn-profil som verkligen kompletterar och förstärker ditt CV.</p>
    `,
  },
  "arbetsintervju-fragor-och-svar": {
    title: "Arbetsintervju: Vanliga frågor och bästa svaren",
    date: "2024-01-28",
    category: "Intervjutips",
    excerpt:
      "Förbered dig inför din nästa arbetsintervju med våra expertråd på hur du bäst svarar på vanliga intervjufrågor.",
    content: `
      <h2>Förberedelse är nyckeln</h2>
      <p>Att vara väl förberedd inför en arbetsintervju kan göra hela skillnaden. Genom att känna till och öva på svar till vanliga intervjufrågor kan du känna dig mer självsäker och göra ett starkare intryck. Här är några av de vanligaste frågorna du kan förvänta dig, tillsammans med tips på hur du kan svara:</p>

      <h3>1. "Berätta lite om dig själv."</h3>
      <p>Detta är ofta öppningsfrågan och din chans att göra ett starkt första intryck. Fokusera på din professionella bakgrund och de erfarenheter som är mest relevanta för tjänsten. Håll det koncist, cirka 2-3 minuter, och avsluta med varför du är intresserad av denna specifika roll.</p>

      <h3>2. "Varför vill du jobba här?"</h3>
      <p>Visa att du har gjort din research. Prata om företagets värderingar, produkter eller tjänster som intresserar dig. Koppla dina egna mål och färdigheter till vad företaget gör och hur du kan bidra till deras framgång.</p>

      <h3>3. "Vad är dina styrkor och svagheter?"</h3>
      <p>För styrkor, välj egenskaper som är relevanta för jobbet och ge konkreta exempel på hur du har använt dessa i tidigare roller. För svagheter, var ärlig men välj något som inte är kritiskt för positionen och berätta hur du aktivt arbetar på att förbättra dig.</p>

      <h3>4. "Berätta om en utmaning du har övervunnit i ditt arbete."</h3>
      <p>Använd STAR-metoden (Situation, Task, Action, Result) för att strukturera ditt svar. Beskriv situationen, förklara din uppgift, detaljera de åtgärder du vidtog, och avsluta med resultatet. Välj ett exempel som visar din problemlösningsförmåga och anpassningsbarhet.</p>

      <h3>5. "Var ser du dig själv om fem år?"</h3>
      <p>Visa ambition och en vilja att växa inom företaget. Var realistisk och koppla dina mål till den position du söker och företagets möjligheter. Det är okej att inte ha en exakt plan, men visa att du har tänkt på din karriärutveckling.</p>

      <h3>6. "Varför lämnade du ditt förra jobb?"</h3>
      <p>Var ärlig men positiv. Fokusera på vad du söker i din nästa roll snarare än att klaga på din tidigare arbetsgivare. Om du blev uppsagd, var ärlig om situationen men betona vad du har lärt dig och hur du har vuxit sedan dess.</p>

      <h3>7. "Hur hanterar du stress och press?"</h3>
      <p>Ge konkreta exempel på strategier du använder för att hantera stress, som prioritering av uppgifter, tidshantering eller mindfulness-tekniker. Visa att du kan prestera under press genom att nämna en situation där du framgångsrikt hanterade en stressig deadline eller utmaning.</p>

      <h3>8. "Har du några frågor till oss?"</h3>
      <p>Ha alltid några väl genomtänkta frågor förberedda. Detta visar ditt intresse och engagemang. Fråga om företagskulturen, teamets utmaningar, eller möjligheter till professionell utveckling. Undvik frågor om lön och förmåner i detta skede om det inte tas upp av intervjuaren.</p>

      <h2>Generella tips för intervjusuccess</h2>
      <ul>
        <li>Öva dina svar högt för att känna dig mer bekväm</li>
        <li>Använd konkreta exempel från din erfarenhet när det är möjligt</li>
        <li>Var ärlig och autentisk i dina svar</li>
        <li>Visa entusiasm för rollen och företaget</li>
        <li>Lyssna noga på frågorna och be om förtydligande om något är oklart</li>
        <li>Följ upp efter intervjun med ett tackmail där du upprepar ditt intresse för positionen</li>
      </ul>

      <p>Kom ihåg att en intervju är en tvåvägskommunikation. Det är inte bara en chans för arbetsgivaren att utvärdera dig, utan också din möjlighet att bedöma om företaget och rollen är rätt för dig. Med god förberedelse och en positiv attityd ökar du dina chanser att göra ett starkt intryck och ta nästa steg i din karriär.</p>
    `,
  },
  "ai-och-framtidens-cv": {
    title: "AI och framtidens CV-skrivande",
    date: "2024-01-25",
    category: "Trender",
    excerpt:
      "Utforska hur artificiell intelligens förändrar sättet vi skapar och anpassar våra CV:n, och hur du kan dra nytta av denna teknologi i din jobbsökning.",
    content: `
      <h2>Introduktion till AI i CV-skrivande</h2>
      <p>Artificiell intelligens (AI) revolutionerar många aspekter av våra liv, och CV-skrivande är inget undantag. Från att optimera innehåll till att skräddarsy CV:n för specifika jobb, AI erbjuder nya möjligheter att förbättra hur vi presenterar oss för potentiella arbetsgivare. Låt oss utforska hur AI påverkar framtidens CV-skrivande och hur du kan dra nytta av denna teknologi.</p>

      <h2>Hur AI förändrar CV-skrivandet</h2>
      <h3>1. Personalisering och anpassning</h3>
      <p>AI-drivna verktyg kan analysera jobbannonser och automatiskt föreslå anpassningar till ditt CV för att bättre matcha specifika jobbkrav. Detta inkluderar att lyfta fram relevanta färdigheter och erfarenheter baserat på nyckelord i jobbannonsen.</p>

      <h3>2. Optimering av nyckelord</h3>
      <p>Många företag använder ATS (Applicant Tracking Systems) för att screena CV:n. AI kan hjälpa till att identifiera och inkludera relevanta nyckelord som ökar chanserna att ditt CV passerar den initiala screeningen.</p>

      <h3>3. Förbättrad formulering</h3>
      <p>AI-verktyg kan föreslå förbättringar i språk och formuleringar, vilket hjälper till att göra ditt CV mer övertygande och professionellt. Detta kan inkludera förslag på starkare action verbs och mer koncisa beskrivningar av dina prestationer.</p>

      <h3>4. Datadriven insikt</h3>
      <p>Genom att analysera stora mängder CV:n och jobbansökningar kan AI ge insikter om trender inom din bransch, vilka färdigheter som är mest efterfrågade, och hur du kan positionera dig bättre på arbetsmarknaden.</p>

      <h2>Fördelar med AI i CV-skrivande</h2>
      <ul>
        <li>Tidsbesparande: AI kan snabbt generera utkast och förslag, vilket sparar tid i CV-skapandet.</li>
        <li>Ökad relevans: Genom att anpassa innehållet till specifika jobb ökar chanserna att ditt CV fångar rekryterarens uppmärksamhet.</li>
        <li>Kontinuerlig förbättring: AI-verktyg lär sig och förbättras över tid, vilket innebär att rekommendationerna blir allt mer sofistikerade.</li>
        <li>Objektiv feedback: AI kan ge opartisk feedback på ditt CV, vilket hjälper dig att identifiera områden för förbättring.</li>
      </ul>

      <h2>Utmaningar och etiska överväganden</h2>
      <p>Medan AI erbjuder många fördelar, finns det också utmaningar att vara medveten om:</p>
      <ul>
        <li>Överanvändning kan leda till generiska CV:n som saknar personlighet.</li>
        <li>Risk för bias i AI-algoritmer som kan påverka rekommendationerna.</li>
        <li>Etiska frågor kring användningen av AI-genererat innehåll i professionella sammanhang.</li>
      </ul>

      <h2>Hur du kan dra nytta av AI i ditt CV-skrivande</h2>
      <ol>
        <li>Använd AI-verktyg för initial brainstorming och strukturering av ditt CV.</li>
        <li>Utnyttja AI för att identifiera relevanta nyckelord från jobbannonser.</li>
        <li>Låt AI ge förslag på förbättringar i språk och formuleringar, men behåll din personliga röst.</li>
        <li>Använd AI-genererade insikter för att förstå trender inom din bransch och anpassa ditt CV därefter.</li>
        <li>Kombinera AI-rekommendationer med mänsklig kreativitet och omdöme för bästa resultat.</li>
      </ol>

      <h2>Framtidsutsikter</h2>
      <p>I framtiden kan vi förvänta oss ännu mer sofistikerade AI-verktyg för CV-skrivande. Detta kan inkludera:</p>
      <ul>
        <li>Interaktiva CV:n som anpassar sig i realtid baserat på läsarens interaktioner.</li>
        <li>AI-driven karriärrådgivning som integreras med CV-skapande.</li>
        <li>Förbättrad visualisering av kompetenser och erfarenheter genom AI-genererade infografiker.</li>
      </ul>

      <h2>Slutsats</h2>
      <p>AI är på väg att revolutionera hur vi skapar och anpassar våra CV:n. Genom att förstå och utnyttja dessa verktyg klokt kan du förbättra dina chanser att sticka ut i en konkurrensutsatt arbetsmarknad. Kom ihåg att AI är ett verktyg för att förbättra ditt CV, inte ersätta din unika röst och erfarenhet. Använd AI som ett komplement till din egen kreativitet och professionella omdöme för att skapa ett CV som verkligen representerar dig och dina färdigheter.</p>
    `,
  },
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Inlägg hittades inte | CVfixaren.se",
    }
  }

  return {
    title: `${post.title} | CVfixaren.se`,
    description: post.excerpt,
    alternates: {
      canonical: `https://cvfixaren.se/blogg/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "Blogg", href: "/blogg" },
              { label: post.title, href: `/blogg/${params.slug}` },
            ]}
          />

          <article className="max-w-4xl mx-auto mt-8">
            <div className="mb-8">
              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <time className="text-gray-500">{post.date}</time>
            </div>

            <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-12 pt-8 border-t">
              <Link href="/cv-mall">
                <Button className="bg-[#00bf63] hover:bg-[#00a857] text-white">Skapa ditt CV nu</Button>
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
