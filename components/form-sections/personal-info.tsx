"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonalInfoFormProps {
  data: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    address: string
    postalCode: string
    city: string
    birthDate: string
    nationality: string
    civilStatus: string
    website: string
    linkedin: string
  }
  onChange: (data: any) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Förnamn</Label>
          <Input id="firstName" value={data.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lastName">Efternamn</Label>
          <Input id="lastName" value={data.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Titel</Label>
        <Input id="title" value={data.title} onChange={(e) => handleChange("title", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" type="tel" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Adress</Label>
        <Input id="address" value={data.address} onChange={(e) => handleChange("address", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">Postnummer</Label>
          <Input id="postalCode" value={data.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="city">Ort</Label>
          <Input id="city" value={data.city} onChange={(e) => handleChange("city", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="birthDate">Födelsedatum</Label>
          <Input id="birthDate" value={data.birthDate} onChange={(e) => handleChange("birthDate", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="nationality">Nationalitet</Label>
          <Input
            id="nationality"
            value={data.nationality}
            onChange={(e) => handleChange("nationality", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="civilStatus">Civilstånd</Label>
        <Input
          id="civilStatus"
          value={data.civilStatus}
          onChange={(e) => handleChange("civilStatus", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Webbplats</Label>
          <Input id="website" value={data.website} onChange={(e) => handleChange("website", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" value={data.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
        </div>
      </div>
    </div>
  )
}
