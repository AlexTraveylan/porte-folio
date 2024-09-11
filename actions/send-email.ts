"use server"

import { myEmail } from "@/lib/constants"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: {
  name: string
  email: string
  message: string
}) {
  try {
    const { name, email, message } = formData
    const { data, error } = await resend.emails.send({
      from: "PorteFolio <contact@alextraveylan.fr>",
      to: [myEmail],
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
