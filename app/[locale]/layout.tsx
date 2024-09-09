import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AlexTravelan's Portfolio",
  description:
    "AlexTravelan's Portfolio, a french full stack developer. Python API with Django, FastAPI, Typescript with React, Next.js. And more.",
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
      <body>{children}</body>
    </html>
  )
}
