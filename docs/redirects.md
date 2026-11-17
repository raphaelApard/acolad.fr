# Redirects

Every URL the domain has served since 2004 and where it goes now. The rules live in
[`public/.htaccess`](../public/.htaccess), which is the production config; this page is the plan
they implement and the list to check after a deployment.

Sources: the current site, the Wayback Machine index of `acolad.fr` (CDX API, November 2026) and
the former sites' URLs already handled before. Former sites: a static site (2004, `/htfr/`), a
Drupal site (2014–2016, `/node/`, `/work/`, `/raphael-apard`, `/clients`), a Gatsby site (until
2026, `/projets/`, `/services/`, `/equipe/`, `/contact/`).

All redirects are permanent (301), absolute (`https://www.acolad.fr/…`) and take one hop from
`https://www.acolad.fr`. A request on `http://` or on the bare `acolad.fr` first moves to
`https://www.acolad.fr` with the same path (one more hop).

## Host and protocol

| From | To |
|---|---|
| `http://…`, `https://acolad.fr/…` | `https://www.acolad.fr/…` (same path) |

## Current site

| From | To | Note |
|---|---|---|
| `/fr/` | `/` | French moved to the root (2026) |
| `/index.html`, `/en/index.html` | `/`, `/en/` | Duplicates of the home pages (only when requested as such) |
| `/sitemap-index.xml`, `/sitemap-0.xml` | `/sitemap.xml` | Former sitemap files |
| `/mentions-legales`, `/en`, any path without its trailing slash | same path with `/` | Apache `DirectorySlash` |
| `/` with `Accept-Language: en…` | `/en/` (**302**) | Browsers only: not crawlers, not after a language pick, not from the site itself |

## Gatsby site (until 2026)

| From | To |
|---|---|
| `/projets/`, `/projets/<project>/` | `/realisations/` |
| `/saclay/`, `/syndex/`, `/de-boeck/`, `/muzeopro/`, `/cplus2b/`, `/meettotravel/`, `/challenge-one/`, `/audio-analog/` | `/` |
| `/services/`, `/services/<anything>` | `/` (each service has its own page, listed there) |
| `/contact/` | no redirect: a page of the current site again |
| `/equipe/` | `/` |
| `/politique-confidentialite/` | `/mentions-legales/#donnees-personnelles` |

## Drupal site (2014–2016)

| From | To |
|---|---|
| `/work`, `/work/<project>` (`agence-reussir`, `atelier-2ai`, `audio-analogue-distribution`, `it-tude`, `meet-travel`, `muzeo-pro`) | `/realisations/` |
| `/raphael-apard` | `/` |
| `/clients` | `/` |
| `/node/<id>` | `/` |

## Static site (2004)

| From | To |
|---|---|
| `/htfr/<page>` | `/` |
| `/plan-mappy/<anything>` | `/` |

## Left as 404 on purpose

- Fingerprinted files of former builds (`/_astro/*` that no longer exist, Gatsby `/static/*`,
  `*.js` bundles): no page to send them to.
- Anything else unknown: the 404 page (`noindex`), French or English.

## Deployment note

`scripts/deploy.sh` syncs with `rsync --delete`, so the images of the previous build disappear
from `/_astro/` on each deployment that renames them (moving the content to the backoffice renamed
62 of them). Search engines drop them on their next crawl; nothing links to them from outside.

## Checking

After a deployment, each line below must print one `301` (or `302` for the language redirect) and
the expected target:

```bash
for p in /fr/ /index.html /projets/saclay/ /services/A /work/muzeo-pro /raphael-apard /clients /node/1 /htfr/0001.htm /plan-mappy/ /sitemap-0.xml; do
  curl -s -o /dev/null -w "$p → %{http_code} %{redirect_url}\n" "https://www.acolad.fr$p"
done
curl -s -o /dev/null -w "http → %{http_code} %{redirect_url}\n" http://acolad.fr/
```

Then, in Search Console, the "Not found (404)" list of the Pages report should hold no URL from the
tables above.
