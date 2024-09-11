"use client"

import { githubUrl, linkedinUrl, myEmail, twitterUrl } from "@/lib/constants"
import { useScopedI18n } from "@/locales/client"
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import Link from "next/link"
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

const Footer = () => {
  const [quote, setQuote] = useState<QuoteKey>("quotes.1")
  const scopedI18n = useScopedI18n("footer")

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <footer className="bg-background py-8 px-6 mt-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center lg:items-start">
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
          <p className="text-center italic text-muted-foreground">{`"${scopedI18n(
            quote
          )}"`}</p>
        </div>

        <div className="flex flex-col items-center lg:items-end">
          <h3 className="text-lg font-semibold mb-4">{scopedI18n("follow")}</h3>
          <div className="flex gap-4">
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-blue-800 hover:text-blue-600 hover:scale-110 transition-all" />
            </Link>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="text-muted-foreground hover:text-secondary-foreground hover:scale-110 transition-all" />
            </Link>
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <Twitter className=" text-blue-500 hover:text-blue-400 hover:scale-110 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm">{scopedI18n("right")}</div>
    </footer>
  )
}

export default Footer
