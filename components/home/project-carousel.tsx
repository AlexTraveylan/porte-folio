import { useScopedI18n } from "@/locales/client"
import EcoTrackHighlight from "./ecotrack-highlight"

function ProjectCarousel() {
  const scopedT = useScopedI18n("home")

  return (
    <>
      <h2 id="projects" className="text-xl font-semibold mt-8 mb-4">
        {scopedT("projects")}
      </h2>
      <EcoTrackHighlight />
    </>
  )
}

export default ProjectCarousel
