import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EcoIndex } from "@/lib/types"

const EcoIndexDisplay: React.FC<{ ecoIndex: EcoIndex }> = ({ ecoIndex }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>21-06-2025</CardTitle>
        <CardDescription>https://www.alextraveylan.fr/fr</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          <div
            className={`bg-primary w-24 h-24 rounded-full flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-white">
              {ecoIndex.grade}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{"Score EcoIndex"}</p>
            <p className="text-xl font-semibold">
              {ecoIndex.score.toFixed(1)} / 100
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">{"Émissions CO2"}</p>
            <p className="text-xl font-semibold">
              {ecoIndex.gCo2e.toFixed(2)} gCO2e
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">{"Consommation d'eau"}</p>
            <p className="text-xl font-semibold">
              {ecoIndex.water.toFixed(2)} cl
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EcoIndexDisplay
