"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Header } from "@/components/header"
import { ProfileSidebar } from "@/components/profile-sidebar"

export default function AccountPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Profil</h1>
            <Link href="/profil/skapa-cv">
              <Button className="bg-[#00bf63] hover:bg-[#00a857] text-white">
                Logga in för att se ditt konto
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Logga in för att se din kontoinformation.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <ProfileSidebar />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Mitt Konto</h1>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="font-medium">E-post</label>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  {/* Här kan vi lägga till mer kontoinformation senare */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
