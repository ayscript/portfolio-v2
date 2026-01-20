"use client"
import Link from "next/link"
import Image from "next/image"
import { Edit, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { projects } from "@/lib/data"
import useProjectsStore from "@/store/projectsStore"
import { useEffect } from "react"

export default function AdminProjects() {
  const { projects, getProjects } = useProjectsStore()

  useEffect(() => {
    getProjects()
  }, [])


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-500">Manage Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
            <Plus className="h-4 w-4 mr-2" /> Add Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-zinc-900/60 border-zinc-800 overflow-hidden">
            <div className="relative h-40">
              <Image src={project.image || "/placeholder.svg"} alt={project.title || ""} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {
                  project.tags ? project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-zinc-800">
                    {tag}
                  </Badge>
                )) : null
                }
              </div>
              {project.featured && (
                <Badge className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30">Featured</Badge>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/admin/projects/edit/${project.id}`}>
                <Button variant="outline" size="sm" className="border-zinc-700 hover:border-zinc-600">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </Link>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
