# www.acolad.fr

Personal site of Raphaël Apard — Web developer & AI solutions (Toulouse / Revel).
Built with Next.js (App Router, static export), React Server Components and CSS Modules.

## Development

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # static site in out/ (next build + scripts/postbuild.mjs)
pnpm lint
```

Set `NEXT_PUBLIC_SITE_URL` (defaults to `https://www.acolad.fr`) so canonical
URLs, hreflang links, the sitemap and Open Graph images point at the right host.

## Deployment

`pnpm build` exports a fully static site to **`out/`**. Upload the **contents** of
that folder (including the hidden `.htaccess` files) to the web root of the server
(e.g. `www/` or `public_html/`). No Node.js is needed on the server.

- `out/.htaccess` (from `public/.htaccess`): HTTPS + `www` redirect, 404 page,
  security headers, revalidation of HTML, Brotli/gzip compression.
- `out/_next/static/.htaccess` (written by the post-build step): one-year immutable
  caching for hashed CSS, fonts and images.

On Nginx, reproduce it with `try_files $uri $uri/ =404;`, `error_page 404 /404.html;`,
`gzip on;` and `add_header Cache-Control "public, max-age=31536000, immutable"` for
`/_next/static/`.

## Structure

- `src/app/(fr)/` — French root layout + page, served at `/`.
- `src/app/(en)/en/` — English root layout + page, served at `/en/`.
- `src/app/global-not-found.tsx` — 404 page (required with two root layouts).
- `src/components/HomePage.tsx`, `LocaleLayout.tsx` — shared page and `<html>` shell.
- `src/i18n/` — locale config and the FR/EN dictionaries (all copy lives here).
- `src/lib/site.ts` — site constants, client logos, tech stack.
- `src/lib/metadata.ts`, `structured-data.ts`, `og-image.tsx` — SEO metadata, JSON-LD, OG images.
- `src/app/{sitemap,robots,manifest}.ts`, `icon.svg`, `apple-icon.tsx` — generated metadata files.
- `scripts/postbuild.mjs` — strips the unused client runtime and adds asset caching.

## Performance notes

- **No framework JavaScript in production.** Pages are fully server-rendered and
  the mobile menu uses the native Popover API, so `scripts/postbuild.mjs` removes
  the React/Next.js client runtime (~180 KB of JS, hydration, RSC payload) from `out/`.
  ⚠️ If you ever add a Client Component (`"use client"`), remove that step.
- CSS is inlined in the HTML (`experimental.inlineCss`), so nothing blocks rendering.
- Fonts are self-hosted through `next/font` and preloaded (no layout shift).
- **Images:** use `next/image` with a static import (PNG, JPG, WebP or AVIF in
  `src/assets/`) and an accurate `sizes`. At build time the custom loader
  (`src/lib/image-loader.ts`) and `scripts/postbuild.mjs` generate responsive WebP
  variants (capped at the source width), rewrite `srcset`, and delete unused originals.
  Keep source images at most ~2× their largest rendered size.
- Share images (OG images, Apple touch icon) stay PNG for social networks but are
  palette-compressed at build time.
- Project visuals are still striped placeholders — replace them with real screenshots
  (pre-sized WebP/AVIF) when available.
- Lighthouse (mobile, local static build): Performance 100, LCP 1.6 s, TBT 0 ms, CLS 0.
