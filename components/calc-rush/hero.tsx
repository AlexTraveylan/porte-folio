import { Button } from "@/components/ui/button"
import { CALC_RUSH_URL } from "@/lib/calc-rush"
import type { CalcRushContent } from "@/lib/calc-rush-content"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { nunito } from "./font"

function Hero({ content }: { content: CalcRushContent["hero"] }) {
  return (
    <section className="flex flex-col items-center gap-6 py-10 text-center">
      <Image
        src="/calc-rush/rushy-joyeux.svg"
        alt={content.mascotAlt}
        width={160}
        height={160}
        priority
        unoptimized
      />
      <h1
        className={cn(
          nunito.className,
          "text-4xl font-black text-[#4f46e5] dark:text-[#a5b4fc] sm:text-5xl",
        )}
      >
        {content.title}
      </h1>
      <p className="max-w-xl text-lg font-medium text-foreground">
        {content.tagline}
      </p>
      <Button
        asChild
        size="lg"
        className="bg-[#4f46e5] px-8 text-base font-bold text-white hover:bg-[#4338ca]"
      >
        <Link href={CALC_RUSH_URL} target="_blank" rel="noopener noreferrer">
          {content.play}
        </Link>
      </Button>
      <p className="rounded-full bg-[#fbbf24] px-4 py-1 text-sm font-bold text-slate-900">
        {content.soon}
      </p>
    </section>
  )
}

export default Hero
