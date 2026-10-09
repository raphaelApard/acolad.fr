[Version française](README.fr.md)

# Raphaël Apard — one-page site

Static, bilingual (`/fr/`, `/en/`) one-page site built with [Astro](https://astro.build)
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

First e2e run: `pnpm exec playwright install chromium`.

## Structure

```
src/content/      fr.json, en.json (all copy), types.ts (their shape), index.ts (typed loader)
src/styles/       tokens.css (from the design), global.css (base and shared utilities)
src/layouts/      Base.astro (head, SEO, hreflang, fonts)
src/components/   one component per section; TimelineRow renders missions and experience
src/scripts/      disclosure.ts (mobile accordions)
src/pages/        [lang]/index.astro (the page), index.astro (redirect / → /fr/)
public/           images and logos (WebP)
tests/            unit (Vitest) and e2e (Playwright)
```

## Editing content

- All copy lives in `src/content/<lang>.json`; components never hard-code text.
- Both files must keep the same structure (enforced by `pnpm test`) and match
  `src/content/types.ts` (enforced by `pnpm check` / `pnpm build`).
- Optional fields render nothing when absent or `null`: `place`, `achievements`, `stack`,
  `image`, `projects`, profile links (`links.linkedin`, `links.malt`, `links.github`) and
  certification `verifyUrl`.
- Every image needs `width` and `height` (its intrinsic size); logos need `naturalWidth` /
  `naturalHeight` plus `height`, the rendered desktop height (mobile uses ×0.77).
- Section anchors (`nav[].id`) are fixed in the components and identical in every locale.

## Layout rules

- One breakpoint at 960px. Below it grids stack, the nav moves behind the menu button,
  missions / other projects / experience become accordions and skill groups show one line
  with a toggle only when the chips overflow.
- Breakpoint-specific markup uses `.desktop-only` / `.mobile-only` (hidden with
  `display: none`, so it never duplicates content for screen readers). Do not give an element
  carrying these classes its own `display` rule: wrap it instead.
- Panels collapse only once JS has run (`html.js`), so content stays readable without JS.

## Deployment

`pnpm build`, then upload the content of `dist/` to any static host. The root `/` is a
meta-refresh page to `/fr/`; on Apache a server-side 301 from `/` to `/fr/` is better.
The production URL is set in `astro.config.mjs` (`site`) and drives canonical, hreflang and
sitemap URLs.

## Open items

- [ ] Confirm the production URL (`site`, currently `https://acolad.fr`).
- [ ] LinkedIn, Malt and GitHub URLs (`links` in both content files) — hidden until set.
- [ ] Certification verify URLs (`verifyUrl`) — the "verify" link is hidden until set.
- [ ] Proofread `src/content/en.json` (translated from the French copy).
- [ ] Sharper portrait source (current one is 468 × 542).
