import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google" // Changed from Inter to Poppins
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] }) // Use Poppins font

export const metadata: Metadata = {
  title: "Portfolio | Developer",
  description: "Personal portfolio website",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}> {/* Use Poppins font class */}
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
