"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"

interface LanguagesFormProps {
  data: Array<{
    name: string
    level: string
  }>
  onChange: (data: any) => void
}

export function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: "",
        level: "",
      },
    ])
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const newData = [...data]
    newData[index] = {
      ...newData[index],
      [field]: value,
    }
    onChange(newData)
  }

  const levels = ["Nybörjare", "Grundläggande", "Konversationsnivå", "Flytande", "Modersmål"]

  return (
    <div className="space-y-6">
      {data.map((language, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleRemove(index)}>
            <Trash className="h-4 w-4" />
          </Button>

          <div>
            <Label>Språk</Label>
            <Input value={language.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
          </div>

          <div>
            <Label>Nivå</Label>
            <Select value={language.level} onValueChange={(value) => handleChange(index, "level", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Välj nivå" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Lägg till språk
      </Button>
    </div>
  )
}
