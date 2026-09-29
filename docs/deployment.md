[Français](deployment.fr.md) · English

# Deployment

Two things are deployed separately: the **CMS** (a Node app) and the **static site** (files for Apache).

```
Node host: Payload CMS  ◄──── contact form ──── visitors
      │  REST API
      ▼
build machine: pnpm build ──► apps/web/dist/ ──► Apache host (web root)
```

Choosing where the CMS runs is left open: any Node ≥ 22.12 host with a persistent disk will do
(a small VPS, a container platform with a volume…). The static host cannot run it.

## 1. The CMS

Configure `apps/cms/.env` (see the README for every variable). In production:

- `PAYLOAD_SECRET` — a long random secret, never reused elsewhere.
- `CMS_URL` — the public HTTPS URL of the CMS.
- `SITE_URL` — `https://www.acolad.fr` (comma-separated if several origins). Only these origins may call
  the API from a browser (the contact form).
- `DATABASE_URI` — a path on the persistent disk, e.g. `file:/var/lib/acolad/cms.db`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM`, and optionally
  `CONTACT_TO`. Without `SMTP_HOST` notification emails are only written to the log.

Then, from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm --filter cms build
pnpm --filter cms migrate      # creates or updates the tables
pnpm --filter cms seed         # first deployment only: loads the initial content
pnpm --filter cms start        # serves the admin and the API on :3000
```

Put it behind an HTTPS reverse proxy that forwards `X-Forwarded-For` (the contact endpoint rate-limits
by IP). Create your admin account at `/admin`, or set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`
for the seed. The seed refuses to run on a CMS that already has content.

Uploaded images are stored in `apps/cms/media/` (git-ignored, like the database).

## 2. The static site

Build it against the running CMS, then upload the result:

```bash
PAYLOAD_URL=https://cms.example.com pnpm build
```

The build reads every page from the CMS and downloads the images to optimize them, so the CMS must be
reachable from the build machine. Upload the **contents of `apps/web/dist/`**, hidden `.htaccess`
included, to the web root (`www/` or `public_html/`). It contains:

- one folder per page and language, `404.html`, `sitemap.xml`, `robots.txt`;
- `_astro/` (optimized images and the script bundle, named by content hash, cached for a year);
- `assets/` (fonts, icons, social cards) and `.htaccess` (HTTPS and `www` redirect, security headers,
  caching, compression).

If the CMS is reached under another public address than the one used to build, set
`PUBLIC_CONTACT_ENDPOINT` so the contact form posts to the right place.

**After every content change in the admin, rebuild and upload the site.** There is no automatic
rebuild yet (see "Not done yet").

## 3. Changing the content model

1. Edit the collection or global in `apps/cms/src/`. A new kind of section is a block: add it in
   `apps/cms/src/blocks/` and to the list in `blocks/index.ts`, then add its component in
   `apps/web/src/components/blocks/` and to the registry in `blocks/index.ts` there.
2. `pnpm --filter cms generate:types` — the site imports `apps/cms/src/payload-types.ts`, commit it.
3. `pnpm --filter cms migrate:create <short-name>` and commit the generated files in
   `apps/cms/src/migrations/`.
4. Run `pnpm --filter cms migrate` on every environment.

In development the CMS updates its own schema automatically ("push" mode). If a schema change makes
that step wait for a confirmation, delete `apps/cms/data/cms.db` and run `pnpm seed` again: the
development database holds nothing that the seed does not recreate (unless you edited content).

## 4. Backups

Content is **not** in git. Back up two things regularly:

- the SQLite file (`DATABASE_URI`);
- the `apps/cms/media/` folder.

`pnpm seed -- --reset` only restores the content of the legacy site, not later edits.

## 5. Checking a release

- `pnpm typecheck` and `pnpm test` pass.
- With the CMS running, `pnpm build` succeeds and `pnpm preview` shows the site.
- `dist/.htaccess`, `dist/sitemap.xml` (one URL per page and language, each with fr, en and x-default
  alternates), `dist/robots.txt` and `dist/404.html` exist.
- Send a message from `/contact/`: it appears in **Inbox → Messages** and the notification arrives.
  Stop the CMS and send another: an error note shows and the mail client opens.

## Not done yet

- **Automatic rebuild** when content changes (a webhook from the CMS to a build job).
- **CAPTCHA** on the contact form, if the honeypot, timing check and rate limit are not enough.
- **Choosing and setting up the CMS host**, and its backups.
- **Refreshing the social card images** (`og-fr.png`, `og-en.png`), which still show an older tagline.
