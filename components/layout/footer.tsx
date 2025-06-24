"use client"

import {
  githubUrl,
  linkedinUrl,
  myEmail,
  secretCitationEn,
  secretCitationFr,
} from "@/lib/constants"
import { useSecretStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useScopedI18n } from "@/locales/client"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
type QuoteKey =
  | "quotes.1"
  | "quotes.2"
  | "quotes.3"
  | "quotes.4"
  | "quotes.5"
  | "quotes.6"
  | "quotes.7"
  | "quotes.8"

export default function Footer() {
  const [quote, setQuote] = useState<QuoteKey>("quotes.1")
  const scopedI18n = useScopedI18n("footer")
  const { locale } = useParams()
  const { isSecretUnlocked } = useSecretStore()

  const secretText = locale === "fr" ? secretCitationFr : secretCitationEn

  useEffect(() => {
    const interval = setInterval(() => {
      const quotes: QuoteKey[] = [
        "quotes.1",
        "quotes.2",
        "quotes.3",
        "quotes.4",
        "quotes.5",
        "quotes.6",
        "quotes.7",
        "quotes.8",
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      setQuote(randomQuote)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-background py-4 px-6 mt-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">
            {scopedI18n("contact")}
          </h3>
          <Link
            href={`mailto:${myEmail}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={18} />
            {myEmail}
          </Link>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin size={18} />
            {"Bordeaux, France"}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">{scopedI18n("quote")}</h3>
          <p
            className={cn(
              "text-center italic text-muted-foreground",
              isSecretUnlocked && "text-primary"
            )}
          >
            {isSecretUnlocked ? `"${secretText}"` : `"${scopedI18n(quote)}"`}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">{scopedI18n("follow")}</h3>
          <div className="flex gap-4">
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedI18n("linkedinAria")}
              className="text-blue-800 hover:text-blue-600 hover:scale-110 transition-all"
            >
              <Linkedin />
              <span className="sr-only">{scopedI18n("linkedin")}</span>
            </Link>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={scopedI18n("githubAria")}
              className="text-muted-foreground hover:text-secondary-foreground hover:scale-110 transition-all"
            >
              <Github />
              <span className="sr-only">{scopedI18n("github")}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">{scopedI18n("right")}</div>
    </footer>
  )
}
