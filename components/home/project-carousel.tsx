import { combinaison } from "@/lib/constants"
import { useGlitchText } from "@/lib/useGlitchText"
import { useScopedI18n } from "@/locales/client"
import EcoTrackHighlight from "./ecotrack-highlight"

function ProjectCarousel() {
  const scopedT = useScopedI18n("home")
  const glitchTitle = useGlitchText({
    text: scopedT("projects"),
    hiddenDigit: combinaison[2],
  })

  return (
    <>
      <h2 id="projects" className="text-xl font-semibold mt-8 mb-4">
        {glitchTitle}
      </h2>
      <EcoTrackHighlight />
    </>
  )
}

export default ProjectCarousel
