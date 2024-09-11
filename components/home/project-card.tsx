import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useI18n, useScopedI18n } from "@/locales/client"
import { Github, Globe } from "lucide-react"
import Image from "next/image"

type ProjectDescriptionI18nKeyPossibilities =
  | "taskEqualizer"
  | "parentListMaker"
  | "mathExerzizer"
  | "paroleAuxParents"
  | "passwordGuard"

export type ProjectCardProps = {
  name: string
  descriptionI18nKey: ProjectDescriptionI18nKeyPossibilities
  repoLinks: string[]
  prodLink?: string
  imageUrl: string
  tags: string[]
}

export function ProjectCard({
  name,
  descriptionI18nKey,
  repoLinks,
  prodLink,
  imageUrl,
  tags,
}: ProjectCardProps) {
  const scopedT = useScopedI18n("projects")
  const t = useI18n()

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0 flex flex-col items-center gap-1">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={200}
          className="rounded-lg object-cover w-full h-48"
          loading="lazy"
        />
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-center">
          {scopedT(descriptionI18nKey)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0 flex justify-between mt-auto">
        <div className="flex gap-2">
          {repoLinks.map((link, index) => (
            <Button key={index} variant="outline" size="icon" asChild>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("github.link")} ${index + 1} ${t(
                  "for"
                )} ${name}`}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">
                  {t("github.link")} {index + 1}
                </span>
              </a>
            </Button>
          ))}
        </div>
        {prodLink && (
          <Button variant="outline" size="icon" asChild>
            <a
              href={prodLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("production.link")} ${t("for")} ${name}`}
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">{t("production.link")}</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
