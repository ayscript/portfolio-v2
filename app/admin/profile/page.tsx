"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { getPersonalInfo, updatePersonalInfo } from "@/lib/firebase-utils"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminProfile() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    location: "",
    jobStatus: "",
    website: "",
    bio: "",
    profilePicture: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo()
        setPersonalInfo({
          name: data?.name ?? "",
          title: data?.title ?? "",
          email: data?.email ?? "",
          location: data?.location ?? "",
          jobStatus: data?.jobStatus ?? "",
          website: data?.website ?? "",
          bio: data?.bio ?? "",
          profilePicture: data?.profilePicture ?? "",
        })
      } catch (error) {
        console.error("Error fetching personal info:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageUploaded = (url: string) => {
    setPersonalInfo((prev) => ({ ...prev, profilePicture: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updatePersonalInfo(personalInfo)
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
      router.push("/admin")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-cyan-500">Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <Card className="bg-zinc-900/60 border-zinc-800 h-fit">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                initialImage={personalInfo.profilePicture}
                onImageUploaded={handleImageUploaded}
                folder="profile"
              />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={personalInfo.title}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobStatus">Job Status</Label>
                <Input
                  id="jobStatus"
                  value={personalInfo.jobStatus}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={personalInfo.website}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
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
                  "Save Profile"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
