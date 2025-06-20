"use client"

import BackFrontBalance from "@/components/home/back-front-balance"
import ContactForm from "@/components/home/contact-form"
import FAQPart from "@/components/home/faq-part"
import MainSkills from "@/components/home/main-skills"
import Profile from "@/components/home/profile"
import ProjectCarousel from "@/components/home/project-carousel"
import Tarifs from "@/components/home/tarifs"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { githubUrl, linkedinUrl } from "@/lib/constants"
import { useScopedI18n } from "@/locales/client"
import { useParams } from "next/navigation"
import Script from "next/script"

export default function Home() {
  const scopedT = useScopedI18n("home")
  const { locale } = useParams()

  const baseUrl = `https://www.alextraveylan.fr/${locale}`

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Timothée Demares",
        description: scopedT("params.description"),
        inLanguage: locale === "fr" ? "fr-FR" : "en-US",
        alternateName: "Timothée Demares",
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: scopedT("title"),
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#website` },
        description: scopedT("params.description"),
        inLanguage: locale === "fr" ? "fr-FR" : "en-US",
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Timothée Demares",
        alternateName: "Alex Traveylan",
        jobTitle:
          locale === "fr"
            ? "Développeur Full Stack Python"
            : "Full Stack Python Developer",
        url: baseUrl,
        sameAs: [linkedinUrl, githubUrl, linkedinUrl],
      },
    ],
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative flex justify-center py-7 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 w-full max-w-3xl">
          <Profile />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{scopedT("title")}</h1>
            <div>
              {scopedT("description")
                .split("$ ")
                .map((sentence, index) => {
                  return (
                    <p
                      key={`sent${index}`}
                      className="text-start text-muted-foreground"
                    >
                      {sentence}
                    </p>
                  )
                })}
            </div>
          </div>
          <BackFrontBalance />
          <MainSkills />
          <ProjectCarousel />
          <Tarifs />
          <FAQPart />
          <ContactForm />
        </div>
        <ScrollToTopButton />
      </div>
    </>
  )
}
