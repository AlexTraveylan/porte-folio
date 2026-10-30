import CalcRushContactForm from "@/components/calc-rush/calc-rush-contact-form"
import { SITE_LOCALES, SITE_URL, isSiteLocale } from "@/lib/calc-rush"
import { buildPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = { params: { locale: string } }

const COPY = {
  fr: {
    title: "Contacter l'équipe Calc Rush",
    description:
      "Un bug, une suggestion, un partenariat ou une question sur Calc Rush ? Écrivez-nous.",
  },
  en: {
    title: "Contact the Calc Rush team",
    description:
      "A bug, a suggestion, a partnership or a question about Calc Rush? Write to us.",
  },
} as const

export function generateStaticParams() {
  return SITE_LOCALES.map((locale) => ({ locale }))
}

export function generateMetadata({ params: { locale } }: PageProps): Metadata {
  if (!isSiteLocale(locale)) return {}
  return buildPageMetadata({
    locale,
    path: "/calc-rush/contact",
    ...COPY[locale],
    image: `${SITE_URL}/calc-rush/og-image.png`,
  })
}

export default function CalcRushContactPage({ params: { locale } }: PageProps) {
  if (!isSiteLocale(locale)) notFound()

  return (
    <main className="container mx-auto max-w-4xl p-4 pb-16">
      <CalcRushContactForm />
    </main>
  )
}
