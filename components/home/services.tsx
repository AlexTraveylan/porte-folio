import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useScopedI18n } from "@/locales/client"
import { CheckCircle } from "lucide-react"

type DevelopmentServices =
  | "webDevelopment"
  | "websiteCreation"
  | "ecommerce"
  | "customWebApp"

const developmentServices: DevelopmentServices[] = [
  "webDevelopment",
  "websiteCreation",
  "ecommerce",
  "customWebApp",
]

type MaintenanceServices =
  | "websiteImprovement"
  | "seoOptimization"
  | "addFeatures"
  | "bugFixes"

const maintenanceServices: MaintenanceServices[] = [
  "websiteImprovement",
  "seoOptimization",
  "addFeatures",
  "bugFixes",
]

type SoftwareServices = "pythonSoftware" | "botDiscord" | "achitecture"

const softwareServices: SoftwareServices[] = [
  "pythonSoftware",
  "botDiscord",
  "achitecture",
]

const Services = () => {
  const scopedT = useScopedI18n("home")
  return (
    <>
      <h2 id="services" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("services")}
      </h2>
      <Tabs defaultValue="development" className="w-full">
        <TabsList className="grid w-full grid-cols-3 text-black dark:text-primary-foreground ">
          <TabsTrigger value="development">
            {scopedT("development")}
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            {scopedT("maintenance")}
          </TabsTrigger>
          <TabsTrigger value="software">{scopedT("software")}</TabsTrigger>
        </TabsList>
        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle>{scopedT("development")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {developmentServices.map((service) => (
                  <li key={service} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-700 dark:text-green-500" />
                    {scopedT(service)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>{scopedT("maintenance")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {maintenanceServices.map((service) => (
                  <li key={service} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-700 dark:text-green-500" />
                    {scopedT(service)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="software">
          <Card>
            <CardHeader>
              <CardTitle>{scopedT("software")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {softwareServices.map((service) => (
                  <li key={service} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-700 dark:text-green-500" />
                    {scopedT(service)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Services
