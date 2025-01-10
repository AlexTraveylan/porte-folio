import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import LazyLoad from "@/components/lazy-load"
import { ThemeProvider } from "@/components/theme-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { I18nProviderClient } from "@/locales/client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AlexTravelan - Developer - Website & Software",
  description:
    "A french freelance full stack web (website) and sofware developer, Bordeaux, France. Python API with Django, FastAPI, Typescript with React. Wordpress.",
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
            <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
              <Footer />
            </LazyLoad>
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  )
}
