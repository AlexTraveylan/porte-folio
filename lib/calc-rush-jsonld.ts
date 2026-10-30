import { CALC_RUSH_URL, SITE_URL, type SiteLocale } from "./calc-rush"
import type { CalcRushContent } from "./calc-rush-content"

export function buildCalcRushJsonLd(
  locale: SiteLocale,
  content: CalcRushContent
): object[] {
  const image = `${SITE_URL}/calc-rush/og-image.png`

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Calc Rush",
      url: CALC_RUSH_URL,
      description: content.seo.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: locale,
      image,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: content.video.caption,
      description: content.video.caption,
      thumbnailUrl: `${SITE_URL}/calc-rush/ecriture-poster.webp`,
      uploadDate: "2026-10-28",
      contentUrl: `${SITE_URL}/calc-rush/ecriture-${locale}.mp4`,
      inLanguage: locale,
    },
  ]
}

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
