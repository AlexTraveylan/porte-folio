import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useScopedI18n } from "@/locales/client"
import React from "react"

const BackFrontBalance: React.FC = () => {
  const scopedT = useScopedI18n("back-front-balance")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{scopedT("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress
            value={70}
            className="h-4 bg-yellow-600/80 dark:bg-yellow-500/80"
          />
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
              <span>Back-end (70%)</span>
            </div>
            <div className="flex items-center">
              <span>Front-end (30%)</span>
              <div className="w-3 h-3 bg-yellow-600/80 dark:bg-yellow-500/80 rounded-full ml-2"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BackFrontBalance
