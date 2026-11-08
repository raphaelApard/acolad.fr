[English version](README.md)

# Raphaël Apard — site one-page

Site one-page statique et bilingue (français sur `/`, anglais sur `/en/`) construit avec [Astro](https://astro.build)
à partir de la maquette validée dans [`design/`](design/README.fr.md). Son contenu est saisi dans le
**backoffice Acolad**, le CMS [Payload](https://payloadcms.com) multi-tenant partagé par tous les sites
clients (tenant `acolad`, collections `acolad-v2-*`), et récupéré avant chaque build.

## Prérequis

- Node.js 22.18+ (le script de contenu exécute directement du TypeScript)
- pnpm 10

## Scripts

| Commande | Rôle |
|---|---|
| `pnpm install` | Installe les dépendances |
| `pnpm content:pull` | Récupère le contenu et ses images depuis le backoffice (`PAYLOAD_URL`, par défaut http://localhost:3000 ; `PAYLOAD_TENANT`, par défaut `acolad`) |
| `pnpm content:fixture` | Utilise à la place les données de test de `fixtures/` (sans CMS) |
| `pnpm dev` | Serveur de dev sur http://localhost:4321 |
| `pnpm build` | Build statique dans `dist/` |
| `pnpm preview` | Sert `dist/` en local |
| `pnpm check` | Vérification des types Astro et TypeScript |
| `pnpm test` | Tests unitaires (données de test, conversion CMS → site) |
| `pnpm test:e2e` | Copie des données de test, build, serveur et Playwright en desktop (1440) et mobile (390), axe WCAG AA inclus |
| `pnpm sync:cms-types` | Copie les types du contenu depuis le backoffice (à côté de ce dépôt, ou `BACKOFFICE_DIR`) |
| `pnpm cms <script>` | Lance un script de l'ancien back-office autonome (`cms/`, voir plus bas) |
| `pnpm deploy:prod` | Tests, récupération du contenu, build et synchronisation de `dist/` vers la prod (voir Déploiement) |
| `pnpm deploy:dry` | Idem, mais liste seulement ce qui changerait sur le serveur |

`pnpm dev` et `pnpm build` ont besoin du contenu : lancer d'abord `pnpm content:pull` (CMS démarré)
ou `pnpm content:fixture`. Premier lancement e2e : `pnpm exec playwright install chromium`.

## Structure

```
cms/              ancien back-office Payload autonome, que le site ne lit plus
fixtures/         données de test au format du site (fr.json, en.json, media/)
scripts/          content.ts (récupère depuis le CMS ou copie les fixtures), scripts de déploiement
src/content/      types.ts (forme du contenu), cms.ts (documents CMS → contenu), index.ts (chargement),
                  payload-types.ts (copié depuis le backoffice),
                  data/ (contenu récupéré, ignoré par git), business.ts (infos société)
src/styles/       tokens.css (issu du design), global.css (base et utilitaires partagés)
src/layouts/      Base.astro (head, SEO, hreflang, polices)
src/components/   un composant par section ; TimelineRow affiche missions et expériences
src/scripts/      disclosure.ts (accordéons mobiles)
src/pages/        [...lang].astro (la page : `/` en français, `/en/` en anglais),
                  mentions-legales.astro et en/legal-notice.astro (composant LegalPage),
                  404.astro et en/404.astro (NotFoundPage, servie par l'ErrorDocument d'Apache)
src/assets/       media/ (images récupérées, ignorées par git), optimisées au build
src/lib/          images.ts (relie les chemins d'images du contenu à src/assets)
public/           copié tel quel (.htaccess, dont la CSP reçoit les empreintes des scripts au build)
integrations/     csp-script-hashes.mjs (écrit ces empreintes)
tests/            unitaires (Vitest) et e2e (Playwright)
```

## Modifier le contenu

Le contenu se saisit dans le backoffice Acolad (`/admin`, tenant `acolad`), en
français et en anglais (sélecteur de langue en haut de chaque document) :

- **Page d'accueil** : l'en-tête, puis les sections en blocs (domaines, bande IA, logos clients,
  compétences, missions, autres expériences, certifications). Glisser pour réordonner ; chaque
  type ne sert qu'une fois. Les titres numérotés (« 01 », « 02 »…) suivent l'ordre de la page ;
  une section avec un libellé de menu apparaît dans le menu.
- **Missions**, **Expériences**, **Autres projets** : un document chacun, choisis et ordonnés par
  leur section sur la page d'accueil.
- **Entreprises** : nom et logo, partagés par le bandeau de logos, les missions et les expériences.
  Une mission peut afficher un autre nom que celui de son entreprise (« Nom affiché »).
- **Réglages du site** (SEO, e-mail et profils, pied de page, libellés d'interface), **Mentions
  légales**, **Page 404**. Les paragraphes des mentions sont du HTML de confiance (liens,
  `<strong>`, `<code>`) ; à tenir à jour avec l'immatriculation, l'hébergeur et les réglages Matomo.

`pnpm content:pull` transforme les documents du CMS en `src/content/data/<lang>.json` (forme :
`src/content/types.ts`, conversion : `src/content/cms.ts`) et télécharge les images dans
`src/assets/media/`. Les champs optionnels vides n'affichent rien. Les ancres de section sont
fixées dans les composants (`sectionAnchors`), identiques dans chaque langue. Les routes (mentions
légales, 404) sont des fichiers de `src/pages` : leurs chemins sont dans `cms.ts`, pas dans le CMS.

`fixtures/` contient une copie du contenu au même format, utilisée par les tests (et contenu en
ligne tant que le CMS n'est pas en production). La rafraîchir depuis un CMS démarré avec `node scripts/content.ts pull --fixtures`.

Les pages d'accueil portent du JSON-LD (`src/components/JsonLd.astro`) : un `Person` et le
`ProfessionalService` qu'il dirige, construits à partir du contenu et des informations de la
société dans `src/content/business.ts` (raison sociale, adresse, TVA).

Le modèle de contenu vit dans le backoffice (`src/sites/acolad-v2/`), où les anciens globals sont un
document par tenant. Après un changement, lancer `pnpm sync:cms-types` et commiter
`src/content/payload-types.ts`. Le panneau « Publier acolad.fr » du tableau de bord lance la commande
définie dans `ACOLAD_V2_PUBLISH_COMMAND` côté backoffice.

`cms/` est l'ancien back-office autonome. Il n'a jamais contenu le contenu en ligne (c'était
`fixtures/`, importé dans le backoffice) et le site ne le lit plus.

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
- Les images passent par `astro:assets` : les captures ont un `srcset` (WebP), les logos
  sont redimensionnés à leur hauteur d'affichage en 1x et 2x. Les images sous la ligne de
  flottaison sont chargées en différé.
  Les logos sont posés sur des tuiles blanches : leurs sources n'ont pas de transparence, un canal
  alpha fait plus que doubler le poids du WebP.
- Le CSS est inliné dans chaque page (`build.inlineStylesheets`) : rien ne bloque le premier rendu.

## Déploiement

`pnpm deploy:prod` (`scripts/deploy.sh`) lance les tests, build et synchronise `dist/` (y compris le fichier caché
`.htaccess`) vers l'hébergement o2switch avec `rsync --delete`. Il contient les vrais paramètres
du serveur, il est donc ignoré par git : le créer avec
`cp scripts/deploy.example.sh scripts/deploy.sh` et renseigner `REMOTE_USER`, `REMOTE_HOST`,
`REMOTE_PATH` et la source du contenu : `CONTENT_SOURCE=cms` avec `PAYLOAD_URL`, ou
`CONTENT_SOURCE=fixture` (`fixtures/`) tant que le CMS n'est pas en production. Ton IP doit d'abord être autorisée dans cPanel (Accès SSH). Le script affiche
les changements et demande confirmation avant d'envoyer ; `pnpm deploy:dry` s'arrête après la
liste, `pnpm deploy:prod --yes` saute la confirmation. Les fichiers gérés par l'hébergeur (`.well-known/`, `cgi-bin/`,
`.user.ini`, `error_log`) ne sont jamais touchés.
`public/.htaccess` est la configuration de production, copiée telle
quelle dans le build : PageSpeed o2switch (ne pas modifier ce bloc), une seule 301 du HTTP et du domaine nu
`acolad.fr` vers `https://www.acolad.fr` en gardant le chemin (`X-Forwarded-Proto` est pris en
compte pour qu'un proxy qui termine le TLS ne provoque pas de boucle), des 301 de l'ancienne `/fr/` et des pages de l'ancien site vers `/` (`/projets/*` vers `#missions`,
`/services/` vers `#domaines`, `/contact/` vers `#contact`, `/politique-confidentialite/` vers les
mentions légales), une 302
de `/` vers `/en/` pour les navigateurs dont la première langue est l'anglais (sauf si le visiteur
a choisi le français avec le sélecteur de langue, qui pose un cookie `lang`, vient du site lui-même,
ou est un robot ou un outil d'audit comme Lighthouse), et les en-têtes de cache : un an, immutable, pour les
fichiers empreintés de `/_astro/`, une semaine pour les favicons, `no-cache` pour les pages, le
sitemap et robots.txt, `Vary: Accept-Language, Cookie` sur `/`.
Il envoie aussi les en-têtes de sécurité (HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, COOP et une Content-Security-Policy). La CSP n'autorise pas `'unsafe-inline'`
pour les scripts : `integrations/csp-script-hashes.mjs` écrit l'empreinte SHA-256 de chaque script
inline dans `dist/.htaccess` après chaque build, et un test e2e vérifie qu'il n'en manque aucune.
Une nouvelle origine de script ou de tracker doit être ajoutée à la CSP à la main. Vérifier la note
sur [securityheaders.com](https://securityheaders.com/?q=www.acolad.fr) après déploiement.
L'URL de production est définie dans `astro.config.mjs` (`site`)
et sert aux URL canonical, hreflang et sitemap. `/sitemap.xml` (`src/pages/sitemap.xml.ts`)
liste les deux langues avec leurs alternates hreflang ; `/robots.txt` (`src/pages/robots.txt.ts`)
l'indique aux robots. Les anciens `sitemap-index.xml` et `sitemap-0.xml` redirigent en 301 vers
`/sitemap.xml`.
Le tracker Matomo (`stats.acolad.net`, site 8) est `src/scripts/matomo.ts`, chargé par
`src/layouts/Base.astro` et minifié au build ; il ne s'exécute que dans les builds de production et
les tests e2e bloquent ses requêtes. Le script est chargé
depuis `stats.acolad.net/js/` (même fichier que `matomo.js`, en cache 10 jours) après l'événement
`load` de la page.

## Points ouverts

- [ ] Relire `src/content/en.json` (traduit depuis le français).
