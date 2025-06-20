"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { githubUrl, linkedinUrl, startDate } from "@/lib/constants"
import { useScopedI18n } from "@/locales/client"
import { Calendar, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function HeroSection() {
  const scopedT = useScopedI18n("hero")

  const currentDate = new Date()
  const experienceYears = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  )

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {scopedT("title")}
        </h1>
      </div>

      {/* Photo and personal information */}
      <div className="flex flex-col items-center gap-6">
        {/* Professional photo */}
        <div className="relative">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
            <Image
              src="/profil_2.webp"
              alt="Timothée Demares - Développeur Python Full Stack"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name and information */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Timothée Demares
          </h2>

          {/* Expertise badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Python Full Stack
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Machine Learning
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Data Science
            </Badge>
          </div>

          {/* Location information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Bordeaux, France</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {experienceYears}+ {scopedT("years")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {scopedT("description")}
        </p>
      </div>

      {/* Call to action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          <div className="absolute inset-0 bg-primary rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative flex items-center">
            <Mail className="h-5 w-5 mr-3" />
            {scopedT("cta.contact")}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            asChild
            className="h-16 w-16 p-0 hover:scale-110 transition-transform duration-200"
          >
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.linkedin")}
              className="flex items-center justify-center h-full w-full"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-16 w-16 p-0 hover:scale-110 transition-transform duration-200"
          >
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedT("aria.github")}
              className="flex items-center justify-center h-full w-full"
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
