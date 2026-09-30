Français · [English](README.md)

# www.acolad.fr

Site personnel de Raphaël Apard — Développeur web & solutions IA (Toulouse / Revel).

Un site **Astro** statique dont le contenu, en français et en anglais, s'édite dans **Payload CMS**.

## Architecture

```
 éditeurs ──► Payload CMS (apps/cms, Node, SQLite) ◄── formulaire de contact (POST /api/contact)
                    │  API REST, lue au moment du build
                    ▼
             build Astro (apps/web) ──► apps/web/dist/ ──► hébergement Apache
```

- **Le site est statique.** `pnpm build` lit le CMS une fois et écrit du HTML simple ; l'hébergeur web ne
  fait tourner qu'Apache.
- **Le CMS est une application Node à part** (Payload 3 sur Next.js) et a besoin de son propre
  hébergement Node. Après une modification de contenu, il faut reconstruire et renvoyer le site.
- **Le formulaire de contact** est le seul appel en direct du site : il envoie le message au CMS, qui le
  range et envoie un e-mail de notification. En cas d'échec, le client mail du visiteur s'ouvre à la place.

## Démarrage

Nécessite Node.js ≥ 22.12 et pnpm.

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env   # puis renseigner PAYLOAD_SECRET (openssl rand -hex 32)
cp apps/web/.env.example apps/web/.env
pnpm seed                                # charge le contenu et les images du site
pnpm dev                                 # CMS sur :3000, site sur :4321
```

Crée ton compte admin sur <http://localhost:3000/admin>, ou renseigne `SEED_ADMIN_EMAIL` et
`SEED_ADMIN_PASSWORD` dans `apps/cms/.env` avant `pnpm seed` pour qu'il soit créé automatiquement.

`pnpm seed` ne s'exécute que sur un CMS vide. `pnpm seed -- --reset` efface d'abord le contenu et les
images, jamais les messages ni les utilisateurs.

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

## Organisation du projet

```
apps/cms/                    Payload CMS (admin sur :3000/admin)
  src/collections/           pages, collections de contenu, bibliothèques d'images, messages, utilisateurs
  src/blocks/                les sections dont une page est faite
  src/globals/               réglages du site et textes de l'interface
  src/endpoints/             POST /api/contact
  src/migrations/            migrations de la base
  src/seed/                  contenu initial (français et anglais) et script de seed
apps/web/                    site Astro (:4321)
  src/lib/                   client du CMS, modèle de pages (URL, menu, hreflang), SEO, JSON-LD, sitemap, images
  src/layouts/, components/  layout de base, header, éléments partagés
  src/components/blocks/     un composant par type de section
  src/views/PageView.astro   affiche une page section par section
  src/pages/                 une page par page du CMS et par langue, 404, sitemap.xml
  src/styles/global.css      la feuille de style, insérée au build
  public/                    polices, icônes, cartes de partage, robots.txt, .htaccess
docs/                        guides d'édition du contenu et de déploiement
```

## Documentation

- [Éditer le contenu](docs/content-editing.fr.md) — pages et sections, collections, images, ajouter une page
- [Déploiement](docs/deployment.fr.md) — héberger le CMS, construire et envoyer le site, sauvegardes
- [Changelog](CHANGELOG.md) — ce qui change à chaque version (en anglais)
