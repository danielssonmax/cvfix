import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CVTemplateCardProps {
  imageSrc: string
  alt: string
  templateName: string
  templateId: string
}

export function CVTemplateCard({ imageSrc, alt, templateName, templateId }: CVTemplateCardProps) {
  return (
    <div className="flex flex-col items-center" role="article" aria-label={`${templateName} CV template`}>
      <div className="relative w-full aspect-[3/4] mb-4">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain rounded-lg shadow-lg"
          loading="lazy"
          quality={75}
        />
      </div>
      <Link href={`/profil/skapa-cv?template=${templateId}`} aria-label={`Use ${templateName} CV template`}>
        <Button size="lg" className="bg-[#00bf63] hover:bg-[#00a857] text-white">
          Använd {templateName} CV mall
        </Button>
      </Link>
    </div>
  )
}
