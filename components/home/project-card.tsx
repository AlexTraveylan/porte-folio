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
import { Github, Globe } from "lucide-react"
import Image from "next/image"

export type ProjectCardProps = {
  name: string
  description: string
  repoLinks: string[]
  prodLink?: string
  imageUrl: string
  tags: string[]
}

export function ProjectCard({
  name,
  description,
  repoLinks,
  prodLink,
  imageUrl,
  tags,
}: ProjectCardProps) {
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
        <CardDescription>{description}</CardDescription>
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
