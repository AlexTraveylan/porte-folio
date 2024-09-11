import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useRef, useState } from "react"
import { ProjectCard, ProjectCardProps } from "./project-card"

const projects: ProjectCardProps[] = [
  {
    name: "TaskEqualizer",
    descriptionI18nKey: "taskEqualizer",
    repoLinks: [
      "https://github.com/AlexTraveylan/taskEqualizer",
      "https://github.com/AlexTraveylan/taskequalizer_front_v2",
    ],
    prodLink: "https://taskequalizer.vercel.app/fr",
    imageUrl: "/taskEqualizer.webp",
    tags: [
      "Python",
      "FastAPI",
      "Sqlmodel",
      "Pytest",
      "Typescript",
      "React",
      "Nextjs",
      "PostgreSQL",
      "Github actions",
      "Tailwindcss",
    ],
  },
  {
    name: "ParentListMaker",
    descriptionI18nKey: "parentListMaker",
    repoLinks: [
      "https://github.com/AlexTraveylan/ParentsListMaker",
      "https://github.com/AlexTraveylan/parent_list_maker_front",
    ],
    prodLink: "https://parentslistsmaker.vercel.app",
    imageUrl: "/parentListMaker.webp",
    tags: [
      "Python",
      "Django",
      "Pytest-Django",
      "Typescript",
      "React",
      "Nextjs",
      "PostgreSQL",
      "Github Actions",
      "Tailwindcss",
    ],
  },
  {
    name: "Math Exerzizer",
    descriptionI18nKey: "mathExerzizer",
    repoLinks: [
      "https://github.com/AlexTraveylan/math_exerzizer",
      "https://github.com/AlexTraveylan/front-exercizer",
    ],
    imageUrl: "/mathExerzizer.webp",
    tags: [
      "Python",
      "Flask",
      "Pytest",
      "OpenAI API",
      "Typescript",
      "React",
      "Nextjs",
      "Github Actions",
      "Tailwindcss",
    ],
  },
  {
    name: "Parole aux Parents",
    descriptionI18nKey: "paroleAuxParents",
    repoLinks: ["https://github.com/AlexTraveylan/parole-aux-parents"],
    imageUrl: "/paroleAuxParents.webp",
    tags: ["Typescript", "React", "Next.js", "Prisma"],
  },
  {
    name: "Password Guard",
    descriptionI18nKey: "passwordGuard",
    repoLinks: ["https://github.com/AlexTraveylan/password-guard-2"],
    imageUrl: "/passwordGuard.webp",
    tags: ["Typescript", "React", "Next.js", "Prisma"],
  },
]

function ProjectCarousel() {
  const [maxHeight, setMaxHeight] = useState(0)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateMaxHeight = () => {
      const heights = cardsRef.current.map(
        (card) => card?.getBoundingClientRect().height ?? 0
      )
      const newMaxHeight = Math.max(...heights)
      setMaxHeight(newMaxHeight)
    }

    const handleResize = () => {
      updateMaxHeight()
      setIsMobile(window.innerWidth < 700)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem
            key={index}
            className={"sm:basis-1/2 min-[450px]:basis-3/4"}
          >
            <div
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              style={{ height: maxHeight > 0 ? `${maxHeight}px` : "auto" }}
              className="p-1"
            >
              <ProjectCard {...project} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!isMobile && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}

export default ProjectCarousel
