import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { I18nProviderClient } from "@/locales/client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlexTravelan - Developer",
  description:
    "AlexTravelan's Portfolio, a french full stack developer. Python API with Django, FastAPI, Typescript with React, Next.js. And more. // Porte folio d'AlexTravelan, un développeur full stack français. API en Python avec Django, FastAPI, Typescript avec React, Next.js. Et plus encore.",
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body className={cn("container mx-auto", inter.className)}>
        <I18nProviderClient locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  )
}
