"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"

export function Profile() {
  const { control, register } = useFormContext()

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4 mt-2">
        <div>
          <Label className="mb-1 text-xs text-gray-600">Beskrivning</Label>
          <RichTextEditor name={`sections.hobbies.description`} control={control} />
        </div>
      </div>
    </div>
  )
}
