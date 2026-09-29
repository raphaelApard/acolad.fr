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
| **Interface labels** | menu names, accessibility labels, button texts ("Get in touch", "See all projects"…), the projects filter, the image viewer and the 404 page |

The social card image is a file served by the site itself, not an upload: put it in
`apps/web/public/assets/` (1200×630) and enter its path, e.g. `/assets/og-fr.png`.

## Pages

One entry per page, under **Pages**: Home, Services, Projects, Clients, Background, Contact.
Each one has:

- **SEO** — the `<title>` and meta description. They also feed the social cards and the structured
  data. Keep the title under about 60 characters.
- **Page heading** — the h1 and the introduction paragraph (the home page has a hero instead).
- **Closing call to action** — the title of the contact block at the bottom, and whether its button
  opens the contact page or a `mailto:` link.
- Page-specific texts: the services process steps, the background working principles, the clients
  count wording (`{count}` is replaced by the number of clients), the contact form texts.

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

Adding a new page, a new section or a new kind of content: the route table
(`apps/web/src/lib/routes.ts`), a view in `apps/web/src/views/` and, for new fields, the collection
definitions in `apps/cms/src/` plus a migration (see [Deployment](deployment.md)).

## Typography

French punctuation uses a narrow no-break space (U+202F) before `?`, `!`, `:` and `;`, so the mark never
wraps onto its own line. Copy an existing text when you need it, or paste the character.
