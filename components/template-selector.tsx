"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { templates } from "./templates"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-medium hover:text-blue-600">Byt mall</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>CV-mall</DialogTitle>
          <DialogDescription>Detta är standardmallen för ditt CV.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "relative aspect-[3/4] rounded-lg border-2 cursor-pointer overflow-hidden",
                template.id === selectedTemplate ? "border-blue-600" : "border-transparent hover:border-blue-600/50",
              )}
              onClick={() => onSelectTemplate(template.id)}
            >
              <Image src={template.preview || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
              {template.id === selectedTemplate && (
                <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2">
                <h3 className="text-sm font-medium">{template.name}</h3>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
