import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  if (!date) return ""
  const d = new Date(date)
  return d.toLocaleDateString("sv-SE", { year: "numeric", month: "long" })
}
