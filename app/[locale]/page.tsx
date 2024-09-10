"use client"

import Profile from "@/components/home/profile"
import { useScopedI18n } from "@/locales/client"

export default function Home() {
  const scopedT = useScopedI18n("home")

  return (
    <div className="flex flex-col items-center">
      <Profile />
      <div className="flex flex-col p-4 gap-3">
        <h1 className="text-2xl font-bold">{scopedT("title")}</h1>
        <p className="max-w-xl text-start text-muted-foreground">
          {scopedT("description")}
        </p>
      </div>
    </div>
  )
}
