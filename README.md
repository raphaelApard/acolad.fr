# www.acolad.fr — plain HTML/CSS/JS (branch `dev`)

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).

This branch is the **framework-free** version of the site: hand-written HTML, one
CSS file and a few lines of JavaScript. A small Node script prepares the files for
production (inlined CSS, responsive images). The Next.js version lives on `main`.

## Structure

```
index.html            French page (/)
en/index.html         English page (/en/)
404.html              Not found page
css/style.css         All styles (source — inlined and minified at build time)
js/main.js            Closes the mobile menu after a link is chosen
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

### Automatic (GitHub Actions → o2switch)

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the site, adds
the runner IP to the o2switch SSH whitelist (cPanel API), uploads `dist/` with
`rsync` over SSH (files removed from the site are deleted on the server), then
removes the IP from the whitelist. It can also be started manually from the
**Actions** tab.

One-time setup:

1. **SSH key** — generate a key dedicated to deployment:
   `ssh-keygen -t ed25519 -C "github-deploy-acolad" -f ~/.ssh/acolad_deploy -N ""`.
   In cPanel → **Accès SSH** → *Gérer les clés SSH*, import `acolad_deploy.pub`
   and authorize it.
2. **API token** — cPanel → **Gérer les jetons d'API** → create a token.
3. **Secrets** — add them to the repository (or to the `production` environment):

   ```bash
   gh secret set O2SWITCH_HOST --body "myserver.o2switch.net"
   gh secret set O2SWITCH_USER --body "cpanel-login"
   gh secret set O2SWITCH_CPANEL_TOKEN --body "API-TOKEN"
   gh secret set O2SWITCH_DEPLOY_PATH --body "/home/cpanel-login/public_html"
   gh secret set O2SWITCH_SSH_PRIVATE_KEY < ~/.ssh/acolad_deploy
   # Optional but recommended: pin the server host key
   ssh-keyscan myserver.o2switch.net | gh secret set O2SWITCH_SSH_KNOWN_HOSTS
   ```

`O2SWITCH_DEPLOY_PATH` must be the document root of www.acolad.fr only: rsync deletes
anything in that folder that is not part of the site (except `.well-known/`,
`cgi-bin/` and `.user.ini`). The o2switch whitelist accepts at most 5 IPs; the
workflow always removes the runner IP at the end.

### Manual

Run `pnpm build`, then upload the **contents of `dist/`** (including the hidden
`.htaccess`) to the web root of the server (`www/` or `public_html/`).

## Editing guide

- **Copy** lives directly in `index.html` (FR) and `en/index.html` (EN): keep both
  pages in sync, including `<title>`, meta description, Open Graph tags and JSON-LD.
- **JS changes:** bump the `?v=N` query of `/js/main.js?v=N` in both HTML files
  (cached for a year). CSS is inlined, so it needs no versioning.
- **Images:** add the source image in `assets/` (at least 2× its largest rendered
  size), then write a plain `<img>` with `width`, `height`, `alt`, `loading="lazy"`
  (below the fold) and an accurate `sizes` — the build generates the rest.
  Use a new file name when replacing an image.
- **Mobile menu:** native Popover API (`popovertarget` / `popover`), no JavaScript
  needed to open it. Browsers without support show the links inline.
- **SEO:** update `sitemap.xml` `<lastmod>` when content changes.
