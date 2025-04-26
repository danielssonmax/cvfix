"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, User } from "lucide-react"

export function ProfileSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Mina CVn",
      href: "/profil",
      icon: FileText,
      current: pathname === "/profil"
    },
    {
      name: "Mitt Konto",
      href: "/profil/konto",
      icon: User,
      current: pathname === "/profil/konto"
    }
  ]

  return (
    <div className="w-64 bg-white shadow-sm">
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                item.current && "bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
} 