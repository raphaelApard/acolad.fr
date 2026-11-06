[Version française](README.fr.md)

# Raphaël Apard — one-page site

Static, bilingual (French at `/`, English at `/en/`) one-page site built with [Astro](https://astro.build)
from the validated design handoff in [`design/`](design/README.md). Its content is edited in a
[Payload](https://payloadcms.com) back office (`cms/`) and pulled before each build.

## Requirements

- Node.js 22.18+ (the content script runs TypeScript directly)
- pnpm 10

## Scripts

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm content:pull` | Fetch the content and its images from the CMS (`PAYLOAD_URL`, default http://localhost:3000) |
| `pnpm content:fixture` | Use the test data in `fixtures/` instead (no CMS needed) |
| `pnpm dev` | Dev server on http://localhost:4321 |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm check` | Type-check Astro and TypeScript files |
| `pnpm test` | Unit tests (test data, CMS-to-site mapping) |
| `pnpm test:e2e` | Copies the test data, builds, serves and runs Playwright on desktop (1440) and mobile (390), axe WCAG AA included |
| `pnpm cms <script>` | Run a script of the back office: `dev`, `build`, `start`, `generate:types`, `migrate`… |
| `pnpm deploy:prod` | Tests, fetches the content, builds and syncs `dist/` to production (see Deployment) |
| `pnpm deploy:dry` | Same, but only lists what would change on the server |

`pnpm dev` and `pnpm build` need the content first: run `pnpm content:pull` (CMS running) or
`pnpm content:fixture`. First e2e run: `pnpm exec playwright install chromium`.

## Structure

```
cms/              Payload back office (Next.js app, SQLite): collections, globals, section blocks
fixtures/         test data in the site's shape (fr.json, en.json, media/)
scripts/          content.ts (pull from the CMS or copy the fixtures), deploy scripts
src/content/      types.ts (shape of the content), cms.ts (CMS documents → content), index.ts (loader),
                  data/ (pulled content, git-ignored), business.ts (company facts)
src/styles/       tokens.css (from the design), global.css (base and shared utilities)
src/layouts/      Base.astro (head, SEO, hreflang, fonts)
src/components/   one component per section; TimelineRow renders missions and experience
src/scripts/      disclosure.ts (mobile accordions)
src/pages/        [...lang].astro (the page: `/` in French, `/en/` in English),
                  mentions-legales.astro and en/legal-notice.astro (LegalPage component),
                  404.astro and en/404.astro (NotFoundPage, served by Apache's ErrorDocument)
src/assets/       media/ (pulled images, git-ignored), optimised at build time
src/lib/          images.ts (resolves content image paths to src/assets)
public/           copied as is (.htaccess, whose CSP gets its script hashes at build time)
integrations/     csp-script-hashes.mjs (writes those hashes)
tests/            unit (Vitest) and e2e (Playwright)
```

## Editing content

Content is edited in the back office (`pnpm cms dev`, then http://localhost:3000/admin), in French
and English (locale switch at the top of each document):

- **Home page**: the hero, then the sections as blocks (expertise, AI band, client logos, skills,
  missions, other experience, certifications). Drag them to reorder; each kind is used once.
  Numbered titles ("01", "02"…) follow the page order; a section with a menu label is in the menu.
- **Missions**, **Experience**, **Other projects**: one document each, picked and ordered by
  their section on the home page.
- **Companies**: name and logo, shared by the logo band, missions and experience. A mission can
  show another name than its company's ("Displayed name").
- **Site settings** (SEO, e-mail and profiles, footer, interface labels), **Legal notice**,
  **404 page**. Legal paragraphs are trusted HTML (links, `<strong>`, `<code>`); keep them in step
  with the company registration, the host and the Matomo settings.

`pnpm content:pull` turns the CMS documents into `src/content/data/<lang>.json` (shape:
`src/content/types.ts`, mapping: `src/content/cms.ts`) and downloads the images to
`src/assets/media/`. Optional fields render nothing when empty. Section anchors are fixed in the
components (`sectionAnchors`), identical in every locale. Routes (legal notice, 404) are files in
`src/pages`, so their paths are in `cms.ts`, not in the CMS.

`fixtures/` holds a copy of the content in the same shape, used by the tests (and the live content
until the CMS is in production). Refresh it from a running CMS with `node scripts/content.ts pull --fixtures`.

The home pages carry JSON-LD (`src/components/JsonLd.astro`): a `Person` and the
`ProfessionalService` they run, built from the content plus the company facts in
`src/content/business.ts` (legal name, address, VAT number).

After a change to the content model (`cms/src/`), run `pnpm cms generate:types` (the site imports
`cms/src/payload-types.ts`) and `pnpm cms generate:importmap` when admin components change.

## Layout rules

- One breakpoint at 960px. Below it grids stack, the nav moves behind the menu button,
  missions / other projects / experience become accordions and skill groups show one line
  with a toggle only when the chips overflow.
- Breakpoint-specific markup uses `.desktop-only` / `.mobile-only` (hidden with
  `display: none`, so it never duplicates content for screen readers). Do not give an element
  carrying these classes its own `display` rule: wrap it instead.
- Panels collapse only once JS has run (`html.js`), so content stays readable without JS.

## Performance

- Fonts go through Astro's Fonts API (`fonts` in `astro.config.mjs`): Latin woff2 files only,
  every face preloaded (no request chain behind the HTML), metric-matched fallbacks so the swap does not shift the layout.
- Images go through `astro:assets`: screenshots and portrait get a `srcset` (WebP), logos are
  resized to their display height at 1x and 2x. Below-the-fold images are lazy-loaded.
  Logos sit on white tiles, so their sources have no transparency: an alpha channel more than
  doubles the WebP size.
- CSS is inlined in each page (`build.inlineStylesheets`), so nothing blocks the first render.

## Deployment

`pnpm deploy:prod` (`scripts/deploy.sh`) runs the tests, builds and syncs `dist/` (including the hidden `.htaccess`)
to the o2switch hosting with `rsync --delete`. It holds the real server settings, so it is
git-ignored: create it with `cp scripts/deploy.example.sh scripts/deploy.sh` and fill in
`REMOTE_USER`, `REMOTE_HOST`, `REMOTE_PATH`, and where the content comes from: `CONTENT_SOURCE=cms`
with `PAYLOAD_URL`, or `CONTENT_SOURCE=fixture` (`fixtures/`) while the CMS is not in production. Your IP must be allowed in cPanel
(SSH access) first. It shows the changes and asks before syncing; `pnpm deploy:dry` stops after
the listing, `pnpm deploy:prod --yes` skips the prompt. Host-managed files (`.well-known/`, `cgi-bin/`, `.user.ini`,
`error_log`) are never touched.
`public/.htaccess` is the production config, copied as is into the build:
o2switch PageSpeed (do not edit that block), a single 301 from plain HTTP and from the bare
`acolad.fr` to `https://www.acolad.fr` with the same path (`X-Forwarded-Proto` is honoured so a
TLS-terminating proxy cannot cause a loop), a 301
from the former `/fr/` and the former site's pages to `/` (`/projets/*` to `#missions`, `/services/`
to `#domaines`, `/contact/` to `#contact`, `/politique-confidentialite/` to the legal notice), a 302 from `/` to `/en/` for browsers
whose first language is English (skipped when the visitor picked French with the language switch,
which sets a `lang` cookie, came from the site itself, or is a crawler or an audit tool such as
Lighthouse), and cache headers: one year, immutable, for the fingerprinted `/_astro/`
files, one week for the favicons, `no-cache` for pages, sitemap and robots.txt,
`Vary: Accept-Language, Cookie` on `/`.
It also sends the security headers (HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, COOP and a Content-Security-Policy). The CSP has no `'unsafe-inline'` for
scripts: `integrations/csp-script-hashes.mjs` writes the SHA-256 of every inline script into
`dist/.htaccess` after each build, and an e2e test checks that none is missing. A new external
script or tracker origin has to be added to the CSP by hand. Check the grade on
[securityheaders.com](https://securityheaders.com/?q=www.acolad.fr) after deploying.
The production URL is set in `astro.config.mjs` (`site`) and drives canonical, hreflang and
sitemap URLs. `/sitemap.xml` (`src/pages/sitemap.xml.ts`) lists both locales with their hreflang
alternates; `/robots.txt` (`src/pages/robots.txt.ts`) points crawlers at it. The former
`sitemap-index.xml` and `sitemap-0.xml` 301 to `/sitemap.xml`.
The Matomo tracker (`stats.acolad.net`, site 8) is `src/scripts/matomo.ts`, loaded by
`src/layouts/Base.astro` and minified at build time; it only runs in production builds and the e2e
tests block its requests. The script is loaded from
`stats.acolad.net/js/` (same file as `matomo.js`, cached for 10 days) after the page `load` event.

## Open items

- [ ] Proofread `src/content/en.json` (translated from the French copy).
- [ ] Sharper portrait source (current one is 468 × 542).
