"use client"

import { useState, useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"

export function Hobbies() {
  const { control, register, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.hobbies",
  })
  const [openFields, setOpenFields] = useState<number[]>([])

  useEffect(() => {
    if (fields.length === 0) {
      handleAddNew()
    }
  }, [fields.length])

  const handleAddNew = () => {
    const newIndex = fields.length
    append({
      title: "",
      description: "",
    })
    setOpenFields((prev) => [...prev, newIndex])
  }

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Collapsible
          key={field.id}
          open={openFields.includes(index)}
          onOpenChange={(isOpen) => {
            setOpenFields((prev) => (isOpen ? [...prev, index] : prev.filter((i) => i !== index)))
          }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] rounded-lg border border-gray-200 text-sm transition-colors">
            <div className="flex items-center space-x-2 flex-grow">
              <span className="text-gray-800">{field.title || "Fritidsaktivitet"}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  remove(index)
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  openFields.includes(index) ? "transform rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-white rounded-lg border p-4 space-y-4 mt-2">
              <div>
                <Label className="mb-1 text-xs text-gray-600">Rubrik</Label>
                <Input
                  {...register(`sections.hobbies.${index}.title`)}
                  placeholder="Fritidsaktivitet"
                  className="bg-zinc-100 h-8 text-sm"
                />
              </div>
              <div>
                <Label className="mb-1 text-xs text-gray-600">Beskrivning</Label>
                <RichTextEditor
                  name={`sections.hobbies.${index}.description`}
                  control={control}
                  defaultValue={field.description}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <div className="flex justify-center mt-4">
        <Button onClick={handleAddNew} variant="outline" size="sm" className="text-xs px-4 py-2">
          <Plus className="h-3 w-3 mr-2" />
          Lägg till fritidsaktivitet
        </Button>
      </div>
    </div>
  )
}
