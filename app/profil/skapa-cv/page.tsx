import type { Metadata } from "next"
import CVMallClient from "./CVMallClient"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata: Metadata = {
  title: "Skapa ditt CV | CVfixaren.se",
  description: "Använd vår CV-mall för att skapa ett professionellt CV som sticker ut. Enkelt, snabbt och effektivt.",
}

export default function CVMallPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CVMallClient />
      </main>
      <Footer />
    </div>
  )
}
