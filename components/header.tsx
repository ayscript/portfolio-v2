"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Code,
  Github,
  Instagram,
  Menu,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle smooth scrolling when clicking on navigation links
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for header height
        behavior: "smooth",
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "projects",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100; // Add offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between max-md:flex-wrap px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/#home"
            className="flex items-center gap-2 text-lg font-semibold text-cyan-500"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <Code className="h-6 w-6" />
            <span>Ayscript</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#home"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
              activeSection === "home" ? "text-cyan-500" : "text-zinc-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
              activeSection === "about" ? "text-cyan-500" : "text-zinc-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            About
          </Link>
          <Link
            href="/#projects"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
              activeSection === "projects" ? "text-cyan-500" : "text-zinc-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            Projects
          </Link>
          <Link
            href="/#certifications"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
              activeSection === "certifications"
                ? "text-cyan-500"
                : "text-zinc-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("certifications");
            }}
          >
            Certifications
          </Link>
          <Link
            href="/#contact"
            className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
              activeSection === "contact" ? "text-cyan-500" : "text-zinc-400"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
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
              {/* <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link> */}
              {/* <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link> */}
              <Link
                href="https://github.com/ayscript"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link
                href="https://x.com/ayscript_js"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width={25}
                    height={25}
                    viewBox="0 0 50 50"
                    fill="currentColor"
                  >
                    <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
                  </svg>
                </Button>
              </Link>
              <Link
                href="https://wa.me/+2347014329650"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
                >
                  <svg
                    fill="currentColor"
                    width={25}
                    height={25}
                    viewBox="-2 -2 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin"
                    className="jam jam-whatsapp"
                  >
                    <path d="M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z" />
                    <path d="M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z" />
                  </svg>
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
                  className={`text-lg font-medium hover:text-cyan-500 ${
                    activeSection === "home" ? "text-cyan-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home");
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${
                    activeSection === "about" ? "text-cyan-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                >
                  About
                </Link>
                <Link
                  href="/#projects"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${
                    activeSection === "projects" ? "text-cyan-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  Projects
                </Link>
                <Link
                  href="/#certifications"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${
                    activeSection === "certifications" ? "text-cyan-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("certifications");
                  }}
                >
                  Certifications
                </Link>
                <Link
                  href="/#contact"
                  className={`text-lg font-medium text-zinc-400 hover:text-cyan-500 ${
                    activeSection === "contact" ? "text-cyan-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  className="text-lg font-medium text-zinc-400 hover:text-cyan-500"
                >
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
