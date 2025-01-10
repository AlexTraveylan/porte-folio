"use client"

import ContactForm from "@/components/home/contact-form"
import FAQPart from "@/components/home/faq-part"
import Profile from "@/components/home/profile"
import ProjectCarousel from "@/components/home/project-carousel"
import Services from "@/components/home/services"
import Tarifs from "@/components/home/tarifs"
import LazyLoad from "@/components/lazy-load"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { Skeleton } from "@/components/ui/skeleton"
import { githubUrl, linkedinUrl } from "@/lib/constants"
import { useScopedI18n } from "@/locales/client"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import Script from "next/script"

const DynamicBackFrontBalance = dynamic(
  () => import("@/components/home/back-front-balance"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="mt-8 mb-4">
            <Skeleton className="h-8 w-1/3" />
          </div>
          <Skeleton className="h-[145px] w-full" />
        </div>
      )
    },
  }
)
const DynamicMainSkills = dynamic(
  () => import("@/components/home/main-skills"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="mt-8 mb-4">
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="h-[50px] w-full" />
        </div>
      )
    },
  }
)

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
          <DynamicBackFrontBalance />
          <DynamicMainSkills />

          <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
            <ProjectCarousel />
          </LazyLoad>

          <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
            <Services />
          </LazyLoad>

          <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
            <Tarifs />
          </LazyLoad>

          <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
            <FAQPart />
          </LazyLoad>

          <LazyLoad fallback={<Skeleton className="h-[490px] w-full" />}>
            <ContactForm />
          </LazyLoad>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  )
}
