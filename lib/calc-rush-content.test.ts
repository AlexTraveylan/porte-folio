import { getCalcRushContent } from "./calc-rush-content"
import { isCalcRushTopic, isSiteLocale } from "./calc-rush"

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings)
  }
  return []
}

describe("getCalcRushContent", () => {
  const fr = getCalcRushContent("fr")
  const en = getCalcRushContent("en")

  it("has the same structure in French and English", () => {
    expect(fr.features.length).toBe(en.features.length)
    expect(fr.audiences.length).toBe(3)
    expect(en.audiences.length).toBe(3)
    expect(fr.faq.length).toBe(en.faq.length)
    expect(fr.faq.length).toBeGreaterThanOrEqual(6)
  })

  it("never mentions high school or app stores", () => {
    for (const content of [fr, en]) {
      const text = collectStrings(content).join("\n").toLowerCase()
      expect(text).not.toMatch(/lyc[ée]e/)
      expect(text).not.toMatch(/high school/)
      expect(text).not.toMatch(/apps\.apple|play\.google|store\.apple/)
    }
  })
})

describe("locale and topic guards", () => {
  it("accepts only fr and en as site locales", () => {
    expect(isSiteLocale("fr")).toBe(true)
    expect(isSiteLocale("en")).toBe(true)
    expect(isSiteLocale("de")).toBe(false)
  })

  it("accepts only known Calc Rush topics", () => {
    expect(isCalcRushTopic("bug")).toBe(true)
    expect(isCalcRushTopic("x")).toBe(false)
    expect(isCalcRushTopic(undefined)).toBe(false)
  })
})
