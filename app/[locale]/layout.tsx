import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { I18nProviderClient } from "@/locales/client"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "AlexTravelan - Python Developer",
  description: "A french freelance Python developer, Bordeaux, France.",
  other: {
    "Cache-Control": "public, max-age=3600, must-revalidate",
  },
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
      <body className={cn("container mx-auto", outfit.className)}>
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
