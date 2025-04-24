import * as React from "react"

import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<React.ElementRef<"label">, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
})
Label.displayName = "Label"

export { Label }
