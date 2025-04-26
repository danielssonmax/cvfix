"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ImageIcon, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"

type OptionalField = {
  id: string
  type:
    | "birthDate"
    | "birthPlace"
    | "drivingLicense"
    | "gender"
    | "nationality"
    | "civilStatus"
    | "website"
    | "linkedin"
    | "custom"
  label: string
  value: string
}

const PersonalInfo: React.FC = () => {
  const { register, watch, setValue, getValues } = useFormContext()
  const [optionalFields, setOptionalFields] = useState<Record<string, string>>({})
  const [availableOptionalFields, setAvailableOptionalFields] = useState<OptionalField["type"][]>([
    "birthDate",
    "birthPlace",
    "drivingLicense",
    "gender",
    "nationality",
    "civilStatus",
    "website",
    "linkedin",
  ])

  const formData = watch()

  // Initialize form with default values if they don't exist
  useEffect(() => {
    const currentValues = getValues()
    if (!currentValues.personalInfo) {
      setValue("personalInfo", {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
        location: "",
        photo: "",
        summary: "",
        optionalFields: {}
      })
    }
  }, [getValues, setValue])

  // Handle initial load of optional fields
  useEffect(() => {
    const currentValues = getValues()
    const existingFields = currentValues.personalInfo?.optionalFields || {}
    
    if (Object.keys(existingFields).length > 0 && Object.keys(optionalFields).length === 0) {
      setOptionalFields(existingFields)
      setAvailableOptionalFields(
        availableOptionalFields.filter((field) => !(field in existingFields))
      )
    }
  }, [getValues])

  // Handle updates to optional fields
  useEffect(() => {
    const subscription = watch((value) => {
      const fields = value.personalInfo?.optionalFields || {}
      if (JSON.stringify(fields) !== JSON.stringify(optionalFields)) {
        setOptionalFields(fields)
        setAvailableOptionalFields(
          availableOptionalFields.filter((field) => !(field in fields))
        )
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, availableOptionalFields])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue("personalInfo.photo", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addOptionalField = (type: OptionalField["type"]) => {
    const label = type === "custom" ? "" : getFieldLabel(type)
    const updatedFields = { ...optionalFields, [type]: "" }
    setOptionalFields(updatedFields)
    setAvailableOptionalFields(availableOptionalFields.filter((field) => field !== type))
    setValue(`personalInfo.optionalFields`, updatedFields)
  }

  const getFieldLabel = (type: OptionalField["type"]): string => {
    const labels: Record<OptionalField["type"], string> = {
      birthDate: "Födelsedatum",
      birthPlace: "Födelseort",
      drivingLicense: "Körkort",
      gender: "Kön",
      nationality: "Nationalitet",
      civilStatus: "Civilstånd",
      website: "Webbplats",
      linkedin: "LinkedIn",
      custom: "Anpassat fält",
    }
    return labels[type]
  }

  const removeOptionalField = (type: string) => {
    const { [type]: removed, ...remainingFields } = optionalFields
    setOptionalFields(remainingFields)
    if (type !== "custom") {
      setAvailableOptionalFields([...availableOptionalFields, type as OptionalField["type"]])
    }
    setValue(`personalInfo.optionalFields`, remainingFields)
  }

  return (
    <div className="space-y-2">
      <div className="grid gap-2">
        <div className="grid grid-cols-[96px_1fr_1fr] gap-2">
          <div>
            <Label className="mb-1 text-xs text-gray-600">Foto</Label>
            <div
              className="w-[48px] h-[48px] bg-zinc-100 rounded-lg flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-zinc-200 transition-colors"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              {formData.personalInfo.photo ? (
                <Image
                  src={formData.personalInfo.photo || "/placeholder.svg"}
                  alt="Profilbild"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon className="h-8 w-8 text-gray-400" />
              )}
              <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="photo-upload" />
            </div>
          </div>
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="firstName">
              Förnamn
            </Label>
            <Input {...register("personalInfo.firstName")} id="firstName" className="bg-zinc-100 h-8 text-sm" />
          </div>
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="lastName">
              Efternamn
            </Label>
            <Input {...register("personalInfo.lastName")} id="lastName" className="bg-zinc-100 h-8 text-sm" />
          </div>
        </div>

        <div>
          <Label className="mb-1 text-xs text-gray-600" htmlFor="title">
            Titel
          </Label>
          <Input {...register("personalInfo.title")} id="title" className="bg-zinc-100 h-8 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="email">
              E-postadress
            </Label>
            <Input {...register("personalInfo.email")} id="email" type="email" className="bg-zinc-100 h-8 text-sm" />
          </div>
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="phone">
              Telefonnummer
            </Label>
            <Input {...register("personalInfo.phone")} id="phone" type="tel" className="bg-zinc-100 h-8 text-sm" />
          </div>
        </div>

        <div>
          <Label className="mb-1 text-xs text-gray-600" htmlFor="address">
            Adress
          </Label>
          <Input {...register("personalInfo.address")} id="address" className="bg-zinc-100 h-8 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="postalCode">
              Postnummer
            </Label>
            <Input {...register("personalInfo.postalCode")} id="postalCode" className="bg-zinc-100 h-8 text-sm" />
          </div>
          <div>
            <Label className="mb-1 text-xs text-gray-600" htmlFor="city">
              Ort
            </Label>
            <Input {...register("personalInfo.location")} id="city" className="bg-zinc-100 h-8 text-sm" />
          </div>
        </div>

        {/* Optional fields */}
        {Object.entries(optionalFields).map(([type, value]) => (
          <div key={type}>
            <Label className="mb-1 text-xs text-gray-600 font-bold">
              {type === "custom" ? value || "Anpassat fält" : getFieldLabel(type as OptionalField["type"])}
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                {...register(`personalInfo.optionalFields.${type}`)}
                defaultValue={value}
                onChange={(e) => {
                  const updatedFields = { ...optionalFields, [type]: e.target.value }
                  setOptionalFields(updatedFields)
                  setValue(`personalInfo.optionalFields`, updatedFields)
                }}
                className="bg-zinc-100 h-8 text-sm flex-grow"
              />
              <Button variant="ghost" size="icon" onClick={() => removeOptionalField(type)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-1">
          {availableOptionalFields.map((field) => (
            <Button key={field} variant="outline" className="h-8 px-2 text-xs" onClick={() => addOptionalField(field)}>
              <Plus className="h-3 w-3 mr-1" /> {getFieldLabel(field)}
            </Button>
          ))}
          <Button variant="outline" className="h-8 px-2 text-xs" onClick={() => addOptionalField("custom")}>
            <Plus className="h-3 w-3 mr-1" /> Anpassat fält
          </Button>
        </div>
      </div>
    </div>
  )
}

export { PersonalInfo }
