"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export const Skills: React.FC = () => {
  const { control, register, watch, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  const [openFields, setOpenFields] = useState<number[]>([])

  useEffect(() => {
    if (fields.length === 0) {
      handleAddNew()
    } else if (fields.length === 1 && openFields.length === 0) {
      setOpenFields([0])
    }
  }, [fields.length, openFields.length])

  const watchFieldArray = watch("skills")
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }))

  const skillLevels = ["Nybörjare", "Grundläggande", "Medel", "Avancerad", "Expert"]

  const handleAddNew = () => {
    setOpenFields([])
    const newIndex = fields.length
    append({
      name: "",
      level: 1,
    })
    setTimeout(() => {
      setOpenFields([newIndex])
    }, 0)
  }

  const getLevelLabel = (level: number) => skillLevels[level - 1] || "Nybörjare"

  const collapseField = (index: number) => {
    setOpenFields((prev) => prev.filter((i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {controlledFields.map((field, index) => {
        const isOpen = openFields.includes(index)
        return (
          <div key={field.id} className="mb-4 border rounded-lg">
            {!isOpen && (
              <div
                className="flex items-center justify-between w-full p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                onClick={() => setOpenFields((prev) => [...prev, index])}
              >
                <div className="flex items-center space-x-2 flex-grow">
                  <span className="text-gray-800 text-sm">{field.name ? field.name : "Ny färdighet"}</span>
                </div>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            )}

            {isOpen && (
              <div className="bg-white rounded-lg border-t p-6 space-y-4 mt-0 relative" style={{ minHeight: "225px" }}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-600">Färdighet</Label>
                </div>
                <Input
                  {...register(`skills.${index}.name`)}
                  className="bg-zinc-100 h-10 text-sm"
                  placeholder="t.ex. Projektledning"
                />
                <div>
                  <Label className="mb-1 text-xs text-gray-600">Nivå: {getLevelLabel(field.level)}</Label>
                  <Slider
                    value={[field.level]}
                    onValueChange={(value) => setValue(`skills.${index}.level`, value[0])}
                    min={1}
                    max={5}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
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
        Lägg till färdighet
      </Button>
    </div>
  )
}

export default Skills
