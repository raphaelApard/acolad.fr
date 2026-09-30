[Français](README.fr.md) · English

# www.acolad.fr — Astro + Payload CMS

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).

The site is built with **Astro** (static pages) fed by **Payload CMS** (content, in French and
English). Since 2.0.0 it replaces the plain HTML/CSS/JS version (1.x), with the same pages, URLs and
look.

## How it fits together

```
 editors ──► Payload CMS (apps/cms, Node, SQLite) ◄── contact form (POST /api/contact)
                    │  REST API, read at build time
                    ▼
             Astro build (apps/web) ──► apps/web/dist/  ──► uploaded to the Apache host
```

- The **site is static**: `pnpm build` reads the CMS once and writes plain HTML. Nothing runs on the
  web host but Apache.
- The **CMS is a separate Node app** (Payload 3 on Next.js). It needs a Node host; it cannot run on the
  static host. After editing content, rebuild and upload the site.
- The contact form is the only live call from the public site: it posts to the CMS, which stores the
  message in an inbox and emails a notification. If that fails, the visitor's mail client opens instead.

## Structure

```
apps/cms/                 Payload CMS (admin panel on :3000/admin)
  src/collections/        pages, services, projects, clients, jobs, skill-groups, logos, project-images, messages, users
  src/blocks/             the sections a page is made of (hero, services, projects, contact form, …)
  src/globals/            site settings and interface labels
  src/endpoints/          POST /api/contact
  src/migrations/         database migrations (production)
  src/seed/               the current site content in French and English, and the seed script
apps/web/                 Astro site (:4321)
  src/lib/                CMS client, page model (URLs, menu, hreflang), SEO head, JSON-LD, sitemap, images
  src/layouts/ components/   base layout, header, shared pieces
  src/components/blocks/  one component per kind of section
  src/views/PageView.astro   renders a page by walking its sections
  src/pages/              [...slug].astro (one page per CMS page and language), 404, sitemap.xml
  src/styles/global.css   the stylesheet, inlined in every page at build time
  public/                 fonts, icons, social cards, robots.txt, .htaccess
docs/                     content editing and deployment guides
```

## Quick start

Requires Node.js ≥ 22.12 and pnpm.

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env   # then set PAYLOAD_SECRET (openssl rand -hex 32)
cp apps/web/.env.example apps/web/.env
pnpm seed                                # loads the current content (see below)
pnpm dev                                 # CMS on :3000, site on :4321
```

Create your admin account at <http://localhost:3000/admin> (or set `SEED_ADMIN_EMAIL` and
`SEED_ADMIN_PASSWORD` in `apps/cms/.env` before `pnpm seed` to have it created for you).

`pnpm seed` fills an empty CMS with the content and images of the legacy site. It refuses to run on a
CMS that already has content; `pnpm seed -- --reset` wipes pages, services, projects, clients, jobs, skills
and images first (never messages or users).

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

## Documentation

- [Editing content](docs/content-editing.md) — pages and sections, collections, images, adding a page
- [Deployment](docs/deployment.md) — hosting the CMS, building and uploading the site, backups

## Differences with the plain HTML version (1.x)

Same pages, URLs, markup and layout (checked page by page, on desktop and phone widths). What changed:

- The content lives in the CMS; the head, header, footer and JSON-LD are built once instead of being
  copied into 12 files.
- Pages are documents of one generic collection, each made of sections chosen from a fixed set of blocks.
  URLs, the menu, hreflang alternates and the sitemap come from those documents, so a page can be added
  or reordered from the admin without touching the code.
- The contact form posts to the CMS (with a mailto: fallback) instead of only opening the mail client,
  and has a hidden honeypot field.
- `sitemap.xml` is generated (dates come from the last content edit); the copyright year and the number
  of clients are computed.
- The stack chips of the home page follow the grouped order of the background page (GraphQL moves up).
- `a: hover` in the stylesheet was invalid CSS and is fixed.
- The Open Graph images under `apps/web/public/assets/` are unchanged (they still show an older tagline).
