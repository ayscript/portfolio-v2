"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects, certifications } from "@/lib/data";
import useCertificationStore from "@/store/certificationsStore";
import personalInfoStore from "@/store/personalInfoStore";
import useProjectsStore from "@/store/projectsStore";
import { useEffect } from "react";

export default function AdminDashboard() {

  const { projects, getProjects } = useProjectsStore();

  const { certificates, getCertificates } = useCertificationStore();

  useEffect(() => {
    getProjects()
    getCertificates()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-cyan-500">Admin Dashboard</h1>
      <p className="text-zinc-400">Manage your portfolio content from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your project portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-zinc-400">Total projects</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Manage your certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{certificates.length}</div>
            <p className="text-zinc-400">Total certifications</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-zinc-400">Profile</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
