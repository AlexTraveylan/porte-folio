import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/calc-rush"
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
  metadataBase: new URL(SITE_URL),
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
