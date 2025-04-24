"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mockup function to check if user is logged in
const isUserLoggedIn = () => {
  // This should be replaced with actual authentication logic
  return false
}

// Mockup function to get saved CVs
const getSavedCVs = () => {
  // This should be replaced with actual API call or data fetching
  return [
    { id: 1, name: "My First CV" },
    { id: 2, name: "Software Developer CV" },
    { id: 3, name: "Marketing Specialist CV" },
  ]
}

export default function AppPage() {
  const [activeTab, setActiveTab] = useState("cvs")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedCVs, setSavedCVs] = useState([])

  useEffect(() => {
    // Check login status
    setIsLoggedIn(isUserLoggedIn())

    // Fetch saved CVs
    setSavedCVs(getSavedCVs())
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6">
          <nav className="space-y-2">
            <Link href="/app/cv-mall">
              <Button className="w-full justify-start bg-[#00bf63] hover:bg-[#00a857] text-white">Skapa CV</Button>
            </Link>
            <Button
              variant={activeTab === "cvs" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("cvs")}
            >
              CV:n
            </Button>
            <Button
              variant={activeTab === "account" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => isLoggedIn && setActiveTab("account")}
              disabled={!isLoggedIn}
            >
              Konto
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-grow p-6">
          {activeTab === "cvs" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Mina CV:n</h1>
              {savedCVs.length > 0 ? (
                <ul className="space-y-2">
                  {savedCVs.map((cv: any) => (
                    <li key={cv.id} className="bg-white p-4 rounded shadow">
                      <Link href={`/app/cv-mall?id=${cv.id}`}>
                        <span className="text-blue-600 hover:underline">{cv.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Du har inga sparade CV:n ännu.</p>
              )}
            </div>
          )}
          {activeTab === "account" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Mitt konto</h1>
              <p>Här kan du hantera dina kontoinställningar.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
