"use client"

import { sendEmail } from "@/actions/send-email"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessageI18n,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "name.min"),
  email: z.string().email("email.email"),
  message: z.string().min(10, "message.min"),
})

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [sendStatusResult, setSendStatusResult] = useState<
    "success" | "error" | null
  >(null)
  const scopedI18n = useScopedI18n("contact-form")

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
      setSendStatusResult("success")
    } catch (error) {
      setSendStatusResult("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 id="contact-me" className="text-xl font-semibold mt-8 mb-4">
        {scopedI18n("title")}
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>{scopedI18n("card.title")}</CardTitle>
          <CardDescription>{scopedI18n("card.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{scopedI18n("name")}</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary text-md"
                        placeholder={scopedI18n("name.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{scopedI18n("email")}</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary text-md"
                        placeholder={scopedI18n("email.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{scopedI18n("message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder={scopedI18n("message.placeholder")}
                        className="border-primary text-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading || sendStatusResult === "success"}
              >
                {isLoading
                  ? scopedI18n("submit.loading")
                  : scopedI18n("submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {sendStatusResult === "success" && (
            <p className="text-green-700 dark:text-green-500">
              {scopedI18n("submit.success")}
            </p>
          )}
          {sendStatusResult === "error" && (
            <p className="text-destructive">{scopedI18n("submit.error")}</p>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
