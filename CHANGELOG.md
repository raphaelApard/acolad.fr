# Changelog

## Unreleased

- Page titles fit in a search result: the long ones are shortened and stand without the company
  name, and no description goes over 160 characters (a unit test checks both).
- Shared pages show a preview image, one per language (`public/og-fr.png`, `public/og-en.png`,
  drawn by `pnpm og:image` around the company logo), as a large card.
- JSON-LD: every page but the home page gives its breadcrumb; the work, case study, about,
  contact and legal pages describe themselves as pages of the site; the company has its logo
  (`public/logo.png`) and an image.
- The sitemap dates every page: the day the copy of its language last changed, read from git at
  build time (the legal notice keeps its own date).
- `/equipe/` redirects to `/a-propos/` instead of the home page.

- The menu groups the six services under a "Services" entry that opens them as a submenu, and
  stays on one line down to 900 px wide.
- The home page shows the logos of thirteen clients in a band that scrolls in a loop on a dark
  ground, in place of the list of ten names; the band stands still as a grid when the visitor asks
  for reduced motion.
- The one-page profile becomes the multi-page site of the company, in French and English, with a
  new visual identity (Space Grotesk, Inter, navy ink and one blue accent): home, six service
  pages (business applications, application maintenance, Drupal maintenance, hosting, audit and
  consulting, AI integration), work, about, contact and legal notice. The OVHcloud case study and
  the legal notice keep their addresses.
- The copy lives in the repository (`src/site/fr.ts`, `src/site/en.ts`) and no longer comes from
  the backoffice; the CMS tooling stays in place, unused by the pages. Prices, response times and
  other facts still to be written are marked as `[PLACEHOLDERS]`.
- The copy speaks of the company in the third person: no "we", no team, no "I".
- Contact page with a form that prepares an e-mail in the visitor's mail application; nothing is
  stored on the site, and the legal notice says so.
- JSON-LD: the company with its services and its founder on the home pages, `Service` and
  `FAQPage` on each service page.
- The sitemap lists the thirteen pages of each locale.
- `/contact/` is a page again; `/projets/*` and `/work/*` redirect to `/realisations/`,
  `/services/*` to the home page ([`docs/redirects.md`](docs/redirects.md)).
- The header shows the company logo and folds its menu behind a button under 1200px.
- The content is edited in the Acolad backoffice, the multi-tenant CMS shared by every client site
  (tenant `acolad`), instead of the site's own back office. `pnpm content:pull` gives the same
  content as `fixtures/`, which were imported into it.
- The hero no longer shows a portrait; pages have no `og:image` and the JSON-LD no `image`.
- The H1, title and description target "Fullstack TypeScript freelance developer in Toulouse".
- Case study pages for missions (`/missions/<slug>/`), edited in the backoffice; OVHcloud first.
- JSON-LD: `WebSite`, `ProfilePage`, credentials, alumni, languages, home in Revel and work in
  Toulouse.
- The sitemap dates every URL and lists the legal notice and the case studies.
- Former Drupal (`/work/*`, `/node/*`, `/raphael-apard`, `/clients`) and 2004 (`/htfr/*`,
  `/plan-mappy/*`) URLs, `/services/*` and `…/index.html` redirect with a 301
  ([`docs/redirects.md`](docs/redirects.md)).
- The legal notice lists the `mtm_consent_removed` opt-out cookie, the right to set instructions
  for after one's death and the one-month answer delay.
- The AI skills group is named "IA & ingénierie" in French and "AI & engineering" in English.
- Client logos link to the company website (new `website` field on backoffice companies).
- The hero shows an "at a glance" card (status, main stack, clients, a recent project) beside the
  text, edited in the backoffice home (`hero.facts`).

## 3.3.1 — 2026-10-09

- Plain HTTP and the bare `acolad.fr` redirect to `https://www.acolad.fr` in a single 301 that keeps
  the path; the English redirect from `/` targets the HTTPS origin.

## 3.3.0 — 2026-10-09

- Security headers on every response (HSTS, nosniff, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, COOP) and a Content-Security-Policy whose script hashes are written at build
  time, so scripts need no `'unsafe-inline'`.
- Custom 404 page in French and English, with an illustration per language.
- JSON-LD on the home pages: a `Person` and the `ProfessionalService` they run.
- Titles and descriptions target Drupal, freelance and Toulouse.
- "Copy e-mail" button under the footer address.
- Former `/projets/*`, `/services/` and `/contact/` URLs redirect to their sections.
- The Matomo snippet is minified.
- The legal notice states the legal form as SASU.

## 3.2.1 — 2026-10-09

- "Back to top" scrolls again (it pointed at the sticky header, which is always in view).
- Menu anchors land with the section starting right at the bottom of the sticky header, with a
  single border line for sections that have one.
- The stuck header has a visible shadow.
- Vietnamese is removed from the languages.

## 3.2.0 — 2026-10-09

- Legal notice at `/mentions-legales/` and `/en/legal-notice/`, linked from the footer: publisher,
  publication director, host, intellectual property, personal data and cookies, with a Matomo
  opt-out. `/politique-confidentialite/` now redirects to its personal data section.

## 3.1.0 — 2026-10-09

- Other experience goes back to 2006: X-Prime Groupe, Université Toulouse 1 Capitole and the
  University of Guadalajara.
- Missions and experience show the company logo in a square tile beside the name; the screenshot
  column is narrower (240px) so descriptions get more room.
- Project screenshots open full size in a lightbox (close button, Escape or a click beside the
  image); the full-size file is only fetched on open.
- Other projects name the agency they were built through (via OWS, via Fabernovel).
- The header is sticky and shrinks from 76px to 48px once the page scrolls, without moving the
  content; the language switch is a compact sliding toggle.

## 3.0.1 — 2026-10-09

- The Matomo tracker is loaded from `stats.acolad.net/js/`, which browsers cache for 10 days
  (`matomo.js` had no cache header).

## 3.0.0 — 2026-10-09

The site becomes a static one-page résumé built with Astro, in French (`/`) and English (`/en/`),
from a new design. Payload CMS and the multi-page site are removed.

- All copy lives in two JSON files typed against a shared shape; tests keep both locales in sync.
- Mobile layout below 960px: menu button, accordions for missions, other projects and experience,
  skill groups clamped to one line.
- Fonts are self-hosted (Latin subset, preloaded heading font), images are resized per slot with
  a `srcset`, the CSS is inlined and an `.htaccess` sets caching on Apache hosts.
- `/sitemap.xml` (one file, with hreflang alternates) and `/robots.txt` are generated from the
  site URL.
- English-speaking browsers are sent from `/` to `/en/` unless the visitor picked French; the former
  `/fr/` URL 301s to `/`.
- Playwright and axe check routing, mobile interactions and WCAG AA on desktop and mobile widths.

## 2.0.0 — 2026-09-30

The site is rebuilt with Astro and its content moves to Payload CMS, in French and English. Pages, URLs,
markup and layout are the same as in 1.x (checked page by page, on desktop and phone widths).

- The content lives in the CMS; the head, header, footer and JSON-LD are built once instead of being
  copied into 12 files.
- Pages are documents of one generic collection, each made of sections chosen from a fixed set of blocks.
  URLs, the menu, hreflang alternates and the sitemap come from those documents, so a page can be added
  or reordered from the admin without touching the code.
- Images are kept in two libraries, logos and project images, each offered only by its own field.
- The contact form posts to the CMS (with a mailto: fallback) instead of only opening the mail client,
  and has a hidden honeypot field.
- `sitemap.xml` is generated (dates come from the last content edit); the copyright year and the number
  of clients are computed.
- The stack chips of the home page follow the grouped order of the background page (GraphQL moves up).
- `a: hover` in the stylesheet was invalid CSS and is fixed.
- The Open Graph images under `apps/web/public/assets/` are unchanged (they still show an older tagline).

## 1.x

The site in plain HTML, CSS and JavaScript.
