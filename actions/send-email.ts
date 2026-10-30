"use server"

import { CalcRushTopic } from "@/lib/calc-rush"
import { myEmail } from "@/lib/constants"
import { contactPayloadSchema } from "@/lib/contact-schema"
import { buildMailSubject } from "@/lib/mail-subject"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: {
  name: string
  email: string
  message: string
  topic?: CalcRushTopic
}) {
  try {
    const parsed = contactPayloadSchema.safeParse(formData)
    if (!parsed.success) {
      throw new Error("Invalid form data")
    }
    const { name, email, message, topic } = parsed.data

    const topicLine = topic ? `Sujet: ${topic}\n` : ""
    const { error } = await resend.emails.send({
      from: "PorteFolio <contact@alextraveylan.fr>",
      to: [myEmail],
      replyTo: email,
      subject: buildMailSubject(name, topic),
      text: `${topicLine}Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
