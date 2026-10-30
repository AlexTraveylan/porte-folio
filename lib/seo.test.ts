import { buildPageMetadata } from "./seo"

describe("buildPageMetadata", () => {
  const metadata = buildPageMetadata({
    locale: "fr",
    path: "/calc-rush",
    title: "Titre",
    description: "Description",
    image: "https://www.alextraveylan.fr/calc-rush/og-image.png",
  })

  it("sets the canonical URL with the locale prefix", () => {
    expect(metadata.alternates?.canonical).toBe(
      "https://www.alextraveylan.fr/fr/calc-rush"
    )
  })

  it("lists both languages and x-default pointing to English", () => {
    expect(metadata.alternates?.languages).toEqual({
      fr: "https://www.alextraveylan.fr/fr/calc-rush",
      en: "https://www.alextraveylan.fr/en/calc-rush",
      "x-default": "https://www.alextraveylan.fr/en/calc-rush",
    })
  })

  it("fills Open Graph and Twitter cards", () => {
    expect(metadata.openGraph).toMatchObject({
      title: "Titre",
      description: "Description",
      url: "https://www.alextraveylan.fr/fr/calc-rush",
      locale: "fr_FR",
    })
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" })
  })

  it("uses the home path without a trailing slash", () => {
    const home = buildPageMetadata({
      locale: "en",
      path: "",
      title: "t",
      description: "d",
    })
    expect(home.alternates?.canonical).toBe("https://www.alextraveylan.fr/en")
  })
})
