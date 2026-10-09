# Changelog

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
