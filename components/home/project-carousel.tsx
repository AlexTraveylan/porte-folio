import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProjectCard, ProjectCardProps } from "./project-card"

const projects: ProjectCardProps[] = [
  {
    name: "TaskEqualizer",
    description:
      "Une application pour gérer la répartition des tâches dans un foyer.",
    repoLinks: [
      "https://github.com/AlexTraveylan/taskEqualizer",
      "https://github.com/AlexTraveylan/taskequalizer_front_v2",
    ],
    prodLink: "https://taskequalizer.vercel.app/fr",
    imageUrl: "/taskEqualizer.png",
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
    description:
      "Une application pour gérer la création et l'organisation des listes de représentants de parents d'élèves élus.",
    repoLinks: [
      "https://github.com/AlexTraveylan/ParentsListMaker",
      "https://github.com/AlexTraveylan/parent_list_maker_front",
    ],
    prodLink: "https://parentslistsmaker.vercel.app",
    imageUrl: "/parentListMaker.png",
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
    description:
      "Application pour générer des exercices de mathématiques aléatoires avec OpenAI.",
    repoLinks: [
      "https://github.com/AlexTraveylan/math_exerzizer",
      "https://github.com/AlexTraveylan/front-exercizer",
    ],
    imageUrl: "/mathExerzizer.png",
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
    description:
      "Une application web qui permet de préparer les conseils d'école avec les questions des parents.",
    repoLinks: ["https://github.com/AlexTraveylan/parole-aux-parents"],
    imageUrl: "/paroleAuxParents.png",
    tags: ["Typescript", "React", "Next.js", "Prisma"],
  },
  {
    name: "Password Guard",
    description: "Une application web gestionnaire de mots de passe.",
    repoLinks: ["https://github.com/AlexTraveylan/password-guard-2"],
    imageUrl: "/passwordGuard.png",
    tags: ["Typescript", "React", "Next.js", "Prisma"],
  },
]

export function ProjectCarousel() {
  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={index}>
            <ProjectCard {...project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
