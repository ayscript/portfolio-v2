"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { TagInput } from "@/components/tag-input"
import { ImageUpload } from "@/components/image-upload"
import { createProject } from "@/lib/firebase-utils"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewProject() {
  const router = useRouter()
  const { toast } = useToast()
  const [tags, setTags] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProject((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setProject((prev) => ({ ...prev, featured: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const projectData = {
        ...project,
        tags,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      }

      await createProject(projectData)
      toast({
        title: "Success",
        description: "Project created successfully!",
      })
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-cyan-500">Add New Project</h1>

      <form onSubmit={handleSubmit}>
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={project.description}
                onChange={handleChange}
                placeholder="Enter project description"
                className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Project Image</Label>
              <ImageUpload initialImage={imageUrl} onImageUploaded={setImageUrl} folder="projects" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                value={project.link}
                onChange={handleChange}
                placeholder="Enter project link"
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInput
                tags={tags}
                setTags={setTags}
                placeholder="Add tag and press Enter"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="featured" checked={project.featured} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
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
                "Save Project"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
