import { Badge } from "@/components/ui/badge"
import { useScopedI18n } from "@/locales/client"
import React from "react"

const skills: [string, boolean][] = [
  ["Python", false],
  ["Django", false],
  ["FastAPI", false],
  ["TypeScript", true],
  ["React", true],
  ["Next.js", true],
  ["Tailwindcss", true],
  ["SQL", false],
]

const MainSkills: React.FC = () => {
  const scopedT = useScopedI18n("main-skills")

  return (
    <>
      <h2 className="text-xl font-semibold mt-8 mb-4">{scopedT("title")}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <Badge
            key={skill[0]}
            variant="default"
            className={`text-sm py-1 px-2 ${
              skill[1]
                ? "bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-500 hover:dark:bg-yellow-600 text-black dark:text-white font-semibold"
                : ""
            }`}
          >
            {skill[0]}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default MainSkills
