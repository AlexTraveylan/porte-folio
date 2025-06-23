"use client"

import { Badge } from "@/components/ui/badge"
import { useScopedI18n } from "@/locales/client"
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react"

// Contract duration types
interface ContractType {
  key: string
  icon: React.ReactNode
  duration: string
  isAvailable: boolean
}

function AvailabilityStatus() {
  const scopedT = useScopedI18n("availability")

  // Get availability from environment variables
  const contractTypes: ContractType[] = [
    {
      key: "very-short",
      icon: <Clock className="h-4 w-4" />,
      duration: scopedT("duration.very-short"),
      isAvailable: process.env.NEXT_PUBLIC_AVAILABILITY_VERY_SHORT === "true",
    },
    {
      key: "short",
      icon: <Calendar className="h-4 w-4" />,
      duration: scopedT("duration.short"),
      isAvailable: process.env.NEXT_PUBLIC_AVAILABILITY_SHORT === "true",
    },
    {
      key: "medium",
      icon: <Calendar className="h-4 w-4" />,
      duration: scopedT("duration.medium"),
      isAvailable: process.env.NEXT_PUBLIC_AVAILABILITY_MEDIUM === "true",
    },
    {
      key: "long",
      icon: <Calendar className="h-4 w-4" />,
      duration: scopedT("duration.long"),
      isAvailable: process.env.NEXT_PUBLIC_AVAILABILITY_LONG === "true",
    },
    {
      key: "very-long",
      icon: <Calendar className="h-4 w-4" />,
      duration: scopedT("duration.very-long"),
      isAvailable: process.env.NEXT_PUBLIC_AVAILABILITY_VERY_LONG === "true",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl font-semibold mt-8 mb-4">{scopedT("title")}</h2>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>

        {/* Timeline items */}
        <div className="space-y-3">
          {contractTypes.map((contract) => (
            <div
              key={contract.key}
              className="relative flex items-center gap-4 group"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    contract.isAvailable
                      ? "bg-primary border-primary"
                      : "bg-muted border-muted-foreground/30"
                  }`}
                >
                  {contract.isAvailable ? (
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                    contract.isAvailable
                      ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                      : "bg-muted/20 border-muted hover:border-muted-foreground/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {contract.icon}
                    <span className="font-medium text-foreground">
                      {contract.duration}
                    </span>
                  </div>

                  <Badge
                    variant={contract.isAvailable ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {contract.isAvailable
                      ? scopedT("badge.available")
                      : scopedT("badge.unavailable")}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvailabilityStatus
