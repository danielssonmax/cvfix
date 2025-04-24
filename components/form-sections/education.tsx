"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface EducationFormProps {
  data: Array<{
    degree: string
    school: string
    startDate: string
    endDate: string
    description: string
  }>
  onChange: (data: any) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        degree: "",
        school: "",
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
      {data.map((education, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleRemove(index)}>
            <Trash className="h-4 w-4" />
          </Button>

          <div>
            <Label>Utbildning</Label>
            <Input value={education.degree} onChange={(e) => handleChange(index, "degree", e.target.value)} />
          </div>

          <div>
            <Label>Skola</Label>
            <Input value={education.school} onChange={(e) => handleChange(index, "school", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Startdatum</Label>
              <Input value={education.startDate} onChange={(e) => handleChange(index, "startDate", e.target.value)} />
            </div>
            <div>
              <Label>Slutdatum</Label>
              <Input value={education.endDate} onChange={(e) => handleChange(index, "endDate", e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Beskrivning</Label>
            <Textarea
              value={education.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Lägg till utbildning
      </Button>
    </div>
  )
}
