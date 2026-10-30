import { buildMailSubject } from "./mail-subject"

describe("buildMailSubject", () => {
  it("keeps the classic subject when there is no topic", () => {
    expect(buildMailSubject("Léa")).toBe("Nouveau message de Léa")
  })

  it("prefixes Calc Rush messages with their topic", () => {
    expect(buildMailSubject("Léa", "bug")).toBe(
      "[Calc Rush] bug - Nouveau message de Léa"
    )
  })

  it("removes line breaks from the name", () => {
    const subject = buildMailSubject("A\r\nBcc: x@y.z", "bug")
    expect(subject).not.toMatch(/[\r\n]/)
  })
})
