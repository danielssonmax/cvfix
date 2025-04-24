import type { Metadata } from "next"
import CVMallClient from "./CVMallClient"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Skapa ditt CV | CVfixaren.se",
  description: "Använd vår CV-mall för att skapa ett professionellt CV som sticker ut. Enkelt, snabbt och effektivt.",
}

export default function CVMallPage({ searchParams }: { searchParams: { template?: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CVMallClient searchParams={searchParams} />
      </main>
      <Footer />
    </div>
  )
}
