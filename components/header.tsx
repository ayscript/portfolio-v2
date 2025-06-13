"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Code, Github, Instagram, Menu, MessageSquare, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Handle smooth scrolling when clicking on navigation links
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for header height
        behavior: "smooth",
      })
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100 // Add offset

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between max-md:flex-wrap px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/#home"
            className="flex items-center gap-2 text-lg font-semibold text-cyan-500"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
          >
            <Code className="h-6 w-6" />
            <span>Ayscript</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#home"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${activeSection === "home" ? "text-cyan-500" : "text-zinc-400"}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${activeSection === "about" ? "text-cyan-500" : "text-zinc-400"}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
          >
            About
          </Link>
          <Link
            href="/#projects"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${activeSection === "projects" ? "text-cyan-500" : "text-zinc-400"}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("projects")
            }}
          >
            Projects
          </Link>
          <Link
            href="/#certifications"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${activeSection === "certifications" ? "text-cyan-500" : "text-zinc-400"}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("certifications")
            }}
          >
            Certifications
          </Link>
          <Link
            href="/#contact"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${activeSection === "contact" ? "text-cyan-500" : "text-zinc-400"}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center max-md:flex-1 max-md:justify-between">
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                className="h-9 w-[200px] md:w-[300px] bg-zinc-900 border-zinc-800"
                placeholder="Search..."
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin" className="hidden md:block">
                <Button variant="outline" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                  Admin
                </Button>
              </Link>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-950 border-zinc-800">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/#home"
                  className={`text-lg font-medium hover:text-cyan-500 ${activeSection === "home" ? "text-cyan-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("home")
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${activeSection === "about" ? "text-cyan-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("about")
                  }}
                >
                  About
                </Link>
                <Link
                  href="/#projects"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${activeSection === "projects" ? "text-cyan-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("projects")
                  }}
                >
                  Projects
                </Link>
                <Link
                  href="/#certifications"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${activeSection === "certifications" ? "text-cyan-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("certifications")
                  }}
                >
                  Certifications
                </Link>
                <Link
                  href="/#contact"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${activeSection === "contact" ? "text-cyan-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact")
                  }}
                >
                  Contact
                </Link>
                <Link href="/admin" className="text-lg font-medium text-zinc-400 hover:text-cyan-500">
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
