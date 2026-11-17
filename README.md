[Version française](README.fr.md)

# Acolad Développement — company site

Static, bilingual (French at `/`, English at `/en/`) multi-page site built with
[Astro](https://astro.build): home, six service pages (business applications, application
maintenance, Drupal maintenance, hosting, audit and consulting, AI integration), work, a case
study, about, contact and legal notice. Its copy lives in this repository, in `src/site/`.

## Requirements

- Node.js 22.18+ (the scripts run TypeScript directly)
- pnpm 10

## Scripts

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server on http://localhost:4321 |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm check` | Type-check Astro and TypeScript files |
| `pnpm test` | Unit tests (site content, routes, rich text, structured data, contact endpoint) |
| `pnpm test:e2e` | Builds, serves and runs Playwright on desktop (1440) and mobile (390), axe WCAG AA on every page |
| `pnpm deploy:prod` | Tests, builds and syncs `dist/` to production (see Deployment) |
| `pnpm deploy:dry` | Same, but only lists what would change on the server |

First e2e run: `pnpm exec playwright install chromium`.

## Structure

```
src/site/         the site: routes.ts (pages and their address per locale), fr.ts and en.ts (copy),
                  types.ts (shape of the copy), rich.ts (inline links, strong, code),
                  images.ts (project screenshots), jsonld.ts (structured data)
src/content/      business.ts (company facts: legal name, address, phone, e-mail)
src/styles/       tokens.css (colors, fonts, spacing), global.css (every style of the site)
src/layouts/      Base.astro (head, SEO, hreflang, fonts, header and footer)
src/components/   SiteHeader, SiteFooter, ProjectCard, Steps, Logo, Arrow;
                  pages/ holds one template per kind of page
src/pages/        [...path].astro (every page of every locale, from the route table),
                  404.astro and en/404.astro (served by Apache's ErrorDocument),
                  sitemap.xml.ts, robots.txt.ts
src/assets/site/  project screenshots, optimised at build time
src/assets/media/ client logos and the 404 image, optimised at build time
public/           copied as is (.htaccess, whose CSP gets its script hashes at build time)
integrations/     csp-script-hashes.mjs (writes those hashes)
tests/            unit (Vitest) and e2e (Playwright)
```

## Editing content

All the copy is in `src/site/fr.ts` and `src/site/en.ts`, two objects with the same structure
(`src/site/types.ts`; a unit test compares them). French is the source, English its translation.

- **Pages and addresses**: `src/site/routes.ts`. A new page needs an entry there, its copy in both
  locales and a template in `src/components/pages/`, wired in `src/pages/[...path].astro`. The
  header, footer, sitemap, hreflang links and language switch follow the route table.
- **Services**: `services` in the copy, one entry per service with the same fields (hero, what
  it covers, process, a "showcase" of projects, cards or plans, FAQ). Their order and numbers
  ("01" to "06") are those of `serviceIds` in `routes.ts`.
- **Links inside text**: FAQ answers, legal paragraphs and the form's privacy line accept
  `[label](page:<id>)` (a page of the site, in the current locale), `[label](https://…)`,
  `[label](mailto:…)`, `**strong**` and `` `code` ``. Everything else is escaped.
- **Placeholders**: text in `[SQUARE BRACKETS AND CAPITALS]` (prices, response times, hosting
  location, the founder's portrait…) still has to be written. List them with
  `grep -n "\[[A-ZÀ-Ý]" src/site/fr.ts`. FAQ answers that are only a placeholder are left out
  of the structured data.
- **Voice**: the company is one person. The copy never says "we" or speaks of a team, and
  avoids "I" (a unit test checks the first rule).
- **Company facts** (legal name, address, phone, e-mail, VAT number): `src/content/business.ts`,
  to keep in step with the legal notice in the copy.
- **Screenshots**: `src/assets/site/`, registered in `src/site/images.ts`.

Structured data: the home pages describe the site, the company (`ProfessionalService`, with its
services) and its founder; each service page describes the `Service` and its `FAQPage`; the
other pages describe themselves as a page of the site. Every page but the home page gives its
breadcrumb.

Titles and descriptions: `pageTitle` (`src/site/index.ts`) adds the company name to a title only
when both fit in 65 characters; descriptions stay within 160. A unit test checks both.

Preview image of shared pages: `public/og-fr.png` and `public/og-en.png` (1200 × 630), drawn
from the company logo (`public/logo.png`) and the home page heading by `pnpm og:image`. Run it again and commit the files when the
heading or the visual identity changes.

The contact form posts to `public/contact.php`, which e-mails the message with PHP's `mail()`
from the company address (the domain's SPF record allows the o2switch server) with the visitor
in `Reply-To`. The page sends it with `fetch` and shows the outcome in place; without JavaScript
the browser posts it and comes back to `#contact-sent` or `#contact-failed`. Nothing is stored,
apart from a hashed IP address kept one hour to allow five messages per hour; a hidden field
catches robots. The legal notice says so: change both together. `astro preview` runs no PHP, so
the end-to-end tests stand in for the script.

The recipient is the `RECIPIENT` constant at the top of `public/contact.php`: the company
address, the same as `business.email`. While it is empty, the script answers with an error.

## Layout rules

- The page is 1200px wide at most, with a 32px gutter (20px under 600px). Grids are
  `auto-fit`, so cards stack on their own on narrow screens; no page scrolls sideways (checked
  by the e2e tests on every page).
- Under 1200px the menu folds behind a button, because nine links no longer fit beside the
  logo. It folds only once JS has run (`html.js`), so it stays usable without JS.
- Styles are plain classes in `src/styles/global.css`; components carry no scoped styles.

## Performance

- Fonts go through Astro's Fonts API (`fonts` in `astro.config.mjs`): Inter, Space Grotesk and
  JetBrains Mono, self-hosted Latin woff2 files, the first two preloaded, metric-matched
  fallbacks so the swap does not shift the layout.
- Images go through `astro:assets`: screenshots get a `srcset` (WebP) and are lazy-loaded below
  the fold.
- The stylesheet is shared by every page and cached with the other `/_astro/` files.

## Deployment

`pnpm deploy:prod` (`scripts/deploy-prod.sh`) runs the tests, builds and mirrors `dist/` (including the hidden
`.htaccess`) to the o2switch hosting with `rsync --delete`. It holds the real server settings, so it
is git-ignored: create it with `cp scripts/deploy-prod.example.sh scripts/deploy-prod.sh` and set
`HOST` (an SSH alias defined in `~/.ssh/config`) and `REMOTE_PATH` (the document root, relative to
the account's home directory); `--host` and `--path` override both. Your IP must be
allowed in cPanel (SSH access) first.
It refuses a working tree with uncommitted changes and warns when the branch is not `main`.
Before uploading it checks the build: the pages, the CSP hashes filled into `.htaccess`, no
`X-Robots-Tag`, password or `noindex`, the canonical host, and that the remote directory exists.
It then lists the changes, counts the deletions and asks for `yes`. After syncing it checks the
live site: `/` and `/en/` answer 200, the security headers are sent, `http://acolad.fr/` is a
single 301 to `https://www.acolad.fr/`, `robots.txt` and `sitemap.xml` answer, and an unknown
path is a 404. `pnpm deploy:dry` stops after the listing (and only warns about uncommitted
changes), `pnpm deploy:prod --yes` skips the prompt but not the checks. Host-managed files
(`.well-known/`, `cgi-bin/`, `.user.ini`, `error_log`) are never touched.
The contact form script creates `contact-rate/` next to the web root, not inside it, for its
hourly counts; deploys never touch it.
`public/.htaccess` is the production config, copied as is into the build:
o2switch PageSpeed (do not edit that block), a single 301 from plain HTTP and from the bare
`acolad.fr` to `https://www.acolad.fr` with the same path (`X-Forwarded-Proto` is honoured so a
TLS-terminating proxy cannot cause a loop), a 301
from the former `/fr/` and the former sites' pages (`/projets/*` and `/work/*` to `/realisations/`,
`/services/` to `/`, `/politique-confidentialite/` to the legal notice, and the other
Drupal and 2004 sites' URLs; the full list and how to check it is in
[`docs/redirects.md`](docs/redirects.md)), a 301 from `…/index.html` to its directory URL, a 302 from `/` to `/en/` for browsers
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
sitemap URLs. `/sitemap.xml` (`src/pages/sitemap.xml.ts`) lists every page in both locales with its hreflang
alternates; `/robots.txt` (`src/pages/robots.txt.ts`) points crawlers at it. The former
`sitemap-index.xml` and `sitemap-0.xml` 301 to `/sitemap.xml`.
The Matomo tracker (`stats.acolad.net`, site 8) is `src/scripts/matomo.ts`, loaded by
`src/layouts/Base.astro` and minified at build time; it only runs in production builds and the e2e
tests block its requests. The script is loaded from
`stats.acolad.net/js/` (same file as `matomo.js`, cached for 10 days) after the page `load` event.

## Open items

- [ ] Proofread `src/site/en.ts` (translated from the French copy).
- [ ] Add case studies beside OVHcloud; the work page describes the other projects for now.
