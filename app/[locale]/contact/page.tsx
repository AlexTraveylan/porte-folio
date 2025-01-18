import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

const DynamicContactForm = dynamic(
  () => import("@/components/home/contact-form"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-col gap-3">
          <div className="mt-8 mb-4">
            <Skeleton className="h-8 w-1/3" />
          </div>
          <Skeleton className="h-[145px] w-full" />
        </div>
      )
    },
  }
)
export default function Home() {
  return (
    <>
      <DynamicContactForm />
    </>
  )
}
