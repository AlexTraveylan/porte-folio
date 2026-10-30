"use server"

import { CalcRushTopic, isCalcRushTopic } from "@/lib/calc-rush"
import { myEmail } from "@/lib/constants"
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
    const { name, email, message, topic } = formData
    if (topic !== undefined && !isCalcRushTopic(topic)) {
      throw new Error("Invalid topic")
    }

    const topicLine = topic ? `Sujet: ${topic}\n` : ""
    const { data, error } = await resend.emails.send({
      from: "PorteFolio <contact@alextraveylan.fr>",
      to: [myEmail],
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
