import type { SiteLocale } from "./calc-rush"

export type CalcRushContent = {
  seo: { title: string; description: string }
  hero: {
    title: string
    tagline: string
    play: string
    soon: string
    mascotAlt: string
  }
  sections: { features: string; audiences: string; faq: string }
  video: { caption: string }
  about: { title: string; paragraphs: string[] }
  features: { title: string; text: string }[]
  audiences: {
    key: "students" | "parents" | "teachers"
    title: string
    text: string
  }[]
  faq: { question: string; answer: string }[]
  contact: { title: string; text: string; cta: string }
}

const fr: CalcRushContent = {
  seo: {
    title: "Calc Rush : l'appli de calcul mental du CP à la 3ème",
    description:
      "Calc Rush est une application de calcul mental du CP à la 3ème, gratuite pour jouer : parties multijoueurs, grades et écriture manuscrite des réponses.",
  },
  hero: {
    title: "Calc Rush",
    tagline:
      "L'appli de calcul mental du CP à la 3ème, pour s'entraîner en jouant",
    play: "Jouer gratuitement",
    soon: "Bientôt disponible sur l'App Store et Google Play",
    mascotAlt: "Rushy, la mascotte de Calc Rush",
  },
  sections: {
    features: "Ce qu'on y trouve",
    audiences: "Pour qui ?",
    faq: "Questions fréquentes",
  },
  video: {
    caption:
      "Écrire sa réponse au doigt : Calc Rush reconnaît les chiffres tracés à la main.",
  },
  about: {
    title: "C'est quoi, Calc Rush ?",
    paragraphs: [
      "Calc Rush est une application web pour mobile, tablette et ordinateur qui aide les enfants et les adolescents à progresser en calcul mental. On répond à des calculs adaptés à son niveau scolaire, du CP à la 3ème, dans des parties courtes et rythmées.",
      "Le principe : s'entraîner sans s'en rendre compte. Les parties se jouent contre d'autres joueurs de son niveau, bien jouer fait gagner de l'expérience, et la progression est visible grâce aux grades (et aux titres avec Calc Rush+). Jouer est gratuit : l'expérience, le niveau, le grade et la série quotidienne ne dépendent jamais d'un abonnement.",
    ],
  },
  features: [
    {
      title: "Parties multijoueurs",
      text: "Des parties rapides en temps réel contre des joueurs de son niveau, ou dans une partie privée avec un code pour jouer entre amis ou en classe.",
    },
    {
      title: "5 grades",
      text: "Bronze, Argent, Or, Platine et Diamant : plus on joue et on réussit, plus on monte, avec une barre d'expérience pour suivre sa progression.",
    },
    {
      title: "Des titres à débloquer",
      text: "Des titres comme Apprenti Calculateur, Machine à Calculer ou Cerveau Quantique récompensent les séries de victoires, les bonnes réponses et les parties sans faute. La progression des titres fait partie de l'offre Calc Rush+.",
    },
    {
      title: "Écriture manuscrite",
      text: "Au doigt ou au stylet, on écrit sa réponse comme sur une ardoise. La reconnaissance se fait sur l'appareil. Cette fonction est encore expérimentale.",
    },
    {
      title: "Mode entraînement",
      text: "Pour réviser à son rythme, sans adversaire, en choisissant le niveau et la catégorie de calculs. Ce mode fait partie de l'offre Calc Rush+.",
    },
  ],
  audiences: [
    {
      key: "students",
      title: "Pour les élèves",
      text: "Des parties courtes et du multijoueur pour progresser en s'amusant, avec des grades et une série quotidienne qui donnent envie de revenir.",
    },
    {
      key: "parents",
      title: "Pour les parents",
      text: "Un entraînement quotidien au calcul mental qui ressemble à un jeu. Le jeu est gratuit et on peut y jouer en invité. Un compte pour un enfant de moins de 15 ans suppose l'accord d'un parent.",
    },
    {
      key: "teachers",
      title: "Pour les professeurs",
      text: "Une partie privée avec un code, que les élèves rejoignent gratuitement depuis leur appareil. La création d'une partie privée fait partie de l'offre optionnelle Calc Rush+.",
    },
  ],
  faq: [
    {
      question: "Qu'est-ce que Calc Rush ?",
      answer:
        "Calc Rush est une application de calcul mental gamifiée : on affronte d'autres joueurs, on gagne de l'expérience, des grades et des titres, et on s'entraîne sur des calculs adaptés à son niveau scolaire.",
    },
    {
      question: "Comment s'entraîner au calcul mental du CP à la 3ème ?",
      answer:
        "Calc Rush propose des calculs pour chaque niveau, du CP à la 3ème. En jouant quelques minutes par jour, on retrouve les automatismes de calcul, et le mode entraînement (offre Calc Rush+) permet de réviser sans adversaire.",
    },
    {
      question: "Calc Rush est-il gratuit ?",
      answer:
        "Oui, on peut jouer gratuitement, même en invité. L'expérience, le niveau, le grade et la série quotidienne ne dépendent pas d'un abonnement. Une offre optionnelle, Calc Rush+, ajoute la création de parties privées, le mode entraînement, la progression des quêtes et des titres, et la couronne du profil.",
    },
    {
      question: "Peut-on jouer à plusieurs ?",
      answer:
        "Oui. Les parties classées opposent des joueurs de même niveau en temps réel. On peut aussi rejoindre une partie privée avec un code, par exemple pour jouer en classe.",
    },
    {
      question: "Comment fonctionne l'écriture manuscrite ?",
      answer:
        "On écrit son résultat au doigt ou au stylet sur un espace dédié, et l'application reconnaît les chiffres directement sur l'appareil. C'est une fonction expérimentale, que l'on peut activer ou non dans les réglages.",
    },
    {
      question: "Comment utiliser Calc Rush en classe ?",
      answer:
        "Un professeur crée une partie privée (offre Calc Rush+) et communique le code au tableau. Les élèves rejoignent gratuitement depuis un téléphone, une tablette ou un ordinateur.",
    },
    {
      question: "Calc Rush est-il disponible sur l'App Store et Google Play ?",
      answer:
        "Pas encore : l'application est bientôt disponible sur l'App Store et Google Play. En attendant, elle fonctionne directement dans le navigateur sur calc-rush.fr.",
    },
  ],
  contact: {
    title: "Une question, un bug, une idée ?",
    text: "Joueur, parent ou professeur, écrivez-nous : signalement d'un bug, suggestion, partenariat ou question.",
    cta: "Contacter l'équipe Calc Rush",
  },
}

const en: CalcRushContent = {
  seo: {
    title: "Calc Rush: the mental math app for grades 1 to 9",
    description:
      "Calc Rush is a mental math app from primary school to 9th grade, free to play: multiplayer games, ranks and handwritten answers.",
  },
  hero: {
    title: "Calc Rush",
    tagline:
      "The mental math app for kids from grade 1 to 9, practice by playing",
    play: "Play for free",
    soon: "Coming soon on the App Store and Google Play",
    mascotAlt: "Rushy, the Calc Rush mascot",
  },
  sections: {
    features: "What's inside",
    audiences: "Who is it for?",
    faq: "Frequently asked questions",
  },
  video: {
    caption:
      "Write your answer with your finger: Calc Rush recognizes handwritten digits.",
  },
  about: {
    title: "What is Calc Rush?",
    paragraphs: [
      "Calc Rush is a web app for phones, tablets and computers that helps children and teenagers get better at mental math. Players answer calculations matched to their school level, from the first years of primary school to 9th grade, in short, fast-paced games.",
      "The idea is to practice without noticing it. Games are played against other players of the same level, playing well earns experience, and progress shows through ranks (and titles with Calc Rush+). Playing is free: experience, level, rank and daily streak never depend on a subscription.",
    ],
  },
  features: [
    {
      title: "Multiplayer games",
      text: "Fast real-time games against players of your level, or in a private game with a code to play with friends or in class.",
    },
    {
      title: "5 ranks",
      text: "Bronze, Silver, Gold, Platinum and Diamond: the more you play and succeed, the higher you climb, with an experience bar to follow your progress.",
    },
    {
      title: "Titles to unlock",
      text: "Titles reward win streaks, correct answers and perfect games, with names such as Apprentice Calculator or Quantum Brain. Title progression is part of the Calc Rush+ offer.",
    },
    {
      title: "Handwriting",
      text: "With a finger or a stylus, write your answer as on a slate. Recognition runs on the device. This feature is still experimental.",
    },
    {
      title: "Practice mode",
      text: "Revise at your own pace, with no opponent, choosing the level and the category of calculations. This mode is part of the Calc Rush+ offer.",
    },
  ],
  audiences: [
    {
      key: "students",
      title: "For students",
      text: "Short games and multiplayer matches to improve while having fun, with ranks and a daily streak that make you want to come back.",
    },
    {
      key: "parents",
      title: "For parents",
      text: "A daily mental math workout that feels like a game. It is free to play, even as a guest. An account for a child under 15 requires a parent's consent.",
    },
    {
      key: "teachers",
      title: "For teachers",
      text: "A private game with a code that students join for free from their own device. Creating a private game is part of the optional Calc Rush+ offer.",
    },
  ],
  faq: [
    {
      question: "What is Calc Rush?",
      answer:
        "Calc Rush is a gamified mental math app: you face other players, earn experience, ranks and titles, and practice calculations matched to your school level.",
    },
    {
      question: "How can kids practice mental math from grade 1 to 9?",
      answer:
        "Calc Rush offers calculations for every level, from the first years of primary school to 9th grade. A few minutes a day builds calculation habits, and practice mode (Calc Rush+ offer) lets you revise without an opponent.",
    },
    {
      question: "Is Calc Rush free?",
      answer:
        "Yes, you can play for free, even as a guest. Experience, level, rank and daily streak do not depend on a subscription. An optional offer, Calc Rush+, adds private game creation, practice mode, quest and title progression, and the profile crown.",
    },
    {
      question: "Can you play with other people?",
      answer:
        "Yes. Ranked games match players of the same level in real time. You can also join a private game with a code, for example to play in class.",
    },
    {
      question: "How does handwriting work?",
      answer:
        "You write your result with a finger or a stylus in a dedicated area, and the app recognizes the digits directly on the device. It is an experimental feature that you can turn on or off in the settings.",
    },
    {
      question: "How can Calc Rush be used in the classroom?",
      answer:
        "A teacher creates a private game (Calc Rush+ offer) and shares the code on the board. Students join for free from a phone, a tablet or a computer.",
    },
    {
      question: "Is Calc Rush available on the App Store and Google Play?",
      answer:
        "Not yet: the app is coming soon to the App Store and Google Play. Meanwhile, it works directly in the browser at calc-rush.fr.",
    },
  ],
  contact: {
    title: "A question, a bug, an idea?",
    text: "Player, parent or teacher, write to us: bug report, suggestion, partnership or question.",
    cta: "Contact the Calc Rush team",
  },
}

export function getCalcRushContent(locale: SiteLocale): CalcRushContent {
  return locale === "fr" ? fr : en
}
