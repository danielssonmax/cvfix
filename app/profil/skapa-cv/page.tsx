import type { Metadata } from "next"
import CVMallClient from "./CVMallClient"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata: Metadata = {
  title: "Skapa ditt CV | CVfixaren.se",
  description: "Använd vår CV-mall för att skapa ett professionellt CV som sticker ut. Enkelt, snabbt och effektivt.",
}

export default function SkapaCVPage({ searchParams }: { searchParams: { template?: string } }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex-col min-h-screen">
          <CVMallClient searchParams={searchParams} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
