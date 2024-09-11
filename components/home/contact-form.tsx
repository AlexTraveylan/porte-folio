"use client"

import { sendEmail } from "@/actions/send-email"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
})

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await sendEmail(values)
      form.reset()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 id="contact-me" className="text-xl font-semibold mt-8 mb-4">
        Contactez-moi
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Formulaire de contact</CardTitle>
          <CardDescription>
            Vous pouvez me contacter via ce formulaire pour demander un devis
            gratuit, pour me proposer d'intervenir comme consultant dans une
            entreprise, pour demander une formation ou pour n'importe quelle
            autre question.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary text-md"
                        placeholder="Votre nom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary text-md"
                        placeholder="votre@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder="Votre message"
                        className="border-primary text-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
