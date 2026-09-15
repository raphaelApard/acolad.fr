# www.acolad.fr — plain HTML/CSS/JS (branch `dev`)

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).

This branch is the **framework-free** version of the site: hand-written HTML, one
CSS file and a few lines of JavaScript. No build step, no dependencies.
The Next.js version lives on `main`.

## Structure

```
index.html            French page (/)
en/index.html         English page (/en/)
404.html              Not found page
css/style.css         All styles (fonts, layout, components, mobile)
js/main.js            Closes the mobile menu after a link is chosen
assets/
  clients/*.webp      Client logos (pre-sized WebP)
  fonts/*.woff2       Geist & Geist Mono, latin subset (self-hosted, SIL OFL)
  favicon.svg, apple-touch-icon.png, og-fr.png, og-en.png
robots.txt, sitemap.xml
.htaccess             Apache: HTTPS/www redirect, 404, security headers, caching, compression
```

## Local preview

Serve the repository root with any static server, for example:

```bash
python3 -m http.server 8000   # http://localhost:8000
# or
npx serve .
```

## Deployment

Upload the site files (everything except `README.md` and `.gitignore`, including the
hidden `.htaccess`) to the web root of the server (`www/` or `public_html/`).

## Editing guide

- **Copy** lives directly in `index.html` (FR) and `en/index.html` (EN): keep both
  pages in sync, including `<title>`, meta description, Open Graph tags and JSON-LD.
- **CSS/JS changes:** bump the `?v=N` query in both HTML files
  (`/css/style.css?v=N`, `/js/main.js?v=N`) — these files are cached for a year.
- **Images:** export WebP at ~2× the rendered size, set `width`/`height` attributes and
  `loading="lazy"` below the fold. Use a new file name when replacing an image.
- **Mobile menu:** native Popover API (`popovertarget` / `popover`), no JavaScript
  needed to open it. Browsers without support show the links inline.
- **SEO:** update `sitemap.xml` `<lastmod>` when content changes.
