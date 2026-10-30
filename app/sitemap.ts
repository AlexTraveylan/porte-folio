import { SITE_LOCALES } from "@/lib/calc-rush"
import { pageUrl } from "@/lib/seo"
import type { MetadataRoute } from "next"

const PATHS = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/calc-rush", changeFrequency: "monthly", priority: 0.9 },
  { path: "/calc-rush/contact", changeFrequency: "yearly", priority: 0.4 },
] as const

const LAST_MODIFIED = new Date("2026-10-30")

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, changeFrequency, priority }) =>
    SITE_LOCALES.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          SITE_LOCALES.map((l) => [l, pageUrl(l, path)])
        ),
      },
    }))
  )
}
