import { buildCalcRushJsonLd, serializeJsonLd } from "./calc-rush-jsonld"
import { getCalcRushContent } from "./calc-rush-content"

describe("buildCalcRushJsonLd", () => {
  const content = getCalcRushContent("fr")
  const data = buildCalcRushJsonLd("fr", content) as Record<string, unknown>[]
  const byType = (type: string) => data.find((item) => item["@type"] === type)

  it("describes the app as a free educational application", () => {
    const app = byType("SoftwareApplication")
    expect(app?.applicationCategory).toBe("EducationalApplication")
    expect(app?.offers).toMatchObject({ price: "0", priceCurrency: "EUR" })
    expect(app?.aggregateRating).toBeUndefined()
  })

  it("builds one Question per FAQ entry", () => {
    const faq = byType("FAQPage")
    expect(faq?.mainEntity).toHaveLength(content.faq.length)
    expect((faq?.mainEntity as unknown[])[0]).toMatchObject({
      "@type": "Question",
      name: content.faq[0].question,
    })
  })

  it("describes the handwriting video with absolute URLs", () => {
    const video = byType("VideoObject")
    expect(video?.uploadDate).toBe("2026-10-28")
    expect(video?.contentUrl).toBe(
      "https://www.alextraveylan.fr/calc-rush/ecriture-fr.mp4"
    )
    expect(video?.thumbnailUrl).toMatch(/^https:\/\/www\.alextraveylan\.fr\//)
  })
})

describe("serializeJsonLd", () => {
  it("escapes < so a string cannot close the script tag", () => {
    const output = serializeJsonLd({ a: "</script><b>" })
    expect(output).not.toContain("</script>")
    expect(JSON.parse(output)).toEqual({ a: "</script><b>" })
  })
})
