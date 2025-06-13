"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Award, FileText, Home, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const { signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="border-r border-zinc-800 bg-zinc-900/60 p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-cyan-500">
            Portfolio Admin
          </Link>
        </div>

        <nav className="space-y-1 flex-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-cyan-500 ${
              isActive("/admin") ? "bg-cyan-500/10 text-cyan-500" : "text-zinc-400"
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-cyan-500 ${
              isActive("/admin/projects") ? "bg-cyan-500/10 text-cyan-500" : "text-zinc-400"
            }`}
          >
            <FileText className="h-5 w-5" />
            Projects
          </Link>
          <Link
            href="/admin/certifications"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-cyan-500 ${
              isActive("/admin/certifications") ? "bg-cyan-500/10 text-cyan-500" : "text-zinc-400"
            }`}
          >
            <Award className="h-5 w-5" />
            Certifications
          </Link>
          <Link
            href="/admin/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-cyan-500 ${
              isActive("/admin/profile") ? "bg-cyan-500/10 text-cyan-500" : "text-zinc-400"
            }`}
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-zinc-800">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-cyan-500 ${
              isActive("/admin/settings") ? "bg-cyan-500/10 text-cyan-500" : "text-zinc-400"
            }`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-red-500 hover:bg-red-500/10 mt-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
