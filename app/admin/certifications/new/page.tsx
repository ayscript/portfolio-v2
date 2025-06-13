"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { createCertification } from "@/lib/firebase-utils"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewCertification() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [certification, setCertification] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setCertification((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const certData = {
        ...certification,
        image: imageUrl,
      }

      await createCertification(certData)
      toast({
        title: "Success",
        description: "Certification created successfully!",
      })
      router.push("/admin/certifications")
    } catch (error) {
      console.error("Error creating certification:", error)
      toast({
        title: "Error",
        description: "Failed to create certification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-cyan-500">Add New Certification</h1>

      <form onSubmit={handleSubmit}>
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle>Certification Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Certification Title</Label>
              <Input
                id="title"
                value={certification.title}
                onChange={handleChange}
                placeholder="Enter certification title"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                value={certification.issuer}
                onChange={handleChange}
                placeholder="Enter issuing organization"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={certification.date}
                onChange={handleChange}
                placeholder="Enter date (e.g., 2023)"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Certificate Image</Label>
              <ImageUpload initialImage={imageUrl} onImageUploaded={setImageUrl} folder="certifications" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Certificate Link</Label>
              <Input
                id="link"
                value={certification.link}
                onChange={handleChange}
                placeholder="Enter certificate link"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/certifications")}
              className="border-zinc-700 hover:border-zinc-600"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Certification"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
