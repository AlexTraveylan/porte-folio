import type { Metadata } from "next"
import { SITE_LOCALES, SITE_URL, type SiteLocale } from "./calc-rush"

const OG_LOCALES: Record<SiteLocale, string> = { fr: "fr_FR", en: "en_US" }

export const pageUrl = (locale: SiteLocale, path: string) =>
  `${SITE_URL}/${locale}${path}`

export function buildPageMetadata(args: {
  locale: SiteLocale
  path: string
  title: string
  description: string
  image?: string
}): Metadata {
  const { locale, path, title, description, image } = args
  const url = pageUrl(locale, path)
  const images = image ? [image] : undefined

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          SITE_LOCALES.map((l) => [l, pageUrl(l, path)])
        ),
        "x-default": pageUrl("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "AlexTraveylan",
      locale: OG_LOCALES[locale],
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  }
}
