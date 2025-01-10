import { useScopedI18n } from "@/locales/client"
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
  const scopedT = useScopedI18n("home")

  return (
    <>
      <h2 id="projects" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("projects")}
      </h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {projects
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
      </div>
    </>
  )
}

export default ProjectCarousel
