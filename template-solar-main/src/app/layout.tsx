import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"

import Footer from "@/components/ui/Footer"
import { NavBar } from "@/components/ui/Navbar"
import { siteConfig } from "./siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VerbaLex AI | Stenographic & Legal Audio AI Assistant",
    template: "%s | VerbaLex AI"
  },
  description: "Convert stenographic reports, depositions, and legal audio into structured, accurate, and verified court-ready documents using advanced AI.",
  keywords: [
    "VerbaLex AI",
    "legal document transcription",
    "court reporter audio transcript",
    "court-ready legal documents",
    "stenography report translation",
    "AI legal transcription assistant",
    "deposition transcript generator",
    "court stenography software"
  ],
  authors: [
    {
      name: "VerbaLex AI",
      url: "https://verbalex.ai",
    },
  ],
  creator: "VerbaLex AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "VerbaLex AI | Stenographic & Legal Audio AI Assistant",
    description: "Convert stenographic reports, depositions, and legal audio into structured, accurate, and verified court-ready documents using advanced AI.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "VerbaLex AI | Stenographic & Legal Audio AI Assistant",
    description: "Convert stenographic reports, depositions, and legal audio into structured, accurate, and verified court-ready documents using advanced AI.",
    creator: "@verbalexai",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
