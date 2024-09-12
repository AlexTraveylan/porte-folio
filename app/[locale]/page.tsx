"use client"

import Profile from "@/components/home/profile"
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
const DynamicProjectCarousel = dynamic(
  () => import("@/components/home/project-carousel"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="mt-8 mb-4">
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="h-[490px] w-full" />
        </div>
      )
    },
  }
)
const DynamicServices = dynamic(() => import("@/components/home/services"), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="mt-8 mb-4">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[30px] w-full" />
          <Skeleton className="h-[230px] w-full" />
        </div>
      </div>
    )
  },
})
const DynamicTarifs = dynamic(() => import("@/components/home/tarifs"), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="mt-8 mb-4">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Skeleton className="w-[340px] h-[450px]" />
          <Skeleton className="w-[340px] h-[450px]" />
          <Skeleton className="w-[340px] h-[450px]" />
        </div>
      </div>
    )
  },
})

const DynamicFAQPart = dynamic(() => import("@/components/home/faq-part"), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="mt-8 mb-4">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  },
})

const DynamicContactForm = dynamic(
  () => import("@/components/home/contact-form"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="mt-8 mb-4">
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="h-[700px] w-full" />
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

          <DynamicProjectCarousel />
          <DynamicServices />
          <DynamicTarifs />
          <DynamicFAQPart />
          <DynamicContactForm />
        </div>
        <ScrollToTopButton />
      </div>
    </>
  )
}
