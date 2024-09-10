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
import { useScopedI18n } from "@/locales/client"
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

  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-1">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={200}
          className="rounded-lg"
        />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{scopedT(descriptionI18nKey)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {repoLinks.map((link, index) => (
            <Button key={index} variant="outline" size="icon" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
        {prodLink && (
          <Button variant="outline" size="icon" asChild>
            <a href={prodLink} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
