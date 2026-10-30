import { Button } from "@/components/ui/button"
import type { SiteLocale } from "@/lib/calc-rush"
import type { CalcRushContent } from "@/lib/calc-rush-content"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { nunito } from "./font"

function ContactCta({
  locale,
  content,
}: {
  locale: SiteLocale
  content: CalcRushContent["contact"]
}) {
  return (
    <section className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 text-center">
      <h2
        className={cn(nunito.className, "text-2xl font-black text-foreground")}
      >
        {content.title}
      </h2>
      <p className="mx-auto max-w-xl text-muted-foreground">{content.text}</p>
      <Button
        asChild
        size="lg"
        className="bg-[#fbbf24] font-bold text-slate-900 hover:bg-[#f59e0b]"
      >
        <Link href={`/${locale}/calc-rush/contact`}>{content.cta}</Link>
      </Button>
    </section>
  )
}

export default ContactCta
