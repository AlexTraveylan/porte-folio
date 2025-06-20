import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { startDate } from "@/lib/constants"
import { computeTjm } from "@/lib/utils"
import { useScopedI18n } from "@/locales/client"
import { CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

function Tarifs() {
  const scopedT = useScopedI18n("tarifs")
  const advantages = scopedT("advantages").split(", ")
  const computedTjm = computeTjm(startDate)

  return (
    <>
      <h2 id="tarifs" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("title")}
      </h2>

      <div className="mb-8 text-center space-y-8">
        {/* Badge */}
        <div>
          <Badge variant="secondary" className="text-base font-medium">
            {scopedT("badge")}
          </Badge>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {`${computedTjm}€`}
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-medium">{scopedT("unit")}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
          {scopedT("description")}
        </p>

        {/* Advantages list */}
        <ul className="space-y-3 max-w-2xl mx-auto text-left">
          {advantages.map((advantage, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-base">{advantage}</span>
            </li>
          ))}
        </ul>

        {/* Call to action */}
        <div className="pt-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="/contact">{scopedT("cta")}</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Tarifs
