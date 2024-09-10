"use client"

import Profile from "@/components/home/profile"
import { ProjectCarousel } from "@/components/home/project-carousel"
import Services from "@/components/home/services"
import { useScopedI18n } from "@/locales/client"

export default function Home() {
  const scopedT = useScopedI18n("home")

  return (
    <div className="flex justify-center py-7 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 w-full max-w-3xl">
        <Profile />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{scopedT("title")}</h1>
          <p className="text-start text-muted-foreground">
            {scopedT("description")}
          </p>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          {scopedT("projects")}
        </h2>
        <ProjectCarousel />
        <Services />
      </div>
    </div>
  )
}
