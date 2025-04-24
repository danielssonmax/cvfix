"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: "lyxig",
    name: "Lyxig",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lyxig%20cv-V3PmkoStGtgB0kheDvhkFYykZRl0UU.png",
  },
  {
    id: "horisontell",
    name: "Horisontell",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/horisontell%20cv-0YfFhLMm7zq7q4NxnXUqljEzsVyMtt.png",
  },
  {
    id: "modern",
    name: "Modern",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern%20cv-qHBZBeaD2Ze8hpJ4NQIEcmf5xMMqnc.png",
  },
  {
    id: "vertikal",
    name: "Vertikal",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vertikal%20cv-PwUIwMQy8tDIhDz1qEUO6HNzVOiKgP.png",
  },
  {
    id: "professionell",
    name: "Professionell",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/proffessionell%20cv-GdTLzll04XU4Jqoony6KtSCPnlQlfH.png",
  },
  {
    id: "elegant",
    name: "Elegant",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elegant%20cv-cCjrx9XO4kh0n1d5srevb31qPrgSbp.png",
  },
]

export function CVTemplateCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const router = useRouter()

  const showNext = () => {
    setCurrentIndex((current) => (current + 1) % templates.length)
  }

  const showPrevious = () => {
    setCurrentIndex((current) => (current - 1 + templates.length) % templates.length)
  }

  const currentTemplate = templates[currentIndex]

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="overflow-hidden">
        <div className="flex justify-center">
          <Card className="w-64 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-64 h-80">
                <Image
                  src={currentTemplate.image || "/placeholder.svg"}
                  alt={currentTemplate.name}
                  fill
                  className="object-cover rounded-t-lg cursor-pointer"
                  onClick={() => router.push(`/cv-mall?template=${currentTemplate.id}`)}
                />
              </div>
              <div className="p-4 text-center">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push(`/cv-mall?template=${currentTemplate.id}`)}
                >
                  Använd mall
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        onClick={showPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        onClick={showNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
