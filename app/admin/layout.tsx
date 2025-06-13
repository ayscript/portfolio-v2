"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !loading && !user) {
      router.push("/login")
    }
  }, [isClient, loading, user, router])

  if (loading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex max-md:flex-col md:overflow-hidden h-[calc(100vh_-_65px)] bg-zinc-950">
      <AdminSidebar />
      <main className="p-6 flex-1 md:overflow-auto">{children}</main>
    </div>
  )
}
