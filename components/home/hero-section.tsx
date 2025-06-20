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
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          <div className="absolute inset-0 bg-primary rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative flex items-center">
            <Mail className="h-5 w-5 mr-3" />
            {scopedT("cta.contact")}
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:scale-110 transition-transform duration-200"
          >
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.linkedin")}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:scale-110 transition-transform duration-200"
          >
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.github")}
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
