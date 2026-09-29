[Français](README.fr.md) · English

# www.acolad.fr — plain HTML/CSS/JS (branch `develop`)

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).

This branch is the **framework-free** version of the site: hand-written HTML, one
CSS file and a few lines of JavaScript. A small Node script prepares the files for
production (inlined CSS, responsive images). The Next.js version lives on `main`.

## Structure

```
index.html            French home (/)
services/ projets/ clients/ parcours/ contact/
                      French section pages (/services/, /projets/, …), one index.html each
en/index.html         English home (/en/)
en/services/ work/ clients/ background/ contact/
                      English section pages (/en/services/, /en/work/, …)
404.html              Not found page
css/style.css         All styles (source — inlined and minified at build time)
js/main.js            Mobile menu, project lightbox, work filter, contact form
assets/
  clients/*.webp      Client logos (source images)
  fonts/*.woff2       Geist & Geist Mono, latin subset (self-hosted, SIL OFL)
  favicon.svg, apple-touch-icon.png, og-fr.png, og-en.png
robots.txt, sitemap.xml
.htaccess             Apache: HTTPS/www redirect, 404, security headers, caching, compression
scripts/build.mjs     Production build -> dist/
```

## Commands

Requires Node.js ≥ 20.11 and pnpm (or npm).

```bash
pnpm install     # installs sharp (image processing, build only)
pnpm dev         # serve the source files      -> http://localhost:3000
pnpm build       # build the production site   -> dist/
pnpm preview     # serve dist/                  -> http://localhost:3000
```

The source files work without building, so `pnpm dev` is enough while editing.

## What the build does

- **CSS:** `css/style.css` is minified and inlined in a `<style>` tag in every page,
  removing the render-blocking stylesheet request.
- **Images:** every `<img>` with a `sizes` attribute and a raster `src` in `/assets/`
  becomes a `<picture>`: WebP at several widths (capped by the source width) plus a
  fallback for old browsers — PNG for transparent images, JPEG otherwise.
- Everything else is copied as is.

## Deployment

Run `pnpm build`, then upload the **contents of `dist/`** (including the hidden
`.htaccess`) to the web root of the server (`www/` or `public_html/`).

## Editing guide

- **Copy** lives directly in the HTML files. Every page exists in French and in
  English: keep each pair in sync, including `<title>`, meta description, Open Graph
  tags and JSON-LD.
- **Home vs section pages:** the home shows a summary of each section and ends it with
  a "see all" link to the matching section page. On the home, the desktop menu goes to
  the section pages while the mobile menu keeps the in-page anchors.
- **New page:** add its folder (FR and EN), list the folder in `SITE_FILES` of
  `scripts/build.mjs`, and add both URLs to `sitemap.xml`.
- **Work page:** the filter buttons ship `hidden` and are revealed by `js/main.js`;
  each project row carries a `data-category` (`web` or `ia`).
- **Contact form:** there is no backend. `js/main.js` opens the visitor's mail client
  (`mailto:`) with the message filled in and shows a confirmation; without JavaScript
  the form falls back to a plain `mailto:` action.
- **JS changes:** bump the `?v=N` query of `/js/main.js?v=N` in every HTML file
  (cached for a year). CSS is inlined, so it needs no versioning.
- **Images:** add the source image in `assets/` (at least 2× its largest rendered
  size), then write a plain `<img>` with `width`, `height`, `alt`, `loading="lazy"`
  (below the fold) and an accurate `sizes` — the build generates the rest.
  Use a new file name when replacing an image.
- **Mobile menu:** native Popover API (`popovertarget` / `popover`), no JavaScript
  needed to open it. Browsers without support show the links inline.
- **SEO:** update `sitemap.xml` `<lastmod>` when content changes.
