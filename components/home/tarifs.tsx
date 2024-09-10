import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useScopedI18n } from "@/locales/client"
import { CheckCircle } from "lucide-react"

interface TarifCardProps {
  title: string
  description: string
  price: string
  services: string[]
}

export const TarifCard: React.FC<TarifCardProps> = ({
  title,
  description,
  price,
  services,
}) => (
  <Card className="w-[340px] h-[450px]">
    <CardHeader className="flex flex-col justify-center items-center">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold my-5 text-center">{price}</p>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            {service}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export function Tarifs() {
  const scopedT = useScopedI18n("tarifs")

  const tarifCards: TarifCardProps[] = [
    {
      title: scopedT("card1.title"),
      description: scopedT("card1.description"),
      price: scopedT("card1.price"),
      services: scopedT("card1.services").split(", "),
    },
    {
      title: scopedT("card2.title"),
      description: scopedT("card2.description"),
      price: scopedT("card2.price"),
      services: scopedT("card2.services").split(", "),
    },
    {
      title: scopedT("card3.title"),
      description: scopedT("card3.description"),
      price: scopedT("card3.price"),
      services: scopedT("card3.services").split(", "),
    },
  ]

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{scopedT("title")}</h2>
      <div className="flex gap-6 flex-wrap">
        {tarifCards.map((card, index) => (
          <TarifCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}
