export const SITE_URL = "https://www.alextraveylan.fr"
export const CALC_RUSH_URL = "https://www.calc-rush.fr/"

export const SITE_LOCALES = ["fr", "en"] as const
export type SiteLocale = (typeof SITE_LOCALES)[number]

export function isSiteLocale(value: string): value is SiteLocale {
  return (SITE_LOCALES as readonly string[]).includes(value)
}

export const CALC_RUSH_TOPICS = [
  "bug",
  "suggestion",
  "partnership",
  "question",
] as const
export type CalcRushTopic = (typeof CALC_RUSH_TOPICS)[number]

export function isCalcRushTopic(value: unknown): value is CalcRushTopic {
  return (
    typeof value === "string" &&
    (CALC_RUSH_TOPICS as readonly string[]).includes(value)
  )
}
