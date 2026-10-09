[English version](README.md)

# Raphaël Apard — site one-page

Site one-page statique et bilingue (`/fr/`, `/en/`) construit avec [Astro](https://astro.build)
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

Premier lancement e2e : `pnpm exec playwright install chromium`.

## Structure

```
src/content/      fr.json, en.json (tous les textes), types.ts (leur forme), index.ts (chargement typé)
src/styles/       tokens.css (issu du design), global.css (base et utilitaires partagés)
src/layouts/      Base.astro (head, SEO, hreflang, polices)
src/components/   un composant par section ; TimelineRow affiche missions et expériences
src/scripts/      disclosure.ts (accordéons mobiles)
src/pages/        [lang]/index.astro (la page), index.astro (redirection / → /fr/)
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
  `achievements`, `stack`, `image`, `projects`, liens de profils (`links.linkedin`,
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
  woff2 latins uniquement, Schibsted Grotesk préchargée, polices de repli ajustées pour que le
  changement de police ne décale pas la mise en page.
- Les images passent par `astro:assets` : captures et portrait ont un `srcset` (WebP), les logos
  sont redimensionnés à leur hauteur d'affichage en 1x et 2x. Les images sous la ligne de
  flottaison sont chargées en différé.
- Le CSS est inliné dans chaque page (`build.inlineStylesheets`) : rien ne bloque le premier rendu.

## Déploiement

`pnpm build`, puis envoyer le contenu de `dist/` (y compris le fichier caché `.htaccess`) sur
n'importe quel hébergement statique. Sous Apache, `public/.htaccess` ajoute une 301 de `/` vers
`/fr/`, la compression, un cache immuable d'un an pour `/_astro/` et la revalidation des pages.
Les autres hébergeurs l'ignorent et se rabattent sur la page meta-refresh de `/`. L'URL de production est définie dans `astro.config.mjs` (`site`)
et sert aux URL canonical, hreflang et sitemap.

## Points ouverts

- [ ] Confirmer l'URL de production (`site`, actuellement `https://acolad.fr`).
- [ ] URL LinkedIn, Malt et GitHub (`links` dans les deux fichiers) — masqués tant qu'absents.
- [ ] URL de vérification des certifications (`verifyUrl`) — lien « vérifier » masqué tant qu'absent.
- [ ] Relire `src/content/en.json` (traduit depuis le français).
- [ ] Portrait en meilleure définition (l'actuel fait 468 × 542).
