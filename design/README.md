[Version française](README.fr.md)

# Design handoff — one-page site

Validated design for Raphaël Apard's one-page site (hero variant A). Source canvas:
https://claude.ai/artifact/NLsarn2xjtxf3TRG1sGVhP

## Contents

| Path | What it is |
|---|---|
| `tokens.css` | Colors, fonts, layout and type scale as CSS custom properties |
| `content/fr.json` | All French copy, structured for the components |
| `content/types.ts` | TypeScript shape of the content files |
| `assets/img/` | Portrait and screenshots (WebP) → copy to `public/img/` |
| `assets/logos/` | Client logos (WebP) → copy to `public/logos/` |
| `mockups/*.dc.html` | Artboard sources, for reference only (see below) |

The mockups are canvas files: they need the canvas runtime to render and use
`{{…}}` template holes. Read them for exact markup, spacing and behaviour; open
the canvas link above to see them rendered.

| Mockup | Viewport |
|---|---|
| `Main.dc.html` | Desktop, fluid page (designed at 1440) |
| `Mobile-1.dc.html` | Mobile 390: header → skills |
| `Mobile-2.dc.html` | Mobile 390: missions → footer |
| `MissionStates.dc.html` | Mission card with missing optional fields |

## Page structure

Order, with section numbers shown in the UI:

1. Header — name, anchor nav, FR/EN switch (mobile: menu button)
2. Hero — info line, name (h1), title, lead, mailto CTA, LinkedIn · Malt · GitHub, portrait
3. `01` Domains of expertise — 6 items, 3 columns
4. `02` AI & assisted development — dark band, 2 paragraphs, tags
5. Client logos — "Ils m'ont fait confiance", 6 × 2 grid (mobile 3 × 4), grayscale
6. `03` Skills — white band, 6 groups, 3 columns
7. `04` Missions — rows: meta | body | screenshot; then "Autres projets" on a white band
8. "Autres expériences" — Simplon, Makina Corpus
9. `05` Certifications · education · languages — white band, 3 columns
10. Footer / contact — dark band, large heading, mailto link, profiles

## Layout

- Container `max-width: 1312px`, side padding 64px (20px on mobile).
- One breakpoint at **960px**: below it every grid stacks to one column, nav
  collapses behind the menu button, logo grid goes to 3 columns.
- Mission row (desktop): `grid-template-columns: 240px 1fr 400px`, gap 48px.
  Without a screenshot: `240px 1fr`.
- Screenshots: `aspect-ratio: 16 / 10`, `object-fit: cover`, `object-position: top`.
- Logos: white tiles 120px high (92px mobile) separated by 1px hairlines;
  each logo has its own height in `content/fr.json` to balance visual weight.

## Mobile behaviour (closed by default)

| Block | Visible when closed | Revealed on open |
|---|---|---|
| Skill group | one line of chips | remaining chips ("Afficher tout" / "Réduire") |
| Mission | period, place, client, role | hook, screenshot, achievements, stack |
| Other project | client name | screenshot, text |
| Experience | period, place, company, role | text, achievements / sub-projects |

Pattern: the heading contains a `<button aria-expanded aria-controls>`; the panel
is the element referenced by `aria-controls`. The skill toggle carries the group
name for screen readers (`Afficher tout — Front-end`). Only show the skill toggle
when the chips actually overflow one line (measure, don't guess).

## Content rules

- Copy comes only from `content/<lang>.json`. Do not invent figures, clients or testimonials.
- Optional fields render nothing when absent: `place`, `achievements`, `stack`,
  `image`, `projects`. A mission without `image` lets the body span the full width.

## Accessibility (WCAG AA)

- Contrast ratios in `tokens.css` comments; muted text never lighter than `#454D5A`
  on light grounds or `#A9B1BD` on dark.
- Visible focus: `outline: 3px solid` accent (`#8FA8FF` on dark bands), offset 3px.
- One `h1` (name), `h2` per section, `h3` per mission / group, `h4` for other projects.
- Skip link "Aller au contenu" as the first focusable element.
- Touch targets ≥ 44px; logos use the client name as `alt`.

## Bilingual

- French by default. Routes `/fr` and `/en`, `hreflang` alternates, `lang` on `<html>`.
- In production the FR/EN switch must be **links** to the other locale, not the
  buttons drawn in the mockup.

## Performance

- Images are WebP; always set `width` / `height`; `loading="lazy"` below the fold.
- Self-host the fonts (e.g. `next/font/google`): Schibsted Grotesk 400–800,
  JetBrains Mono 400–500.
- No video.

## Open items

- [ ] `content/en.json` — English copy to write (only French was provided).
- [ ] LinkedIn, Malt and GitHub URLs (`links` in the content file).
- [ ] Certification verify URLs (`verifyUrl`).
- [ ] `assets/img/missions/docteur-conso-2026.webp` is 2000 × 1248: resize to
      1200px wide like the other screenshots.
- [ ] `assets/img/portrait.webp` is 468 × 542: a larger source would look sharper on retina screens.
