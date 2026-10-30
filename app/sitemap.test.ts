import sitemap from "./sitemap"

describe("sitemap", () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  it("lists home, contact and Calc Rush pages in both languages", () => {
    expect(entries).toHaveLength(8)
    expect(urls).toContain("https://www.alextraveylan.fr/fr/calc-rush")
    expect(urls).toContain("https://www.alextraveylan.fr/en/calc-rush/contact")
    expect(urls).toContain("https://www.alextraveylan.fr/fr")
    expect(urls).toContain("https://www.alextraveylan.fr/en/contact")
  })

  it("declares the fr and en alternates on every entry", () => {
    for (const entry of entries) {
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual([
        "en",
        "fr",
      ])
    }
  })
})
