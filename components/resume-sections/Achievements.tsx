"use client"

import { useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { RichTextEditor } from "@/components/rich-text-editor"

export function Achievements() {
  const { control } = useFormContext()
  const { fields, append } = useFieldArray({
    control,
    name: "sections.achievements",
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({ description: "" })
    }
  }, [fields.length, append])

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="bg-white rounded-lg border p-4">
          <RichTextEditor
            name={`sections.achievements.${index}.description`}
            control={control}
            defaultValue={field.description}
          />
        </div>
      ))}
    </div>
  )
}
