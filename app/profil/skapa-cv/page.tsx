import type { Metadata } from "next"
import { Suspense } from "react"
import CVMallClient from "./CVMallClient"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Skapa ditt CV | CVfixaren.se",
  description: "Använd vår CV-mall för att skapa ett professionellt CV som sticker ut. Enkelt, snabbt och effektivt.",
}

function CVLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default function CVMallPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={<CVLoadingFallback />}>
          <CVMallClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
