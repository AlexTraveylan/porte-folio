import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CalcRushContent } from "@/lib/calc-rush-content"
import { cn } from "@/lib/utils"
import { nunito } from "./font"

const headingClass = cn(nunito.className, "text-2xl font-black text-foreground")

export function AboutSection({
  content,
}: {
  content: CalcRushContent["about"]
}) {
  return (
    <section className="space-y-4">
      <h2 className={headingClass}>{content.title}</h2>
      {content.paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

export function FeaturesSection({
  title,
  features,
}: {
  title: string
  features: CalcRushContent["features"]
}) {
  return (
    <section className="space-y-4">
      <h2 className={headingClass}>{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="rounded-3xl border-2 border-border bg-card p-5 shadow-sm"
          >
            <h3 className="font-bold text-[#4f46e5] dark:text-[#a5b4fc]">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{feature.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AudiencesSection({
  title,
  audiences,
}: {
  title: string
  audiences: CalcRushContent["audiences"]
}) {
  return (
    <section className="space-y-4">
      <h2 className={headingClass}>{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {audiences.map((audience) => (
          <Card key={audience.key} className="rounded-3xl border-2">
            <CardHeader>
              <Badge
                aria-hidden="true"
                className="w-fit bg-[#fbbf24] text-slate-900 hover:bg-[#fbbf24]"
              >
                {audience.title}
              </Badge>
              <CardTitle className="sr-only">{audience.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {audience.text}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function FaqSection({
  title,
  faq,
}: {
  title: string
  faq: CalcRushContent["faq"]
}) {
  return (
    <section className="space-y-4">
      <h2 className={headingClass}>{title}</h2>
      <div className="space-y-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border-2 border-border bg-card p-4"
          >
            <summary className="cursor-pointer font-bold text-foreground">
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
