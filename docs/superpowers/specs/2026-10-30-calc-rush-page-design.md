# Calc Rush : page de présentation, contact dédié et SEO

## Intention

Calc Rush (https://www.calc-rush.fr/) est une app web mobile de calcul mental gamifiée, du CP à la 3ème. Elle n'est pas encore sur l'App Store ni le Google Play Store : on prépare le terrain.

Le portfolio (Next.js 14, App Router, next-international) doit aider les parents, profs et élèves qui cherchent ou demandent à une IA « c'est quoi Calc Rush ? » à trouver une page claire, bien référencée, et à contacter l'équipe. La cible n'est **pas** celle du portfolio (recruteurs, clients).

Ce qui rend Calc Rush différente : multijoueur, 5 grades (Bronze, Argent, Or, Platine, Diamant), 9 titres à débloquer, et surtout l'écriture manuscrite des réponses (reconnaissance sur l'appareil, étiquetée « expérimental » dans l'app).

## Objectifs

1. Une page de contenu `/[locale]/calc-rush` (FR et EN) qui répond à « c'est quoi, pour qui, comment ça marche » en vrai texte.
2. Une page de contact dédiée `/[locale]/calc-rush/contact`.
3. Un meilleur SEO pour cette page et un SEO de base propre pour tout le site.
4. Remplacer le bloc Calc Rush de l'accueil (deux boutons vers la même URL, aucun visuel) par un seul bloc plus riche qui renvoie vers `/calc-rush`.
5. Faire pointer le footer de l'app Calc Rush vers la nouvelle page de contact.

## Non-objectifs

- Pas de lien App Store / Play Store, pas de note ni d'avis (l'app n'y est pas).
- Pas de lien vers la page dans le menu du portfolio (il vise les recruteurs).
- Pas de refonte du reste du portfolio, ni d'optimisation SEO de calc-rush.fr lui-même (SPA, français uniquement), sauf le lien du footer.
- Pas de nouvelle vidéo (on réutilise celles du dossier marketing).

## Anti-objectifs

- Une page qui a l'air d'un autre site : elle doit rester dans le portfolio tout en reprenant la DA de l'app.
- Du texte caché (onglets, accordéons) qui nuit à l'indexation : tout le contenu important est visible dans le HTML.
- Des affirmations fausses : pas de « du CP au lycée » (l'app s'arrête à la 3ème), pas de faux lien de store.

## Contenu et structure de `/calc-rush` (structure choisie : vitrine qui défile)

1. **Hero** : mascotte Rushy, accroche (« l'appli de calcul mental du CP à la 3ème »), bouton « Jouer » vers calc-rush.fr, mention « bientôt sur les stores ».
2. **Visuels** : la vidéo de l'écriture manuscrite et quelques vraies captures de la prod.
3. **C'est quoi ?** deux paragraphes.
4. **Fonctionnalités** : multijoueur, grades, titres, écriture manuscrite.
5. **Pour qui ?** trois cartes : élèves, parents, profs (lobby privé avec code pour une classe, fonction Calc Rush+).
6. **FAQ** (accordéon dont le contenu reste dans le HTML), rédigée comme les questions posées à une IA (« Comment s'entraîner au calcul mental du CP à la 3ème ? », « Calc Rush est-il gratuit ? »…).
7. **Contact** : bouton vers `/calc-rush/contact`.

Le texte exact est à rédiger en FR et en EN par le builder, sur la base des faits ci-dessus et de la documentation de l'app (`hussard-machine_front/doc/`, `CLAUDE.md`). Les affirmations doivent être vérifiables dans l'app.

## SEO (tout est demandé)

- Metadata par page via `generateMetadata` : title, description, canonical, `alternates.languages` (hreflang), Open Graph et Twitter, avec `metadataBase` défini dans le layout.
- JSON-LD sur `/calc-rush` : `SoftwareApplication` (catégorie éducative, gratuite avec offre Calc Rush+), `FAQPage`, `VideoObject`. Rendu côté serveur dans le HTML.
- Sitemap : le `sitemap.xml` actuel est à la racine du repo (probablement non servi). Le remplacer par `app/sitemap.ts` avec les pages FR/EN, les alternates, et supprimer le fichier racine ; vérifier `robots.txt`.
- Nettoyer au passage le `metadata` du layout (l'entrée `Cache-Control` bizarre dans `other`) seulement si c'est sans risque.
- Liens croisés : accueil vers `/calc-rush`, `/calc-rush` vers calc-rush.fr, footer de l'app vers le contact.

## Page de contact `/calc-rush/contact` (proposée, validée)

- Formulaire avec un champ **sujet** (bug, suggestion, partenariat, question de prof ou de parent), nom, email, message.
- Même système d'envoi que le contact existant (server action avec Resend), avec le sujet inclus dans le mail.
- Correction du bug existant : le formulaire affiche « succès » même quand l'envoi échoue (`contact-form.tsx` ignore le retour de `sendEmail`). À corriger pour les deux formulaires.
- Règles du projet : react-hook-form + zod + `FormMessageI18n`, textes i18n FR et EN.
- Aspect : reprend la DA de l'app.

## Remplacement du bloc de l'accueil

Un seul bloc Calc Rush dans `ProjectCarousel` : une capture, une phrase, un seul bouton vers `/calc-rush`. Les deux boutons actuels disparaissent. Le texte i18n actuel est corrigé (plus de « lycée »).

## Footer de l'app Calc Rush

`hussard-machine_front/src/components/Footer.tsx:14-22` pointe en dur vers `https://www.alextraveylan.fr/fr/contact`. Il doit pointer vers `/calc-rush/contact` du portfolio, dans la langue de l'utilisateur (fr ou en ; les autres langues de l'app retombent sur en). C'est un autre dépôt : modification faite séparément, sans commit sans demande.

## Assets

- Source : `/home/tdemares/dev_folder/hussard_machine_orga/calc-rush-marketing/` (`captures/`, `out/*.mp4`) et `hussard-machine_front/public/` (`mascot/rushy-joyeux.svg`, `og-image.png`, `icon-512.png`).
- Les copier dans `public/` du portfolio, en versions optimisées (images en webp, vidéo légère avec poster, chargement différé).
- Les vidéos du dossier marketing ne contiennent aucun lien.

## Direction artistique

Page dans la mise en page du portfolio (Tailwind, shadcn, variables sémantiques), avec des accents de la DA de l'app : indigo `#4f46e5`, ambre `#fbbf24`, police Nunito pour les titres de cette page, cartes arrondies. La portée exacte (accents ou thème complet de la page) est laissée au builder, en gardant le mode clair et sombre fonctionnels.

## Laissé au builder

Rédaction des textes et de la FAQ, choix des captures et de la vidéo, optimisation des médias, découpage en composants, tests (Jest existant), détails de la DA.

## Décisions prises par défaut (à confirmer)

- Contact à l'URL `/calc-rush/contact`.
- Vidéo de l'écriture manuscrite comme vidéo principale (`out/ecriture-fr.mp4` et `ecriture-en.mp4`).

## Précisions issues de la relecture (mes choix, à vérifier par toi)

- **Destinataire du mail :** le même que le contact actuel (`myEmail`, même expéditeur Resend), avec le sujet de la liste dans l'objet du mail, préfixé « [Calc Rush] ». Pas de routage différent par sujet.
- **Erreur d'envoi :** `sendEmail` continue de renvoyer `{ success: false }` ; le formulaire affiche alors un message d'erreur traduit (FR/EN) au lieu du succès. Les tests existants sont adaptés si besoin.
- **Prix de Calc Rush+ :** il vient de l'API de l'app (1 mois, 3 mois, 1 an), il n'est donc pas écrit en dur. Le JSON-LD décrit le jeu comme gratuit (`price: 0`, EUR) et n'indique aucun prix d'abonnement ; le texte dit seulement que l'abonnement est optionnel et que le jeu reste gratuit et équitable.
- **Faits (grades, titres, écriture manuscrite) :** à relire dans `hussard-machine_front/doc/` et `src/i18n/locales/fr.ts` ; en cas de conflit avec ce document, c'est l'app qui fait foi.
- **Domaine :** `https://www.alextraveylan.fr` pour `metadataBase`, canonicals et sitemap. Les URLs sont préfixées par la langue (`/fr/...`, `/en/...`) ; la langue par défaut est `en`.
- **Footer de l'app :** inclus dans ce projet comme une tâche séparée dans l'autre dépôt. URL du portfolio écrite en dur ; `/fr/calc-rush/contact` si la langue de l'app est le français, `/en/calc-rush/contact` sinon.
- **Médias :** une vidéo par langue (poids visé : quelques Mo, avec poster, chargement différé), 3 à 4 captures en webp. `uploadDate` du `VideoObject` : 2026-10-28 (date de rendu). Le builder vérifie les outils disponibles (ffmpeg, sharp).
- **Sitemap et robots :** le builder vérifie que le `sitemap.xml` racine n'est pas servi avant de le supprimer.
