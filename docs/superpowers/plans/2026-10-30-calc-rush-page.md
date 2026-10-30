# Calc Rush page, contact et SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter au portfolio une page `/[locale]/calc-rush` et un contact `/[locale]/calc-rush/contact` pour les parents, profs et élèves, avec un SEO complet, remplacer le bloc Calc Rush de l'accueil, et pointer le footer de l'app vers le nouveau contact.

**Architecture:** Le contenu FR/EN de la page vit dans un module TypeScript typé (`lib/calc-rush-content.ts`), rendu côté serveur pour que tout le texte soit dans le HTML. Les métadonnées, le JSON-LD et le sitemap sortent de fonctions pures testées avec Jest (environnement `node`, donc pas de test de composants). Le formulaire de contact réutilise la server action `sendEmail` avec un `topic` optionnel.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind + shadcn, next-international, react-hook-form + zod, Resend, Jest (ts-jest, env node).

**Spec:** `docs/superpowers/specs/2026-10-30-calc-rush-page-design.md`

## Global Constraints

- Code en anglais, exports par défaut pour les composants, `cn()`, variables CSS sémantiques (règles de `.cursor/rules/project_description.mdc`). Formulaires : react-hook-form + zod + `FormMessageI18n`.
- Domaine : `https://www.alextraveylan.fr`. URLs préfixées `/fr/...` et `/en/...`, langue par défaut `en`.
- L'app va du CP à la 3ème : le mot « lycée » ne doit apparaître nulle part dans les textes Calc Rush.
- Aucun lien App Store / Play Store, aucune note ni avis, aucun prix d'abonnement. JSON-LD : jeu gratuit (`price: "0"`, `priceCurrency: "EUR"`).
- 5 grades : Bronze, Argent, Or, Platine, Diamant. 9 titres (3 familles × 3 niveaux). Écriture manuscrite : reconnaissance sur l'appareil, étiquetée « expérimental ». Lobby privé par code : fonction Calc Rush+. Les faits sont à relire dans `/home/tdemares/dev_folder/hussard_machine_orga/hussard-machine_front/doc/` et `src/i18n/locales/fr.ts` ; l'app fait foi.
- La page n'est pas ajoutée au menu du header (`lib/navigation.ts` inchangé).
- Couleurs de l'app pour les accents de la page : indigo `#4f46e5`, ambre `#fbbf24`, police Nunito pour ses titres. Mode clair et sombre fonctionnels.
- Mails : même destinataire (`myEmail`) et même expéditeur que `sendEmail` actuel ; objet préfixé `[Calc Rush]` quand un sujet est fourni.
- Pas de commit dans le dépôt de l'app sans demande de l'utilisateur.

## Review Focus

- Une locale inconnue sur la page (`/de/calc-rush`) : `notFound()`, pas de crash.
- Envoi en échec : le formulaire montre l'erreur traduite et garde les valeurs saisies (pas de `reset()`).
- Sujet de mail invalide envoyé à la server action : l'envoi est refusé (`success: false`).
- Un nom contenant `\r\n` ne doit pas casser l'objet du mail : retours à la ligne retirés.
- Une chaîne contenant `</script>` dans le JSON-LD ne doit pas fermer la balise : `<` échappé en `<`.
- Le contenu FR et EN a la même structure (même nombre de questions de FAQ, de fonctionnalités, de cartes).

---

### Task 1: Constantes, sujets et contenu de la page

**Files:**
- Create: `lib/calc-rush.ts`, `lib/calc-rush-content.ts`
- Test: `lib/calc-rush-content.test.ts`

**Interfaces:**
- Produces (`lib/calc-rush.ts`):
  - `SITE_URL = "https://www.alextraveylan.fr"`, `CALC_RUSH_URL = "https://www.calc-rush.fr/"`
  - `type SiteLocale = "fr" | "en"`, `isSiteLocale(value: string): value is SiteLocale`
  - `CALC_RUSH_TOPICS = ["bug", "suggestion", "partnership", "question"] as const`, `type CalcRushTopic`, `isCalcRushTopic(value: unknown): value is CalcRushTopic`
- Produces (`lib/calc-rush-content.ts`): `type CalcRushContent` et `getCalcRushContent(locale: SiteLocale): CalcRushContent` avec les champs `seo { title, description }`, `hero { title, tagline, play, soon }`, `video { caption }`, `about { title, paragraphs: string[] }`, `features: { title, text }[]`, `audiences: { key: "students" | "parents" | "teachers", title, text }[]`, `faq: { question, answer }[]`, `contact { title, text, cta }`.

- [ ] **Step 1: Write the failing tests** in `lib/calc-rush-content.test.ts`: `getCalcRushContent("fr")` et `("en")` ont le même nombre de `features`, `audiences` (3) et `faq` (au moins 6) ; aucune chaîne du contenu ne contient `lycée` ni `lycee` (insensible à la casse) ni `store.apple`/`play.google` ; `isSiteLocale("de")` est `false` ; `isCalcRushTopic("bug")` est `true` et `isCalcRushTopic("x")` est `false`.
- [ ] **Step 2: Run** `npx jest lib/calc-rush-content.test.ts` ; attendu : FAIL (modules absents).
- [ ] **Step 3: Implement** les deux fichiers. Rédiger les textes FR et EN d'après les faits de Global Constraints. La FAQ est formulée comme des questions posées à une IA (niveaux CP à 3ème, gratuité, multijoueur, écriture manuscrite, classe avec code, disponibilité sur les stores = « bientôt », données/enfants si l'app le documente).
- [ ] **Step 4: Run** le même test ; attendu : PASS.
- [ ] **Step 5: Commit** `git commit -m "feat: add Calc Rush constants and localized page content"`.

### Task 2: Envoi des mails avec sujet et correction du faux succès

**Files:**
- Create: `lib/mail-subject.ts`
- Modify: `actions/send-email.ts`, `components/home/contact-form.tsx:55-66`
- Test: `lib/mail-subject.test.ts`, `actions/send-email.test.ts`

**Interfaces:**
- Consumes: `CalcRushTopic`, `isCalcRushTopic` (Task 1).
- Produces: `buildMailSubject(name: string, topic?: CalcRushTopic): string` ; `sendEmail(formData: { name: string; email: string; message: string; topic?: CalcRushTopic }): Promise<{ success: boolean; error?: string }>`.

- [ ] **Step 1: Write the failing tests.** `buildMailSubject("Léa")` = `"Nouveau message de Léa"` ; `buildMailSubject("Léa", "bug")` = `"[Calc Rush] bug - Nouveau message de Léa"` ; `buildMailSubject("A\r\nBcc: x@y.z", "bug")` ne contient ni `\r` ni `\n`. Pour `sendEmail`, avec `jest.mock("resend")` : un envoi réussi renvoie `{ success: true }` et appelle `emails.send` avec `to: [myEmail]` et l'objet attendu ; une erreur Resend renvoie `success: false` ; `topic: "nope" as never` renvoie `success: false` sans appeler `emails.send`.
- [ ] **Step 2: Run** `npx jest lib/mail-subject.test.ts actions/send-email.test.ts` ; attendu : FAIL.
- [ ] **Step 3: Implement** `buildMailSubject` (retire `\r` et `\n` du nom) puis étendre `sendEmail` : valide `topic` avec `isCalcRushTopic` quand il est fourni, utilise `buildMailSubject`, et ajoute le sujet dans le corps du texte.
- [ ] **Step 4: Fix** `components/home/contact-form.tsx` : `onSubmit` lit le retour de `sendEmail` ; si `success` est faux, `setSendStatusResult("error")` sans `form.reset()` (la clé `contact-form.submit.error` existe déjà).
- [ ] **Step 5: Run** `npx jest` ; attendu : PASS.
- [ ] **Step 6: Commit** `git commit -m "fix: report email send failures and add Calc Rush topic subject"`.

### Task 3: Métadonnées et JSON-LD (fonctions pures)

**Files:**
- Create: `lib/seo.ts`, `lib/calc-rush-jsonld.ts`
- Test: `lib/seo.test.ts`, `lib/calc-rush-jsonld.test.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `CALC_RUSH_URL`, `SiteLocale`, `CalcRushContent` (Task 1).
- Produces:
  - `buildPageMetadata(args: { locale: SiteLocale; path: string; title: string; description: string; image?: string }): Metadata` : `alternates.canonical` = `${SITE_URL}/${locale}${path}`, `alternates.languages` avec `fr`, `en` et `x-default` (vers `en`), Open Graph et Twitter remplis.
  - `buildCalcRushJsonLd(locale: SiteLocale, content: CalcRushContent): object[]` : un `SoftwareApplication` (`applicationCategory: "EducationalApplication"`, `offers.price: "0"`, `offers.priceCurrency: "EUR"`, pas de `aggregateRating`), un `FAQPage` construit depuis `content.faq`, un `VideoObject` (`uploadDate: "2026-10-28"`, `contentUrl`, `thumbnailUrl` absolus).
  - `serializeJsonLd(data: object): string` : `JSON.stringify` avec `<` remplacé par `<`.

- [ ] **Step 1: Write the failing tests** : canonical et hreflang exacts pour `("fr", "/calc-rush")` ; le JSON-LD contient les trois types, aucun `aggregateRating`, le nombre de `Question` égale `content.faq.length` ; `serializeJsonLd({ a: "</script>" })` ne contient pas `</script>`.
- [ ] **Step 2: Run** `npx jest lib/seo.test.ts lib/calc-rush-jsonld.test.ts` ; attendu : FAIL.
- [ ] **Step 3: Implement** les trois fonctions.
- [ ] **Step 4: Run** les mêmes tests ; attendu : PASS.
- [ ] **Step 5: Commit** `git commit -m "feat: add SEO metadata and JSON-LD builders"`.

### Task 4: Assets

**Files:**
- Create: `public/calc-rush/` (mascotte, captures en webp, `ecriture-fr.mp4`, `ecriture-en.mp4`, poster, `og-image.png`)

**Interfaces:**
- Produces: chemins publics `/calc-rush/rushy-joyeux.svg`, `/calc-rush/og-image.png`, `/calc-rush/ecriture-fr.mp4`, `/calc-rush/ecriture-en.mp4`, `/calc-rush/ecriture-poster.webp`, `/calc-rush/capture-1.webp` à `/calc-rush/capture-4.webp` (utilisés par les Tasks 3, 5 et 7).

- [ ] **Step 1:** Copier depuis `hussard_machine_orga/calc-rush-marketing/out/ecriture-{fr,en}.mp4`, `hussard-machine_front/public/{mascot/rushy-joyeux.svg,og-image.png}`.
- [ ] **Step 2:** Choisir 3 ou 4 captures dans `calc-rush-marketing/captures/` (accueil, lobby, partie, podium ; ouvrir les images pour choisir) et les convertir en webp avec l'outil disponible (`cwebp`, `ffmpeg` ou `sharp`). Générer le poster de la vidéo à partir d'une image de `captures/ecriture/` ou d'une frame.
- [ ] **Step 3:** Vérifier : `ls -la public/calc-rush` ; chaque capture webp fait moins de 200 Ko et chaque vidéo moins de 4 Mo.
- [ ] **Step 4: Commit** `git commit -m "feat: add Calc Rush media assets"`.

### Task 5: Page `/[locale]/calc-rush`

**Files:**
- Create: `app/[locale]/calc-rush/page.tsx`, `components/calc-rush/` (un composant par section : `hero.tsx`, `video-section.tsx`, `about-section.tsx`, `features-section.tsx`, `audiences-section.tsx`, `faq-section.tsx`, `contact-cta.tsx`)

**Interfaces:**
- Consumes: Tasks 1, 3 et 4.
- Produces: la route ; `generateMetadata({ params: { locale } })` via `buildPageMetadata` avec le chemin `/calc-rush` ; composants serveur recevant `CalcRushContent` et `locale`.

- [ ] **Step 1:** Créer la page serveur : `notFound()` si `!isSiteLocale(locale)` ; rend les sections dans l'ordre du spec (hero, vidéo et captures, à propos, fonctionnalités, pour qui en trois cartes, FAQ, contact) ; injecte `serializeJsonLd(buildCalcRushJsonLd(...))` dans un `<script type="application/ld+json">`.
- [ ] **Step 2:** FAQ avec `<details>`/`<summary>` natifs (le contenu reste dans le HTML, contrairement à l'accordéon Radix). Vidéo : `<video controls playsInline preload="none" poster=...>` sans autoplay, avec la source de la langue ; images via `next/image` avec `alt` descriptif.
- [ ] **Step 3:** Style : composants shadcn existants (`Card`, `Badge`, `Button`), accents indigo/ambre et Nunito via `next/font/google` limités à cette page, cartes arrondies, lisible en clair et en sombre. Bouton « Jouer » vers `CALC_RUSH_URL` (`target="_blank"`, `rel="noopener noreferrer"`) ; la mention « bientôt sur les stores » est du texte simple.
- [ ] **Step 4:** Vérifier : `npx tsc --noEmit` et `npm run lint` sans erreur ; `npm run build` réussit.
- [ ] **Step 5:** Vérifier dans un navigateur sur `npm run dev` : `/fr/calc-rush` et `/en/calc-rush` s'affichent en mode clair et sombre, sur mobile et bureau ; `curl -s localhost:3000/fr/calc-rush` contient le texte de la FAQ et `application/ld+json`.
- [ ] **Step 6: Commit** `git commit -m "feat: add Calc Rush presentation page"`.

### Task 6: Page de contact Calc Rush

**Files:**
- Create: `app/[locale]/calc-rush/contact/page.tsx`, `components/calc-rush/calc-rush-contact-form.tsx`
- Modify: `locales/fr.ts`, `locales/en.ts`

**Interfaces:**
- Consumes: `sendEmail` (Task 2), `CALC_RUSH_TOPICS` (Task 1), `buildPageMetadata` (Task 3).
- Produces: la route ; clés i18n `calc-rush-contact.title`, `.description`, `.topic`, `.topic.bug`, `.topic.suggestion`, `.topic.partnership`, `.topic.question`, plus les clés `zod.topic.required` ; les clés `contact-form.*` existantes sont réutilisées pour nom, email, message et états d'envoi.

- [ ] **Step 1:** Créer le formulaire (client, react-hook-form + zod avec `topic: z.enum(CALC_RUSH_TOPICS)`, `FormMessageI18n`, `<select>` natif stylé comme `Input`). Même gestion que le correctif de la Task 2 : succès seulement si `sendEmail` renvoie `success`, sinon message d'erreur et valeurs conservées.
- [ ] **Step 2:** Créer la page (serveur, `notFound()` si locale inconnue, `generateMetadata` avec le chemin `/calc-rush/contact`) et ajouter les clés FR et EN dans les deux fichiers de locales (les types doivent rester alignés).
- [ ] **Step 3:** Vérifier : `npx tsc --noEmit`, `npm run lint`, puis dans le navigateur envoyer un message de test avec la clé Resend de développement si disponible ; sinon vérifier que l'erreur s'affiche quand la clé manque.
- [ ] **Step 4: Commit** `git commit -m "feat: add dedicated Calc Rush contact page"`.

### Task 7: Bloc Calc Rush de l'accueil

**Files:**
- Modify: `components/home/calc-rush-highlight.tsx`, `locales/fr.ts:121-127`, `locales/en.ts:110-116`

**Interfaces:**
- Consumes: `/calc-rush/capture-1.webp` (Task 4).
- Produces: un seul bloc avec une capture, une phrase et un seul bouton (`Link` vers `/calc-rush`, via le `Link` de next ; vérifier si la locale doit être préfixée avec le routeur de next-international) ; clé `calcRush.cta.discover` ; les clés `calcRush.cta.play` et `calcRush.cta.multiplayer` sont supprimées si plus utilisées.

- [ ] **Step 1:** Réécrire le composant (garder le titre, le badge et la phrase d'accroche ; supprimer le second bouton) et corriger le texte FR et EN : « du CP à la 3ème », sans « lycée ».
- [ ] **Step 2:** Vérifier : `npx tsc --noEmit`, `npm run lint`, aperçu de l'accueil `/fr` et `/en` ; le bouton mène à `/fr/calc-rush` ou `/en/calc-rush` selon la langue.
- [ ] **Step 3: Commit** `git commit -m "feat: simplify Calc Rush block on home page"`.

### Task 8: Sitemap, robots, base des métadonnées

**Files:**
- Create: `app/sitemap.ts`
- Delete: `sitemap.xml` (racine)
- Modify: `app/[locale]/layout.tsx:15-21`, `app/robots.txt` (seulement si nécessaire)
- Test: `app/sitemap.test.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `SiteLocale` (Task 1).
- Produces: `export default function sitemap(): MetadataRoute.Sitemap` listant, pour `fr` et `en`, les chemins `""`, `/contact`, `/calc-rush`, `/calc-rush/contact`, chacun avec `alternates.languages`.

- [ ] **Step 1: Write the failing test** : `sitemap()` contient 8 entrées, dont `https://www.alextraveylan.fr/fr/calc-rush` et `https://www.alextraveylan.fr/en/calc-rush/contact`, et chaque entrée a une alternate pour `fr` et `en`.
- [ ] **Step 2: Run** `npx jest app/sitemap.test.ts` ; attendu : FAIL.
- [ ] **Step 3: Implement** `app/sitemap.ts`, supprimer `sitemap.xml` à la racine (après avoir vérifié qu'aucune config de déploiement ne le référence : `grep -rn sitemap` hors `node_modules`), ajouter `metadataBase: new URL(SITE_URL)` au `metadata` du layout et retirer l'entrée `other.Cache-Control` (simple balise meta sans effet).
- [ ] **Step 4: Run** `npx jest` ; attendu : PASS. Puis `npm run build` et `curl localhost:3000/sitemap.xml` sur `npm run start` : la page `/calc-rush` y figure ; `robots.txt` pointe vers ce sitemap.
- [ ] **Step 5: Commit** `git commit -m "feat: serve sitemap from app router and set metadataBase"`.

### Task 9: Footer de l'app Calc Rush (autre dépôt)

**Files:**
- Create: `hussard-machine_front/src/lib/portfolioContact.ts`
- Modify: `hussard-machine_front/src/components/Footer.tsx:14-22`
- Test: à côté du fichier, avec l'outil de test que le dépôt de l'app utilise (voir son `package.json`)

**Interfaces:**
- Produces: `getPortfolioContactUrl(language: string): string` → `https://www.alextraveylan.fr/fr/calc-rush/contact` si `language` commence par `fr`, sinon `https://www.alextraveylan.fr/en/calc-rush/contact`.

- [ ] **Step 1: Write the failing test** : `getPortfolioContactUrl("fr")` et `("fr-FR")` donnent l'URL `/fr/...` ; `("en")`, `("de")` et `("pt-BR")` donnent l'URL `/en/...`.
- [ ] **Step 2:** Lancer le test (commande du dépôt de l'app) ; attendu : FAIL.
- [ ] **Step 3:** Implémenter la fonction et l'utiliser dans `Footer.tsx` avec la langue courante d'i18next (lire comment le fichier accède déjà à la langue).
- [ ] **Step 4:** Lancer les tests, `npm run lint` et `npx tsc --noEmit` du dépôt de l'app ; attendu : sans erreur.
- [ ] **Step 5:** Ne pas commiter dans ce dépôt : laisser les changements dans l'arbre de travail et le signaler à l'utilisateur.

### Task 10: Vérification finale

- [ ] **Step 1:** Dans le portfolio : `npx jest`, `npm run lint`, `npx tsc --noEmit`, `npm run build` ; tous sans erreur.
- [ ] **Step 2:** `npm run start`, puis vérifier avec `curl` pour `/fr/calc-rush` et `/en/calc-rush` : `<title>`, `<link rel="canonical">`, `hreflang`, `og:image` et le JSON-LD sont présents ; `/de/calc-rush` renvoie un 404 ; `/sitemap.xml` liste les pages Calc Rush.
- [ ] **Step 3:** Contrôle visuel final (clair, sombre, mobile) des pages `/calc-rush`, `/calc-rush/contact` et de l'accueil.
- [ ] **Step 4:** Annoncer à l'utilisateur ce qui reste à faire de son côté : tester l'envoi réel du formulaire en production, déclarer le sitemap dans Google Search Console, vérifier le JSON-LD avec le test des résultats enrichis de Google.
