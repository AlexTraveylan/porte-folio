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
import { CALC_RUSH_TOPICS } from "@/lib/calc-rush"
import { cn } from "@/lib/utils"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { nunito } from "./font"

const formSchema = z.object({
  topic: z.enum(CALC_RUSH_TOPICS, {
    errorMap: () => ({ message: "topic.required" }),
  }),
  name: z.string().min(2, "name.min"),
  email: z.string().email("email.email"),
  message: z.string().min(10, "message.min"),
})

const fieldClass =
  "border-border bg-background text-foreground focus:ring-primary focus:border-primary text-base"

function CalcRushContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [sendStatusResult, setSendStatusResult] = useState<
    "success" | "error" | null
  >(null)
  const t = useScopedI18n("calc-rush-contact")
  const formT = useScopedI18n("contact-form")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setSendStatusResult(null)
    try {
      const result = await sendEmail(values)
      if (!result.success) {
        setSendStatusResult("error")
        return
      }
      form.reset()
      setSendStatusResult("success")
    } catch {
      setSendStatusResult("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1
          className={cn(
            nunito.className,
            "text-3xl font-black text-[#4f46e5] dark:text-[#a5b4fc]"
          )}
        >
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mx-auto max-w-2xl rounded-3xl border-2 border-border bg-card p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-foreground">
                    {t("topic")}
                  </FormLabel>
                  <FormControl>
                    <select
                      className={cn(
                        fieldClass,
                        "h-10 w-full rounded-md border px-3"
                      )}
                      {...field}
                      value={field.value ?? ""}
                    >
                      <option value="" disabled>
                        {t("topic.placeholder")}
                      </option>
                      {CALC_RUSH_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {t(`topic.${topic}`)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-foreground">
                      {formT("name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={fieldClass}
                        placeholder={formT("name.placeholder")}
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
                    <FormLabel className="font-medium text-foreground">
                      {formT("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className={fieldClass}
                        placeholder={formT("email.placeholder")}
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
                  <FormLabel className="font-medium text-foreground">
                    {formT("message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder={t("message.placeholder")}
                      className={cn(fieldClass, "resize-none")}
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
                className="w-full bg-[#4f46e5] px-8 text-base font-bold text-white hover:bg-[#4338ca] md:w-auto"
              >
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {isLoading ? formT("submit.loading") : formT("submit")}
                </span>
              </Button>

              {sendStatusResult === "success" && (
                <p className="text-center font-medium text-primary">
                  {formT("submit.success")}
                </p>
              )}
              {sendStatusResult === "error" && (
                <p className="text-center font-medium text-destructive">
                  {formT("submit.error")}
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CalcRushContactForm
