"use client"

import { sendEmail } from "@/actions/send-email"
import { Button } from "@/components/ui/button"
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
import { Mail, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "name.min"),
  email: z.string().email("email.email"),
  message: z.string().min(10, "message.min"),
})

function ContactForm() {
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
    setSendStatusResult(null)
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
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            {scopedI18n("title")}
          </h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {scopedI18n("name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-border bg-background text-foreground focus:ring-primary focus:border-primary text-base"
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
                    <FormLabel className="text-foreground font-medium">
                      {scopedI18n("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="border-border bg-background text-foreground focus:ring-primary focus:border-primary text-base"
                        placeholder={scopedI18n("email.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    {scopedI18n("message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder={scopedI18n("message.placeholder")}
                      className="border-border bg-background text-foreground focus:ring-primary focus:border-primary resize-none text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                disabled={isLoading || sendStatusResult === "success"}
                size="lg"
                className="w-full md:w-auto px-8 py-3 text-base font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    {scopedI18n("submit.loading")}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {scopedI18n("submit")}
                  </div>
                )}
              </Button>

              {sendStatusResult === "success" && (
                <p className="text-primary font-medium text-center">
                  {scopedI18n("submit.success")}
                </p>
              )}
              {sendStatusResult === "error" && (
                <p className="text-destructive font-medium text-center">
                  {scopedI18n("submit.error")}
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ContactForm
