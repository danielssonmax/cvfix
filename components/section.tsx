import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  background?: "white" | "gray" | "gray-50" | "gray-100"
}

export function Section({ children, className = "", background = "white" }: SectionProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-100",
    "gray-50": "bg-gray-50",
    "gray-100": "bg-gray-100",
  }

  return (
    <section className={`py-16 ${backgroundClasses[background]} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}
