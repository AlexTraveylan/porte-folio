"use client"

import { Button } from "@/components/ui/button"
import { githubUrl, linkedinUrl } from "@/lib/constants"
import { useScopedI18n } from "@/locales/client"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

function HeroSection() {
  const scopedT = useScopedI18n("hero")

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {scopedT("title")}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {scopedT("description")}
        </p>
      </div>

      {/* Call to action buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild size="lg" className="group">
          <Link href="/contact">
            <Mail className="h-4 w-4 mr-2" />
            {scopedT("cta.contact")}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.linkedin")}
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.github")}
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
