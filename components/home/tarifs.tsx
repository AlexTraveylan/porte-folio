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

const TarifCard: React.FC<TarifCardProps> = ({
  title,
  description,
  price,
  services,
}) => (
  <Card className="w-[340px] h-[450px]">
    <CardHeader className="flex flex-col items-center gap-5 h-[180px]">
      <CardTitle className="text-3xl text-green-700 dark:text-green-500">
        {title}
      </CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-10">
      <p className="text-2xl font-semibold text-center text-green-700 dark:text-green-500">
        {price}
      </p>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-700 dark:text-green-500" />
            {service}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

function Tarifs() {
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
    {
      title: scopedT("card4.title"),
      description: scopedT("card4.description"),
      price: scopedT("card4.price"),
      services: scopedT("card4.services").split(", "),
    },
  ]

  return (
    <>
      <h2 id="tarifs" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("title")}
      </h2>
      <div className="flex gap-6 flex-wrap justify-center">
        {tarifCards.map((card, index) => (
          <TarifCard key={index} {...card} />
        ))}
      </div>
    </>
  )
}

export default Tarifs
