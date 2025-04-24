import { Button, ButtonProps } from "@/components/ui/button"
import { theme } from "@/lib/theme"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PrimaryButtonProps extends Omit<ButtonProps, 'className'> {
  children: ReactNode
  className?: string
}

export function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn(theme.components.button.primary, className)}
      {...props}
    >
      {children}
    </Button>
  )
} 