"use client"
import Link from "next/link"
import Image from "next/image"
import { Edit, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { certifications } from "@/lib/data"
import { useEffect, useState } from "react"
import { getCertifications, getProjects } from "@/lib/firebase-utils"
import useCertificationStore from "@/store/certificationsStore"

export default function AdminCertifications() {
  // const [certificationsData, setCertificationsData] = useState([])
  useEffect(() => {
    async function getCertification(){
      const response = await getProjects()
      console.log(response)
    }

    getCertification()
  }, [])

  const { certificates, getCertificates } = useCertificationStore();

  useEffect(() => {
    getCertificates()
  }, [])


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-cyan-500">Manage Certifications</h1>
        <Link href="/admin/certifications/new">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
            <Plus className="h-4 w-4 mr-2" /> Add Certification
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="bg-zinc-900/60 border-zinc-800 gap-2">
            <div className="flex justify-center bg-red-300">
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.title || ""}
                width={200}
                height={200}
                className="w-full h-40 object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center text-sm">{cert.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-xs">
              <p className="text-zinc-400">{cert.issuer} ({cert.date})</p>
              {/* <p className="text-zinc-500 text-sm">({cert.date})</p> */}
            </CardContent>
            <CardFooter className="flex justify-center gap-2">
              <Link href={`/admin/certifications/edit/${cert.id}`}>
                <Button variant="outline" size="sm" className="border-zinc-700 hover:border-zinc-600">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </Link>
              <Button variant="destructive" className="bg-red-700" size="sm">
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
