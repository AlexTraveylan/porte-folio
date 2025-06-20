import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { startDate } from "@/lib/constants"
import { computeTjm } from "@/lib/utils"
import { useScopedI18n } from "@/locales/client"
import { CheckCircle, Clock, Star, Target } from "lucide-react"

function Tarifs() {
  const scopedT = useScopedI18n("tarifs")

  const advantages = scopedT("advantages").split(", ")
  const computedTjm = computeTjm(startDate)

  return (
    <>
      <h2 id="tarifs" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("title")}
      </h2>

      <div className="flex justify-center mb-8">
        <div className="max-w-2xl w-full">
          {/* Main section with daily rate */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12" />

            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-4 text-sm font-medium">
                  {scopedT("badge")}
                </Badge>
              </div>

              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
                {`${computedTjm}€ ${scopedT("tjm")}`}
              </CardTitle>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{scopedT("unit")}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
              <CardDescription className="text-center text-base leading-relaxed">
                {scopedT("description")}
              </CardDescription>
              {/* Advantages */}
              <div className="space-y-3">
                <h3 className="font-semibold text-center flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  {scopedT("included")}
                </h3>
                <ul className="space-y-2">
                  {advantages.map((advantage, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <div className="pt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {scopedT("cta")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">{scopedT("note")}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tarifs
