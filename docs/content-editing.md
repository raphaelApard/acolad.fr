[Français](content-editing.fr.md) · English

# Editing content

All the text and images of the site are edited in the Payload admin panel (`/admin` on the CMS).
The public site only changes once it is rebuilt and uploaded again (see [Deployment](deployment.md)).

## Languages

Every text exists in French (the default, unprefixed URLs) and in English (`/en/…`). Use the language
picker at the top of the admin to switch the language you are editing. A field left empty in English
falls back to the French text, so a missing translation shows French rather than a blank.

The admin interface itself can be French or English (account menu). This does not affect the site.

## Site

| Screen | What it controls |
|---|---|
| **Site settings** | name, business name, job title, copyright holder; the contact email (used by every `mailto:` link, the structured data and the contact form fallback); location, availability, languages; postal address for search engines; profile links (LinkedIn, GitHub, Malt); expertise keywords; the social card image path and description |
| **Interface labels** | accessibility labels, shared button texts ("Get in touch"), the projects filter, the image viewer and the 404 page |

The social card image is a file served by the site itself, not an upload: put it in
`apps/web/public/assets/` (1200×630) and enter its path, e.g. `/assets/og-fr.png`.

## Pages

Every page of the site is a document of **Site → Pages**: Home, Services, Projects, Clients, Background and
Contact are six of them. A page has:

- **Name** — the menu label and breadcrumb name, and how the page is called in the admin.
- **URL slug** (per language) — the last part of the URL: `work` gives `/en/work/`, `projets` gives
  `/projets/`. Lowercase letters, digits and hyphens; unique per language; `en`, `assets`, `_astro`, `api`,
  `admin` and `404` are reserved. **Changing the slug of an existing page breaks the links and search
  results that point to its old URL.** The home page has no slug.
- **SEO** — the `<title>` and meta description, also used for the social cards and the structured data.
  Keep the title under about 60 characters.
- **Sections** — the content of the page, from top to bottom (see below). The same sections appear in both
  languages; only their texts change.
- In the sidebar: **Home page** (served at `/` and `/en/`; only one page, which cannot be deleted),
  **Show in the menu**, **Order** (lowest first), **Home page anchor** (see below) and the
  **structured data type** (Contact page for the contact page, Web page otherwise).

### Sections

Add, reorder or remove sections with the buttons of the **Sections** field. Available kinds:

| Section | What it shows |
|---|---|
| **Hero** | the home page banner: title, introduction, two buttons (a link is an anchor such as `#contact` or a path) and side lines |
| **Page heading** | back link to the home page, h1 and introduction (tick *wide* for a longer introduction) |
| **Services** | *Summary*: the numbered list of the home page with a "see all" link. *Detailed*: one block per service with deliverables and stack |
| **Projects** | *Cards*: the home page cards with a "see all" link. *Case studies*: rows with facts, the category filter and the image viewer |
| **Clients** | *Logos*: the home page grid. *Detailed cards*: logo, sector and work, with the client count wording |
| **Background summary** | the home page timeline next to the flat list of skills, with a "see all" link |
| **Experience** | the detailed list of jobs |
| **Grouped stack** | the skills, by group |
| **Points** | a list of short points, numbered (process steps) or not (working principles) |
| **Contact form** / **Contact details** | the form and its texts; the email, profiles, location and languages from the site settings |
| **Closing call to action** | the contact block at the bottom of a page; its button leads to a page of the site or to a `mailto:` link. A page without one ends with a plain footer |

The *summary* layouts have an **anchor** (the id of the section), an optional **number** ("01") shown before
the heading, and a **"see all" link** to another page. Services, projects, clients, jobs and skills
themselves are edited in the collections below, not inside the section.

### Adding a page

1. **Site → Pages → Create new**. Fill in the name, the slug and the SEO fields in French, then switch to
   English and fill in the same fields.
2. Add sections. Reuse the same kinds as the other pages: the site only knows these.
3. Leave **Show in the menu** ticked to list it in the main menu (after the others, or move it with
   **Order**). To make the mobile menu of the home page scroll to a section of the home page instead of
   opening the page, put that section's id in **Home page anchor**.
4. Rebuild and upload the site: the page, its hreflang links and its sitemap entries are generated.

Deleting a page removes it from the menu and the sitemap at the next build. Links to it from other pages
(a "see all" link, a closing button) must be changed first.

## Content collections

Under **Content**. Every entry has an **Order** (lowest first) that sets its position on the site.

| Collection | Notes |
|---|---|
| **Services** | the *anchor* is the id of the block on the services page: do not change it. The short description is shown on the home page, the long one on the services page. |
| **Projects** | the *filter category* (Web / AI) drives the filter buttons and is independent of the displayed *tag*. Client, result, stack and year are optional. Untick "Show on the home page" to hide a project from the home page only. |
| **Clients** | the name is not translated. If a logo looks too big, set its *logo size* to Medium or Small (square and compact logos need it). |
| **Jobs** | *Years* is shown as typed (e.g. `2014 — now`); the order is not automatic. |
| **Skill groups** | skills are tags, not translated. The home page shows all groups as one flat list; the background page keeps them grouped. |

## Images

Upload images in the **Media** library or directly from a project or client. Give each image an
**alternative text** in both languages (leave it empty only for decorative images: client logos are
already labelled by the client name).

- Project screenshots: at least 1920 px wide. The build creates WebP versions at several widths, plus
  a PNG or JPEG for very old browsers, and the lightbox uses the largest.
- Client logos: WebP or PNG with a transparent background, ideally twice the size they are shown.
- Replacing an image never breaks caching: generated file names contain a hash.

## Contact messages

Messages sent through the contact form appear under **Inbox → Messages** (read-only) and are also
emailed to the address in Site settings (or `CONTACT_TO`). Delete a message once handled.

## Things that need code, not the admin

A new kind of section, or new fields: a block in `apps/cms/src/blocks/`, its component in
`apps/web/src/components/blocks/` and a migration (see [Deployment](deployment.md)). Adding a page made of
existing sections is done entirely in the admin.

## Typography

French punctuation uses a narrow no-break space (U+202F) before `?`, `!`, `:` and `;`, so the mark never
wraps onto its own line. Copy an existing text when you need it, or paste the character.
