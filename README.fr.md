[English version](README.md)

# Acolad Développement — site de la société

Site statique, bilingue (français sur `/`, anglais sur `/en/`) et multi-pages construit avec
[Astro](https://astro.build) : accueil, six pages de service (applications métier, TMA,
maintenance Drupal, hébergement, audit et conseil, intégration d'IA), réalisations, une étude de
cas, à propos, contact et mentions légales. Ses textes sont dans ce dépôt, dans `src/site/`.

## Prérequis

- Node.js 22.18+ (les scripts exécutent directement du TypeScript)
- pnpm 10

## Scripts

| Commande | Rôle |
|---|---|
| `pnpm install` | Installe les dépendances |
| `pnpm dev` | Serveur de dev sur http://localhost:4321 |
| `pnpm build` | Build statique dans `dist/` |
| `pnpm preview` | Sert `dist/` en local |
| `pnpm check` | Vérification des types Astro et TypeScript |
| `pnpm test` | Tests unitaires (contenu du site, routes, texte enrichi, données structurées, point d'envoi du contact) |
| `pnpm test:e2e` | Build, serveur et Playwright en desktop (1440) et mobile (390), axe WCAG AA sur chaque page |
| `pnpm deploy:prod` | Tests, build et synchronisation de `dist/` vers la prod (voir Déploiement) |
| `pnpm deploy:dry` | Idem, mais liste seulement ce qui changerait sur le serveur |

Premier lancement e2e : `pnpm exec playwright install chromium`.

## Structure

```
src/site/         le site : routes.ts (pages et leur adresse par langue), fr.ts et en.ts (textes),
                  types.ts (forme des textes), rich.ts (liens, gras et code dans le texte),
                  images.ts (captures des projets), jsonld.ts (données structurées)
src/content/      business.ts (société : raison sociale, adresse, téléphone, e-mail)
src/styles/       tokens.css (couleurs, polices, espacements), global.css (tous les styles du site)
src/layouts/      Base.astro (head, SEO, hreflang, polices, en-tête et pied de page)
src/components/   SiteHeader, SiteFooter, ProjectCard, Steps, Logo, Arrow ;
                  pages/ contient un gabarit par type de page
src/pages/        [...path].astro (toutes les pages de toutes les langues, d'après la table des routes),
                  404.astro et en/404.astro (servies par l'ErrorDocument d'Apache),
                  sitemap.xml.ts, robots.txt.ts
src/assets/site/  captures des projets, optimisées au build
src/assets/media/ logos des clients et image de la 404, optimisés au build
public/           copié tel quel (.htaccess, dont la CSP reçoit ses empreintes de scripts au build)
integrations/     csp-script-hashes.mjs (écrit ces empreintes)
tests/            unitaires (Vitest) et e2e (Playwright)
```

## Modifier le contenu

Tous les textes sont dans `src/site/fr.ts` et `src/site/en.ts`, deux objets de même structure
(`src/site/types.ts` ; un test unitaire les compare). Le français est la source, l'anglais sa
traduction.

- **Pages et adresses** : `src/site/routes.ts`. Une nouvelle page demande une entrée dans cette
  table, ses textes dans les deux langues et un gabarit dans `src/components/pages/`, branché dans
  `src/pages/[...path].astro`. L'en-tête, le pied de page, le sitemap, les liens hreflang et le
  sélecteur de langue suivent la table des routes.
- **Services** : `services` dans les textes, une entrée par service avec les mêmes champs (hero,
  périmètre, déroulé, une « vitrine » de projets, de cartes ou de formules, FAQ). Leur ordre et
  leurs numéros (« 01 » à « 06 ») sont ceux de `serviceIds` dans `routes.ts`.
- **Liens dans le texte** : les réponses de FAQ, les paragraphes des mentions légales et la ligne
  de confidentialité du formulaire acceptent `[libellé](page:<id>)` (une page du site, dans la
  langue courante), `[libellé](https://…)`, `[libellé](mailto:…)`, `**gras**` et `` `code` ``.
  Tout le reste est échappé.
- **Emplacements à remplir** : le texte en `[CROCHETS ET CAPITALES]` (tarifs, délais,
  localisation de l'hébergement, portrait du fondateur…) reste à écrire. Les lister avec
  `grep -n "\[[A-ZÀ-Ý]" src/site/fr.ts`. Les réponses de FAQ qui ne sont qu'un emplacement sont
  exclues des données structurées.
- **Ton** : la société, c'est une personne. Les textes ne disent jamais « nous », ne parlent pas
  d'équipe et évitent le « je » (un test unitaire vérifie la première règle).
- **Informations sur la société** (raison sociale, adresse, téléphone, e-mail, TVA) :
  `src/content/business.ts`, à garder cohérent avec les mentions légales des textes.
- **Captures d'écran** : `src/assets/site/`, déclarées dans `src/site/images.ts`.

Données structurées : les pages d'accueil décrivent le site, la société (`ProfessionalService`,
avec ses services) et son fondateur ; chaque page de service décrit le `Service` et sa `FAQPage` ;
les autres pages se décrivent comme une page du site. Toutes les pages sauf l'accueil donnent leur
fil d'Ariane.

Titres et descriptions : `pageTitle` (`src/site/index.ts`) n'ajoute le nom de la société à un
titre que si l'ensemble tient en 65 caractères ; les descriptions restent sous 160. Un test
unitaire vérifie les deux.

Image d'aperçu des pages partagées : `public/og-fr.png` et `public/og-en.png` (1200 × 630),
dessinées à partir du logo de la société (`public/logo.png`) et du titre de la page d'accueil par
`pnpm og:image`. À relancer, puis committer
les fichiers, quand ce titre ou l'identité visuelle change.

Le formulaire de contact est envoyé à `public/contact.php`, qui transmet le message par e-mail
avec `mail()` de PHP depuis l'adresse de la société (le SPF du domaine autorise le serveur
o2switch), le visiteur en `Reply-To`. La page l'envoie avec `fetch` et affiche le résultat sur
place ; sans JavaScript, le navigateur le poste et revient sur `#contact-sent` ou
`#contact-failed`. Rien n'est enregistré, sauf une empreinte de l'IP gardée une heure pour
autoriser cinq messages par heure ; un champ caché piège les robots. Les mentions légales le
disent : modifier les deux ensemble. `astro preview` n'exécute pas PHP, les tests de bout en bout
simulent donc le script.

Le destinataire est la constante `RECIPIENT` en tête de `public/contact.php` : l'adresse de la
société, la même que `business.email`. Tant qu'elle est vide, le script répond par une erreur.

## Règles de mise en page

- La page fait 1200px de large au plus, avec une gouttière de 32px (20px sous 600px). Les
  grilles sont en `auto-fit` : les cartes s'empilent d'elles-mêmes sur les petits écrans ; aucune
  page ne défile horizontalement (vérifié par les tests e2e sur chaque page).
- Sous 1200px, le menu se replie derrière un bouton, car neuf liens ne tiennent plus à côté du
  logo. Il ne se replie qu'une fois le JS exécuté (`html.js`) : il reste utilisable sans JS.
- Les styles sont de simples classes dans `src/styles/global.css` ; les composants n'ont pas de
  styles scopés.

## Performance

- Les polices passent par l'API Fonts d'Astro (`fonts` dans `astro.config.mjs`) : Inter, Space
  Grotesk et JetBrains Mono, fichiers woff2 latins auto-hébergés, les deux premières préchargées,
  polices de repli ajustées pour que le changement de police ne décale pas la mise en page.
- Les images passent par `astro:assets` : les captures ont un `srcset` (WebP) et sont chargées en
  différé sous la ligne de flottaison.
- La feuille de styles est commune à toutes les pages et mise en cache avec les autres fichiers
  de `/_astro/`.

## Déploiement

`pnpm deploy:prod` (`scripts/deploy-prod.sh`) lance les tests, build et met `dist/` en miroir (y compris le
fichier caché `.htaccess`) sur l'hébergement o2switch avec `rsync --delete`. Il contient les vrais
paramètres du serveur, il est donc ignoré par git : le créer avec
`cp scripts/deploy-prod.example.sh scripts/deploy-prod.sh` et renseigner `HOST` (un alias SSH
défini dans `~/.ssh/config`) et `REMOTE_PATH` (la racine web, relative au répertoire personnel du
compte) ; `--host` et `--path` les remplacent. Ton IP doit
d'abord être autorisée dans cPanel (Accès SSH).
Il refuse un arbre de travail avec des modifications non commitées et avertit si la branche
n'est pas `main`. Avant l'envoi il vérifie le build : les pages, les hashes CSP remplis dans
`.htaccess`, l'absence de `X-Robots-Tag`, de mot de passe et de `noindex`, l'hôte canonique, et
l'existence du répertoire distant. Il liste ensuite les changements, compte les suppressions et
demande `yes`. Après la synchro il vérifie le site en ligne : `/` et `/en/` répondent 200, les
en-têtes de sécurité sont envoyés, `http://acolad.fr/` fait une seule 301 vers
`https://www.acolad.fr/`, `robots.txt` et `sitemap.xml` répondent, et un chemin inconnu renvoie 404.
`pnpm deploy:dry` s'arrête après la liste (et ne fait qu'avertir pour les modifications non
commitées), `pnpm deploy:prod --yes` saute la confirmation mais pas les vérifications. Les
fichiers gérés par l'hébergeur (`.well-known/`, `cgi-bin/`, `.user.ini`, `error_log`) ne sont
jamais touchés.
Le script du formulaire de contact crée `contact-rate/` à côté de la racine web, pas dedans,
pour ses compteurs horaires ; les déploiements n'y touchent pas.
`public/.htaccess` est la configuration de production, copiée telle
quelle dans le build : PageSpeed o2switch (ne pas modifier ce bloc), une seule 301 du HTTP et du domaine nu
`acolad.fr` vers `https://www.acolad.fr` en gardant le chemin (`X-Forwarded-Proto` est pris en
compte pour qu'un proxy qui termine le TLS ne provoque pas de boucle), des 301 de l'ancienne `/fr/` et des pages des anciens sites (`/projets/*` et `/work/*` vers `/realisations/`,
`/services/` vers `/`, `/politique-confidentialite/` vers les
mentions légales, et les autres URL des sites Drupal et de 2004 ; la liste complète et sa vérification sont
dans [`docs/redirects.md`](docs/redirects.md)), une 301 de `…/index.html` vers l'URL du dossier, une 302
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
liste chaque page dans les deux langues avec ses alternates hreflang ; `/robots.txt` (`src/pages/robots.txt.ts`)
l'indique aux robots. Les anciens `sitemap-index.xml` et `sitemap-0.xml` redirigent en 301 vers
`/sitemap.xml`.
Le tracker Matomo (`stats.acolad.net`, site 8) est `src/scripts/matomo.ts`, chargé par
`src/layouts/Base.astro` et minifié au build ; il ne s'exécute que dans les builds de production et
les tests e2e bloquent ses requêtes. Le script est chargé
depuis `stats.acolad.net/js/` (même fichier que `matomo.js`, en cache 10 jours) après l'événement
`load` de la page.

## Points ouverts

- [ ] Relire `src/site/en.ts` (traduit depuis le français).
- [ ] Ajouter des études de cas à côté d'OVHcloud ; la page Réalisations décrit les autres projets
  pour l'instant.
