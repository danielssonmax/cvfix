"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const References: React.FC = () => {
  const { control, register, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.references",
  })

  const [openFields, setOpenFields] = useState<number[]>([])

  useEffect(() => {
    if (fields.length === 0) {
      handleAddNew()
    } else if (fields.length === 1 && openFields.length === 0) {
      setOpenFields([0])
    }
  }, [fields.length, openFields.length])

  // Lägg till denna watch
  const watchedReferences = watch("sections.references")

  const handleAddNew = () => {
    setOpenFields([])
    const newIndex = fields.length
    append({
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      description: "",
    })
    setTimeout(() => {
      setOpenFields([newIndex])
    }, 0)
  }

  const collapseField = (index: number) => {
    setOpenFields((prev) => prev.filter((i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const isOpen = openFields.includes(index)
        return (
          <div key={field.id} className="mb-4 border rounded-lg">
            {!isOpen && (
              <div
                className="flex items-center justify-between w-full p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                onClick={() => setOpenFields((prev) => [...prev, index])}
              >
                <div className="flex items-center space-x-2 flex-grow">
                  <span className="text-gray-800 text-sm">{field.name || "Ny referens"}</span>
                </div>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            )}

            {isOpen && (
              <div
                className="bg-white rounded-lg border-t p-6 space-y-4 mt-0 relative"
                style={{ minHeight: "225px", paddingBottom: "70px" }}
              >
                <div>
                  <Label className="mb-1 text-xs text-gray-600">Namn</Label>
                  <Input
                    {...register(`sections.references.${index}.name`)}
                    defaultValue={field.name}
                    className="bg-zinc-100 h-8 text-sm"
                    placeholder="Namn på referens"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Titel</Label>
                    <Input
                      {...register(`sections.references.${index}.title`)}
                      defaultValue={field.title}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="Titel"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Företag</Label>
                    <Input
                      {...register(`sections.references.${index}.company`)}
                      defaultValue={field.company}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="Företag"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">E-post</Label>
                    <Input
                      {...register(`sections.references.${index}.email`)}
                      defaultValue={field.email}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="E-post"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Telefon</Label>
                    <Input
                      {...register(`sections.references.${index}.phone`)}
                      defaultValue={field.phone}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="Telefon"
                    />
                  </div>
                </div>
                <div className="absolute right-4 flex space-x-2" style={{ bottom: "20px" }}>
                  <Button
                    variant="default"
                    size="sm"
                    style={{
                      backgroundColor: "#00bf63",
                      color: "#fff",
                      fontSize: "0.875rem",
                      padding: "0.5rem 1rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      collapseField(index)
                    }}
                  >
                    KLAR
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      remove(index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
      <Button onClick={handleAddNew} variant="outline" size="sm" className="w-full text-xs px-4 py-2 mt-4">
        <Plus className="h-3 w-3 mr-2" />
        Lägg till referens
      </Button>
    </div>
  )
}

export default References
