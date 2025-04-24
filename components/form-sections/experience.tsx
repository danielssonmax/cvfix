"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface ExperienceFormProps {
  data: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  onChange: (data: any) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
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

  return (
    <div className="space-y-6">
      {data.map((experience, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleRemove(index)}>
            <Trash className="h-4 w-4" />
          </Button>

          <div>
            <Label>Titel</Label>
            <Input value={experience.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
          </div>

          <div>
            <Label>Företag</Label>
            <Input value={experience.company} onChange={(e) => handleChange(index, "company", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Startdatum</Label>
              <Input value={experience.startDate} onChange={(e) => handleChange(index, "startDate", e.target.value)} />
            </div>
            <div>
              <Label>Slutdatum</Label>
              <Input value={experience.endDate} onChange={(e) => handleChange(index, "endDate", e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Beskrivning</Label>
            <Textarea
              value={experience.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Lägg till erfarenhet
      </Button>
    </div>
  )
}
