import Link from "next/link"
import Image from "next/image"
import { Edit, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { certifications } from "@/lib/data"

export default function AdminCertifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-500">Manage Certifications</h1>
        <Link href="/admin/certifications/new">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
            <Plus className="h-4 w-4 mr-2" /> Add Certification
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {certifications.map((cert) => (
          <Card key={cert.id} className="bg-zinc-900/60 border-zinc-800">
            <div className="p-4 flex justify-center">
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.title}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center">{cert.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-zinc-400">{cert.issuer}</p>
              <p className="text-zinc-500 text-sm">{cert.date}</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-2">
              <Link href={`/admin/certifications/edit/${cert.id}`}>
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
