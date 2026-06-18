"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useScopedI18n } from "@/locales/client"
import { Brain, Trophy, Users } from "lucide-react"
import Link from "next/link"

function CalcRushHighlight() {
  const scopedI18n = useScopedI18n("calcRush")

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            {scopedI18n("title")}
          </h2>
        </div>

        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm font-medium">
            {scopedI18n("badge")}
          </Badge>
        </div>

        <p className="text-lg font-medium text-primary max-w-2xl mx-auto">
          {scopedI18n("tagline")}
        </p>

        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {scopedI18n("description")}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link
              href="https://www.calc-rush.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              {scopedI18n("cta.play")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link
              href="https://www.calc-rush.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              {scopedI18n("cta.multiplayer")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CalcRushHighlight
