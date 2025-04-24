"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// ... (övrig kod förblir oförändrad)

export default function ProfilePage() {
  // ... (tidigare state och useEffect)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6">
          <nav className="space-y-2">
            <Link href="/profil/skapa-cv">
              <Button className="w-full justify-start bg-[#00bf63] hover:bg-[#00a857] text-white">Skapa CV</Button>
            </Link>
            {/* ... (övriga knappar) */}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-grow p-6">{/* ... (övrig innehåll) */}</div>
      </main>
      <Footer />
    </div>
  )
}
