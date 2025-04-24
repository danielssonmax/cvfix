"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash } from "lucide-react"

interface SkillsFormProps {
  data: Array<{
    name: string
    level: number
  }>
  onChange: (data: any) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: "",
        level: 50,
      },
    ])
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: any) => {
    const newData = [...data]
    newData[index] = {
      ...newData[index],
      [field]: value,
    }
    onChange(newData)
  }

  return (
    <div className="space-y-6">
      {data.map((skill, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleRemove(index)}>
            <Trash className="h-4 w-4" />
          </Button>

          <div>
            <Label>Färdighet</Label>
            <Input value={skill.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
          </div>

          <div>
            <Label>Nivå</Label>
            <Slider
              value={[skill.level]}
              onValueChange={(value) => handleChange(index, "level", value[0])}
              max={100}
              step={10}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Lägg till färdighet
      </Button>
    </div>
  )
}
