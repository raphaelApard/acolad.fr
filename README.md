[Français](README.fr.md) · English

# www.acolad.fr

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).

A static **Astro** site whose content, in French and English, is edited in **Payload CMS**.

## Architecture

```
 editors ──► Payload CMS (apps/cms, Node, SQLite) ◄── contact form (POST /api/contact)
                    │  REST API, read at build time
                    ▼
             Astro build (apps/web) ──► apps/web/dist/ ──► Apache host
```

- **The site is static.** `pnpm build` reads the CMS once and writes plain HTML; the web host only runs
  Apache.
- **The CMS is a separate Node app** (Payload 3 on Next.js) and needs its own Node host. After editing
  content, rebuild and upload the site.
- **The contact form** is the only live call from the site: it posts to the CMS, which stores the
  message and emails a notification. If that fails, the visitor's mail client opens instead.

## Getting started

Requires Node.js ≥ 22.12 and pnpm.

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env   # then set PAYLOAD_SECRET (openssl rand -hex 32)
cp apps/web/.env.example apps/web/.env
pnpm seed                                # loads the site content and images
pnpm dev                                 # CMS on :3000, site on :4321
```

Create your admin account at <http://localhost:3000/admin>, or set `SEED_ADMIN_EMAIL` and
`SEED_ADMIN_PASSWORD` in `apps/cms/.env` before `pnpm seed` to have it created for you.

`pnpm seed` only runs on an empty CMS. `pnpm seed -- --reset` first wipes the content and the images,
never the messages or the users.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | CMS and site in development mode |
| `pnpm dev:cms` / `pnpm dev:web` | one of the two |
| `pnpm build` | build the site into `apps/web/dist/` (the CMS must be reachable) |
| `pnpm preview` | serve `apps/web/dist/` on :4321 |
| `pnpm seed` | load the initial content into the CMS |
| `pnpm typecheck` | TypeScript and Astro checks in both apps |
| `pnpm test` | unit tests in both apps |
| `pnpm --filter cms migrate` | apply database migrations (production) |
| `pnpm --filter cms generate:types` | regenerate `payload-types.ts` after a schema change |

## Configuration

| Variable | App | Purpose |
|---|---|---|
| `PAYLOAD_SECRET` | cms | secret used to sign sessions |
| `DATABASE_URI` | cms | SQLite file, default `file:./data/cms.db` |
| `CMS_URL` | cms | public URL of the CMS (admin links, allowed origin for the admin) |
| `SITE_URL` | cms | origin(s) of the public site allowed to call the API (CORS), comma-separated |
| `SMTP_*`, `CONTACT_FROM`, `CONTACT_TO` | cms | contact notification emails; without `SMTP_HOST` they are only logged |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | cms | optional first admin created by `pnpm seed` |
| `PAYLOAD_URL` | web | where the build reads the content |
| `PUBLIC_CONTACT_ENDPOINT` | web | contact form target, defaults to `PAYLOAD_URL/api/contact` |

## Project structure

```
apps/cms/                    Payload CMS (admin on :3000/admin)
  src/collections/           pages, content collections, image libraries, messages, users
  src/blocks/                the sections a page is made of
  src/globals/               site settings and interface labels
  src/endpoints/             POST /api/contact
  src/migrations/            database migrations
  src/seed/                  initial content (French and English) and the seed script
apps/web/                    Astro site (:4321)
  src/lib/                   CMS client, page model (URLs, menu, hreflang), SEO, JSON-LD, sitemap, images
  src/layouts/, components/  base layout, header, shared pieces
  src/components/blocks/     one component per kind of section
  src/views/PageView.astro   renders a page section by section
  src/pages/                 one page per CMS page and language, 404, sitemap.xml
  src/styles/global.css      the stylesheet, inlined at build time
  public/                    fonts, icons, social cards, robots.txt, .htaccess
docs/                        content editing and deployment guides
```

## Documentation

- [Editing content](docs/content-editing.md) — pages and sections, collections, images, adding a page
- [Deployment](docs/deployment.md) — hosting the CMS, building and uploading the site, backups
- [Changelog](CHANGELOG.md) — what changed in each version
