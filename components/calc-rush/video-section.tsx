import type { SiteLocale } from "@/lib/calc-rush"
import type { CalcRushContent } from "@/lib/calc-rush-content"
import Image from "next/image"

const CAPTURES = [
  {
    src: "/calc-rush/capture-1.webp",
    alt: {
      fr: "Écran d'accueil de Calc Rush avec partie classée et partie privée",
      en: "Calc Rush home screen with ranked game and private game",
    },
  },
  {
    src: "/calc-rush/capture-2.webp",
    alt: {
      fr: "Salle d'attente avec les joueurs et leur grade",
      en: "Waiting room with players and their rank",
    },
  },
  {
    src: "/calc-rush/capture-3.webp",
    alt: {
      fr: "Une question de calcul mental en cours de partie",
      en: "A mental math question during a game",
    },
  },
  {
    src: "/calc-rush/capture-4.webp",
    alt: {
      fr: "Podium et classement à la fin d'une partie",
      en: "Podium and ranking at the end of a game",
    },
  },
] as const

function VideoSection({
  locale,
  content,
}: {
  locale: SiteLocale
  content: CalcRushContent["video"]
}) {
  return (
    <section className="space-y-6">
      <figure className="mx-auto max-w-xs space-y-3">
        <video
          controls
          playsInline
          preload="none"
          poster="/calc-rush/ecriture-poster.webp"
          className="w-full rounded-3xl border-2 border-border shadow-lg"
        >
          <source src={`/calc-rush/ecriture-${locale}.mp4`} type="video/mp4" />
        </video>
        <figcaption className="text-center text-sm text-muted-foreground">
          {content.caption}
        </figcaption>
      </figure>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CAPTURES.map((capture) => (
          <Image
            key={capture.src}
            src={capture.src}
            alt={capture.alt[locale]}
            width={540}
            height={1170}
            sizes="(max-width: 640px) 45vw, 180px"
            loading="lazy"
            className="h-auto w-full rounded-2xl border-2 border-border shadow-md"
          />
        ))}
      </div>
    </section>
  )
}

export default VideoSection
