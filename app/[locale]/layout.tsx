import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProviderClient } from "@/locales/client"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AlexTravelan's Portfolio",
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={locale}>
            <Header />
            {children}
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
