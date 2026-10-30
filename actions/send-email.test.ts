import { myEmail } from "@/lib/constants"
import { sendEmail } from "./send-email"

const mockSend = jest.fn()

jest.mock("resend", () => ({
  Resend: jest.fn(() => ({ emails: { send: (...args: unknown[]) => mockSend(...args) } })),
}))

const baseForm = { name: "Léa", email: "lea@example.com", message: "Bonjour !" }

describe("sendEmail", () => {
  beforeEach(() => mockSend.mockReset())

  it("sends the email to the owner and reports success", async () => {
    mockSend.mockResolvedValue({ data: { id: "1" }, error: null })

    const result = await sendEmail({ ...baseForm, topic: "bug" })

    expect(result).toEqual({ success: true })
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [myEmail],
        subject: "[Calc Rush] bug - Nouveau message de Léa",
      })
    )
  })

  it("reports failure when Resend returns an error", async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: "boom" } })

    const result = await sendEmail(baseForm)

    expect(result.success).toBe(false)
  })

  it("refuses an unknown topic without sending anything", async () => {
    const result = await sendEmail({ ...baseForm, topic: "nope" as never })

    expect(result.success).toBe(false)
    expect(mockSend).not.toHaveBeenCalled()
  })
})
