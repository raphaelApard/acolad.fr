[English version](README.md)

# Raphaël Apard — site one-page

Site one-page statique et bilingue (français sur `/`, anglais sur `/en/`) construit avec [Astro](https://astro.build)
à partir de la maquette validée dans [`design/`](design/README.fr.md).

## Prérequis

- Node.js 22.12+
- pnpm 10

## Scripts

| Commande | Rôle |
|---|---|
| `pnpm install` | Installe les dépendances |
| `pnpm dev` | Serveur de dev sur http://localhost:4321 |
| `pnpm build` | Build statique dans `dist/` |
| `pnpm preview` | Sert `dist/` en local |
| `pnpm check` | Vérification des types Astro et TypeScript |
| `pnpm test` | Tests unitaires (fichiers de contenu) |
| `pnpm test:e2e` | Build, serveur et Playwright en desktop (1440) et mobile (390), axe WCAG AA inclus |
| `pnpm deploy:prod` | Tests, build et synchronisation de `dist/` vers la prod (voir Déploiement) |
| `pnpm deploy:dry` | Idem, mais liste seulement ce qui changerait sur le serveur |

Premier lancement e2e : `pnpm exec playwright install chromium`.

## Structure

```
src/content/      fr.json, en.json (tous les textes), types.ts (leur forme), index.ts (chargement typé)
src/styles/       tokens.css (issu du design), global.css (base et utilitaires partagés)
src/layouts/      Base.astro (head, SEO, hreflang, polices)
src/components/   un composant par section ; TimelineRow affiche missions et expériences
src/scripts/      disclosure.ts (accordéons mobiles)
src/pages/        [...lang].astro (la page : `/` en français, `/en/` en anglais)
src/assets/       images et logos sources, optimisés au build
src/lib/          images.ts (relie les chemins d'images du contenu à src/assets)
public/           copié tel quel (.htaccess)
tests/            unitaires (Vitest) et e2e (Playwright)
```

## Modifier le contenu

- Tous les textes sont dans `src/content/<lang>.json` ; aucun texte en dur dans les composants.
- Les deux fichiers doivent garder la même structure (vérifié par `pnpm test`) et respecter
  `src/content/types.ts` (vérifié par `pnpm check` / `pnpm build`).
- Les champs optionnels n'affichent rien s'ils sont absents ou `null` : `place`,
  `achievements`, `stack`, `image`, `projects`, `logo` (missions et expériences ;
  affiché dans une tuile carrée), liens de profils (`links.linkedin`,
  `links.malt`, `links.github`) et `verifyUrl` des certifications.
- Les `src` d'images sont des chemins sous `src/assets` (ex. `/img/portrait.webp`) ; les
  dimensions sont lues dans les fichiers. Les logos ont aussi `height`, la hauteur affichée en
  desktop (×0,77 en mobile).
- Les ancres de section (`nav[].id`) sont fixées dans les composants et identiques dans chaque langue.

## Règles de mise en page

- Un seul point de rupture à 960px. En dessous, les grilles s'empilent, la nav passe derrière
  le bouton menu, missions / autres projets / expériences deviennent des accordéons et les
  groupes de compétences n'affichent qu'une ligne, avec un bouton seulement si les puces débordent.
- Le balisage propre à un format utilise `.desktop-only` / `.mobile-only` (masqué en
  `display: none`, donc jamais dupliqué pour les lecteurs d'écran). Ne pas donner de règle
  `display` propre à un élément portant ces classes : l'envelopper.
- Les panneaux ne se replient qu'une fois le JS exécuté (`html.js`) : sans JS, tout reste lisible.

## Performance

- Les polices passent par l'API Fonts d'Astro (`fonts` dans `astro.config.mjs`) : fichiers
  woff2 latins uniquement, toutes préchargées (aucune chaîne de requêtes après le HTML), polices de repli ajustées pour que le
  changement de police ne décale pas la mise en page.
- Les images passent par `astro:assets` : captures et portrait ont un `srcset` (WebP), les logos
  sont redimensionnés à leur hauteur d'affichage en 1x et 2x. Les images sous la ligne de
  flottaison sont chargées en différé.
  Les logos sont posés sur des tuiles blanches : leurs sources n'ont pas de transparence, un canal
  alpha fait plus que doubler le poids du WebP.
- Le CSS est inliné dans chaque page (`build.inlineStylesheets`) : rien ne bloque le premier rendu.

## Déploiement

`pnpm deploy:prod` (`scripts/deploy.sh`) lance les tests, build et synchronise `dist/` (y compris le fichier caché
`.htaccess`) vers l'hébergement o2switch avec `rsync --delete`. Il contient les vrais paramètres
du serveur, il est donc ignoré par git : le créer avec
`cp scripts/deploy.example.sh scripts/deploy.sh` et renseigner `REMOTE_USER`, `REMOTE_HOST` et
`REMOTE_PATH`. Ton IP doit d'abord être autorisée dans cPanel (Accès SSH). Le script affiche
les changements et demande confirmation avant d'envoyer ; `pnpm deploy:dry` s'arrête après la
liste, `pnpm deploy:prod --yes` saute la confirmation. Les fichiers gérés par l'hébergeur (`.well-known/`, `cgi-bin/`,
`.user.ini`, `error_log`) ne sont jamais touchés.
`public/.htaccess` est la configuration de production, copiée telle
quelle dans le build : PageSpeed o2switch (ne pas modifier ce bloc), une 301 de `acolad.fr/`
vers `www.acolad.fr/`, des 301 de l'ancienne `/fr/` et des pages de l'ancien site vers `/`, une 302
de `/` vers `/en/` pour les navigateurs dont la première langue est l'anglais (sauf si le visiteur
a choisi le français avec le sélecteur de langue, qui pose un cookie `lang`, vient du site lui-même,
ou est un robot ou un outil d'audit comme Lighthouse), et les en-têtes de cache : un an, immutable, pour les
fichiers empreintés de `/_astro/`, une semaine pour les favicons, `no-cache` pour les pages, le
sitemap et robots.txt, `Vary: Accept-Language, Cookie` sur `/`.
L'URL de production est définie dans `astro.config.mjs` (`site`)
et sert aux URL canonical, hreflang et sitemap. `/sitemap.xml` (`src/pages/sitemap.xml.ts`)
liste les deux langues avec leurs alternates hreflang ; `/robots.txt` (`src/pages/robots.txt.ts`)
l'indique aux robots. Les anciens `sitemap-index.xml` et `sitemap-0.xml` redirigent en 301 vers
`/sitemap.xml`.
Le tracker Matomo (`stats.acolad.net`, site 8) est dans `src/layouts/Base.astro` et n'est
inclus que dans les builds de production ; les tests e2e bloquent ses requêtes. Le script est chargé
depuis `stats.acolad.net/js/` (même fichier que `matomo.js`, en cache 10 jours) après l'événement
`load` de la page.

## Points ouverts

- [ ] Relire `src/content/en.json` (traduit depuis le français).
- [ ] Portrait en meilleure définition (l'actuel fait 468 × 542).
