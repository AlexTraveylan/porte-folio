import { EcoIndex } from "@/lib/types"

export const myEmail = "timothee.demares@gmail.com"
export const githubUrl = "https://github.com/AlexTraveylan"
export const linkedinUrl = "https://www.linkedin.com/in/tdemares/"

export const startDate = new Date("2023-03-01")

export const ecoIndex: EcoIndex = {
  score: 83,
  gCo2e: 1.34,
  water: 2.01,
  grade: "A",
}

export const combinaison = process.env.NEXT_PUBLIC_COMBINAISON || "123456"

export const secretCitationFr = process.env.NEXT_PUBLIC_SECRET_CITATION_FR
export const secretCitationEn = process.env.NEXT_PUBLIC_SECRET_CITATION_EN
