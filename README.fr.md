Français · [English](README.md)

# www.acolad.fr — Astro + Payload CMS (branche `feat/astro-payload`)

Site personnel de Raphaël Apard — Développeur web & solutions IA (Toulouse / Revel).

Cette branche reconstruit le site avec **Astro** (pages statiques) alimenté par **Payload CMS**
(contenu, en français et en anglais). Les pages, les URL et le rendu sont les mêmes que la version
HTML/CSS/JS pur, qui reste sur `develop` et `main`.

## Comment ça s'articule

```
 éditeurs ──► Payload CMS (apps/cms, Node, SQLite) ◄── formulaire de contact (POST /api/contact)
                    │  API REST, lue au moment du build
                    ▼
             build Astro (apps/web) ──► apps/web/dist/  ──► envoyé sur l'hébergement Apache
```

- Le **site est statique** : `pnpm build` lit le CMS une fois et écrit du HTML simple. Rien ne tourne
  sur l'hébergeur web à part Apache.
- Le **CMS est une application Node à part** (Payload 3 sur Next.js). Il lui faut un hébergement Node ;
  il ne peut pas tourner sur l'hébergement statique. Après une modification de contenu, il faut
  reconstruire et renvoyer le site.
- Le formulaire de contact est le seul appel « en direct » du site public : il envoie le message au CMS,
  qui le range dans une boîte de réception et envoie un e-mail de notification. En cas d'échec, le
  client mail du visiteur s'ouvre à la place.

## Structure

```
apps/cms/                 Payload CMS (interface d'admin sur :3000/admin)
  src/collections/        pages, services, projects, clients, jobs, skill-groups, media, messages, users
  src/blocks/             les sections dont une page est faite (hero, services, projets, formulaire, …)
  src/globals/            réglages du site et textes de l'interface
  src/endpoints/          POST /api/contact
  src/migrations/         migrations de la base (production)
  src/seed/               le contenu actuel du site en français et en anglais, et le script de seed
apps/web/                 site Astro (:4321)
  src/lib/                client du CMS, modèle de pages (URL, menu, hreflang), <head> SEO, JSON-LD, sitemap, images
  src/layouts/ components/   layout de base, header, éléments partagés
  src/components/blocks/  un composant par type de section
  src/views/PageView.astro   affiche une page en parcourant ses sections
  src/pages/              [...slug].astro (une page par page du CMS et par langue), 404, sitemap.xml
  src/styles/global.css   la feuille de style, insérée dans chaque page au build
  public/                 polices, icônes, cartes de partage, robots.txt, .htaccess
docs/                     guides d'édition du contenu et de déploiement
```

## Démarrage rapide

Nécessite Node.js ≥ 22.12 et pnpm.

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env   # puis renseigner PAYLOAD_SECRET (openssl rand -hex 32)
cp apps/web/.env.example apps/web/.env
pnpm seed                                # charge le contenu actuel (voir ci-dessous)
pnpm dev                                 # CMS sur :3000, site sur :4321
```

Crée ton compte admin sur <http://localhost:3000/admin> (ou renseigne `SEED_ADMIN_EMAIL` et
`SEED_ADMIN_PASSWORD` dans `apps/cms/.env` avant `pnpm seed` pour qu'il soit créé automatiquement).

`pnpm seed` remplit un CMS vide avec le contenu et les images de l'ancien site. Il refuse de s'exécuter
sur un CMS qui contient déjà du contenu ; `pnpm seed -- --reset` efface d'abord pages, services,
projets, clients, expériences, compétences et médias (jamais les messages ni les utilisateurs).

## Commandes

| Commande | Effet |
|---|---|
| `pnpm dev` | CMS et site en mode développement |
| `pnpm dev:cms` / `pnpm dev:web` | l'un des deux |
| `pnpm build` | construit le site dans `apps/web/dist/` (le CMS doit être joignable) |
| `pnpm preview` | sert `apps/web/dist/` sur :4321 |
| `pnpm seed` | charge le contenu initial dans le CMS |
| `pnpm typecheck` | vérifications TypeScript et Astro dans les deux apps |
| `pnpm test` | tests unitaires dans les deux apps |
| `pnpm --filter cms migrate` | applique les migrations de la base (production) |
| `pnpm --filter cms generate:types` | régénère `payload-types.ts` après un changement de schéma |

## Configuration

| Variable | App | Rôle |
|---|---|---|
| `PAYLOAD_SECRET` | cms | secret de signature des sessions |
| `DATABASE_URI` | cms | fichier SQLite, `file:./data/cms.db` par défaut |
| `CMS_URL` | cms | URL publique du CMS (liens de l'admin, origine autorisée pour l'admin) |
| `SITE_URL` | cms | origine(s) du site public autorisée(s) à appeler l'API (CORS), séparées par des virgules |
| `SMTP_*`, `CONTACT_FROM`, `CONTACT_TO` | cms | e-mails de notification du contact ; sans `SMTP_HOST` ils sont seulement journalisés |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | cms | premier admin optionnel créé par `pnpm seed` |
| `PAYLOAD_URL` | web | où le build lit le contenu |
| `PUBLIC_CONTACT_ENDPOINT` | web | cible du formulaire de contact, `PAYLOAD_URL/api/contact` par défaut |

## Documentation

- [Éditer le contenu](docs/content-editing.fr.md) — pages et sections, collections, images, ajouter une page
- [Déploiement](docs/deployment.fr.md) — héberger le CMS, construire et envoyer le site, sauvegardes

## Différences avec la version HTML pur

Mêmes pages, URL, balisage et mise en page (vérifiés page par page, en largeur bureau et téléphone).
Ce qui change :

- Le contenu vit dans le CMS ; le head, le header, le footer et le JSON-LD sont construits une fois au
  lieu d'être copiés dans 12 fichiers.
- Les pages sont des documents d'une collection générique, chacune faite de sections choisies parmi un
  jeu fixe de blocs. Les URL, le menu, les alternates hreflang et le sitemap en découlent : on peut
  ajouter ou réordonner une page depuis l'admin sans toucher au code.
- Le formulaire de contact envoie au CMS (avec repli mailto:) au lieu de seulement ouvrir le client
  mail, et comporte un champ piège (honeypot) masqué.
- `sitemap.xml` est généré (les dates viennent de la dernière modification du contenu) ; l'année du
  copyright et le nombre de clients sont calculés.
- Les pastilles de la stack de l'accueil suivent l'ordre groupé de la page parcours (GraphQL remonte).
- `a: hover` dans la feuille de style était du CSS invalide, c'est corrigé.
- Les images Open Graph dans `apps/web/public/assets/` sont inchangées (elles affichent encore une
  ancienne accroche).
