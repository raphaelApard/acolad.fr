[Version française](README.fr.md)

# Raphaël Apard — one-page site

Static, bilingual (French at `/`, English at `/en/`) one-page site built with [Astro](https://astro.build)
from the validated design handoff in [`design/`](design/README.md).

## Requirements

- Node.js 22.12+
- pnpm 10

## Scripts

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server on http://localhost:4321 |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm check` | Type-check Astro and TypeScript files |
| `pnpm test` | Unit tests (content files) |
| `pnpm test:e2e` | Builds, serves and runs Playwright on desktop (1440) and mobile (390), axe WCAG AA included |
| `pnpm deploy:prod` | Tests, builds and syncs `dist/` to production (see Deployment) |
| `pnpm deploy:dry` | Same, but only lists what would change on the server |

First e2e run: `pnpm exec playwright install chromium`.

## Structure

```
src/content/      fr.json, en.json (all copy), types.ts (their shape), index.ts (typed loader)
src/styles/       tokens.css (from the design), global.css (base and shared utilities)
src/layouts/      Base.astro (head, SEO, hreflang, fonts)
src/components/   one component per section; TimelineRow renders missions and experience
src/scripts/      disclosure.ts (mobile accordions)
src/pages/        [...lang].astro (the page: `/` in French, `/en/` in English),
                  mentions-legales.astro and en/legal-notice.astro (LegalPage component)
src/assets/       source images and logos, optimised at build time
src/lib/          images.ts (resolves content image paths to src/assets)
public/           copied as is (.htaccess, whose CSP gets its script hashes at build time)
integrations/     csp-script-hashes.mjs (writes those hashes)
tests/            unit (Vitest) and e2e (Playwright)
```

## Editing content

- All copy lives in `src/content/<lang>.json`; components never hard-code text.
- Both files must keep the same structure (enforced by `pnpm test`) and match
  `src/content/types.ts` (enforced by `pnpm check` / `pnpm build`).
- Optional fields render nothing when absent or `null`: `place`, `achievements`, `stack`,
  `image`, `projects`, `logo` (missions and experience; shown in a square tile),
  profile links (`links.linkedin`, `links.malt`, `links.github`) and
  certification `verifyUrl`.
- Image `src` values are paths under `src/assets` (e.g. `/img/portrait.webp`); intrinsic sizes
  are read from the files. Logos also need `height`, the rendered desktop height (mobile uses ×0.77).
- Section anchors (`nav[].id`) are fixed in the components and identical in every locale.
- The legal notice (`legal`) holds the publisher, host, personal data and cookie details. Its
  paragraphs are trusted HTML (links, `<strong>`, `<code>`); keep them in step with the company
  registration, the host and the Matomo settings. The cookies section ends with a Matomo opt-out
  checkbox, shown once the tracker has loaded.

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
`REMOTE_USER`, `REMOTE_HOST` and `REMOTE_PATH`. Your IP must be allowed in cPanel
(SSH access) first. It shows the changes and asks before syncing; `pnpm deploy:dry` stops after
the listing, `pnpm deploy:prod --yes` skips the prompt. Host-managed files (`.well-known/`, `cgi-bin/`, `.user.ini`,
`error_log`) are never touched.
`public/.htaccess` is the production config, copied as is into the build:
o2switch PageSpeed (do not edit that block), a 301 from `acolad.fr/` to `www.acolad.fr/`, a 301
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
