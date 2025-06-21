"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useScopedI18n } from "@/locales/client"
import { BarChart3, Github, Leaf, Search } from "lucide-react"
import Link from "next/link"

function EcoTrackHighlight() {
  const scopedI18n = useScopedI18n("ecotrack")

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Leaf className="h-8 w-8 text-primary" />
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
        {/* Large Score Display */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>{scopedI18n("myScore")}</span>
          </div>
          <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            78/100
          </div>
          <div className="text-2xl font-semibold text-green-600">Score B</div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link
              href="https://eco-track-cyan.vercel.app/scan/https%3A%2F%2Fwww.alextraveylan.fr%2Ffr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {scopedI18n("cta.viewScore")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link
              href="https://eco-track-cyan.vercel.app/scan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {scopedI18n("cta.scanYourSite")}
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link
              href="https://github.com/AlexTraveylan/EcoTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {scopedI18n("cta.github")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EcoTrackHighlight
