import ContactCta from "@/components/calc-rush/contact-cta"
import Hero from "@/components/calc-rush/hero"
import {
  AboutSection,
  AudiencesSection,
  FaqSection,
  FeaturesSection,
} from "@/components/calc-rush/text-sections"
import VideoSection from "@/components/calc-rush/video-section"
import { SITE_LOCALES, SITE_URL, isSiteLocale } from "@/lib/calc-rush"
import { buildCalcRushJsonLd, serializeJsonLd } from "@/lib/calc-rush-jsonld"
import { getCalcRushContent } from "@/lib/calc-rush-content"
import { buildPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = { params: { locale: string } }

export function generateStaticParams() {
  return SITE_LOCALES.map((locale) => ({ locale }))
}

export function generateMetadata({ params: { locale } }: PageProps): Metadata {
  if (!isSiteLocale(locale)) return {}
  const { seo } = getCalcRushContent(locale)
  return buildPageMetadata({
    locale,
    path: "/calc-rush",
    title: seo.title,
    description: seo.description,
    image: `${SITE_URL}/calc-rush/og-image.png`,
  })
}

export default function CalcRushPage({ params: { locale } }: PageProps) {
  if (!isSiteLocale(locale)) notFound()
  const content = getCalcRushContent(locale)

  return (
    <main className="mx-auto max-w-3xl space-y-12 p-4 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildCalcRushJsonLd(locale, content)),
        }}
      />
      <Hero content={content.hero} />
      <VideoSection locale={locale} content={content.video} />
      <AboutSection content={content.about} />
      <FeaturesSection
        title={content.sections.features}
        features={content.features}
      />
      <AudiencesSection
        title={content.sections.audiences}
        audiences={content.audiences}
      />
      <FaqSection title={content.sections.faq} faq={content.faq} />
      <ContactCta locale={locale} content={content.contact} />
    </main>
  )
}
