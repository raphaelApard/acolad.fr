#!/usr/bin/env bash
#
# Test, build and publish the site to production: https://www.acolad.fr.
#
# What ships is the working tree as it stands: dist/ is rebuilt every time and
# mirrored to the document root, so files that left the repository leave the
# server too and an old page never lingers at its URL after a rename.
#
# Around the upload it:
#
#   - refuses to ship a tree with uncommitted changes, so what is live is a
#     commit someone can check out again (a dry run only warns);
#   - checks the build before it leaves: the pages, the .htaccess with its
#     filled-in CSP, no noindex and no password anywhere, the canonical host;
#   - checks that the remote directory exists, since rsync would create a
#     wrong one silently and the site would not change;
#   - shows the changes, counts the deletions and asks before touching anything;
#   - checks afterwards that the site answers, redirects to its canonical
#     origin, sends its security headers and is indexable.
#
# The server settings are the SSH alias of the o2switch account, defined in
# ~/.ssh/config, and the document root relative to its home directory. Your IP
# must be allowed in cPanel (SSH access) first. They are not versioned: copy
# scripts/deploy-prod.example.sh to scripts/deploy-prod.sh (git-ignored) and
# set HOST and REMOTE_PATH there.
#
# Usage:
#   scripts/deploy-prod.sh [--dry-run] [--yes] [--host <ssh-host>] [--path <remote-dir>]
#
# --dry-run reports what would change and transfers nothing. Run it first.
# --yes skips the confirmation prompt, for a non-interactive run. The checks
# still run and still fail the deploy; only the question goes away.

set -euo pipefail

HOST='my-ssh-alias'
REMOTE_PATH='example.com/htdocs'
SITE_URL='https://www.acolad.fr/'
CANONICAL_HOST='www.acolad.fr'
BARE_URL='http://acolad.fr/'
DRY_RUN=0
ASSUME_YES=0

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --yes|-y)  ASSUME_YES=1; shift ;;
    --host)    HOST="${2:?--host needs a value}"; shift 2 ;;
    --path)    REMOTE_PATH="${2:?--path needs a value}"; shift 2 ;;
    -h|--help) sed -n '2,32p' "$0" | sed 's/^#\{1,2\} \{0,1\}//'; exit 0 ;;
    *) echo "deploy-prod: unknown argument '$1'" >&2; exit 2 ;;
  esac
done

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

# Paths the host owns, excluded from both the transfer and the delete pass.
#
# Let's Encrypt writes its challenge files in .well-known to renew the
# certificate: a mirror deleting it on every deploy would make a renewal that
# lands in that window fail. cPanel creates cgi-bin and .user.ini (the PHP
# settings), and PHP writes error_log. None of them is in the repository.
# contact.php keeps its hourly counts in contact-rate/, next to the document
# root rather than inside it, so the mirror never reaches it.
protected=(
  '.well-known/'
  'cgi-bin/'
  '.user.ini'
  'error_log'
  '.DS_Store'
)

fail() { echo "deploy-prod: $1" >&2; exit 1; }

echo
echo "Deploying to PRODUCTION — ${HOST}:${REMOTE_PATH}"
echo "                          ${SITE_URL}"

# --- Preflight ---------------------------------------------------------

# A production deploy should be reproducible: someone reading the site later
# has to be able to check out what produced it. A dirty tree makes that a
# guess, so it is refused rather than warned about. A dry run changes nothing,
# so it only warns.
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  echo
  git status --short
  echo
  if [ "$DRY_RUN" -eq 1 ]; then
    echo "  ⚠  uncommitted changes: a real deploy would refuse this tree."
  else
    fail "the working tree has uncommitted changes — commit or stash them first."
  fi
fi

commit="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
echo "                          ${branch} @ ${commit}"

# main is the production branch. Shipping another one is sometimes intended
# (a hotfix checked before merging), so it is flagged, not refused.
if [ "$branch" != 'main' ]; then
  echo "  ⚠  not on main: production will run ${branch}."
fi

# --- Test and build ----------------------------------------------------

echo
pnpm test

echo
# astro build empties dist/ first, so a stale file from an earlier build can
# never ship.
pnpm build

echo
echo "Checking the build before it goes live"

for f in index.html en/index.html 404.html en/404/index.html .htaccess contact.php robots.txt sitemap.xml; do
  [ -f "dist/$f" ] || fail "dist/$f is missing — the build is incomplete."
done
pages="$(find dist -name '*.html' | wc -l | tr -d ' ')"
echo "  pages                  ${pages}"

# The csp-script-hashes integration fills the CSP of .htaccess with the hash of
# every inline script. Left as the placeholder, the header lists no hashes and
# the browser blocks every inline script on the site.
if grep -qF '{{CSP_SCRIPT_HASHES}}' dist/.htaccess; then
  fail "dist/.htaccess still holds {{CSP_SCRIPT_HASHES}} — the CSP was not filled in."
fi
grep -q 'Content-Security-Policy' dist/.htaccess \
  || fail "dist/.htaccess sets no Content-Security-Policy."
echo "  CSP                    script hashes filled in"

# There is no staging site, so nothing in production may hide it: a noindex
# header delists the site silently, and a password puts a 401 in front of
# every visitor and crawler.
if grep -qiE '^[[:space:]]*Header .*X-Robots-Tag' dist/.htaccess; then
  fail "dist/.htaccess sets an X-Robots-Tag header — it would delist the site."
fi
if grep -qE '^[[:space:]]*AuthType' dist/.htaccess; then
  fail "dist/.htaccess requires a password — every visitor would get a 401."
fi
for f in index.html en/index.html; do
  if grep -qiE '<meta[^>]+name="robots"[^>]+noindex' "dist/$f"; then
    fail "dist/$f carries a noindex meta tag."
  fi
done
if grep -qiE '^[[:space:]]*Disallow:[[:space:]]*/[[:space:]]*$' dist/robots.txt; then
  fail "dist/robots.txt disallows the whole site."
fi
echo "  indexable              no noindex, no password, robots.txt open"

# The canonical tags and the sitemap name the production host, from `site` in
# astro.config.mjs. Canonicals pointing elsewhere tell Google this is a copy.
grep -qF "https://${CANONICAL_HOST}/" dist/index.html \
  || fail "dist/index.html does not name https://${CANONICAL_HOST}/ — check the canonical tag."
grep -qF "https://${CANONICAL_HOST}/" dist/sitemap.xml \
  || fail "dist/sitemap.xml does not list https://${CANONICAL_HOST}/ URLs."
echo "  canonical host         ${CANONICAL_HOST}"

# rsync creates a missing destination without complaint, and a dry run against
# a path that does not exist reports the whole site as new — exactly what a
# first deploy into an empty directory looks like. Ask the server directly:
# deploying to the wrong path publishes nothing Apache serves.
if ssh -o BatchMode=yes -o ConnectTimeout=10 "$HOST" "test -d '${REMOTE_PATH}'" 2>/dev/null; then
  echo "  remote directory       ${REMOTE_PATH}"
else
  fail "cannot reach ${HOST}:${REMOTE_PATH}.

       Either SSH failed (is your IP allowed in cPanel > SSH access? does
       'ssh ${HOST}' work?) or the directory does not exist. rsync would create
       it and report success, but Apache serves the document root cPanel has
       configured for the domain, so the site would not change. Pass the real
       one with:

         pnpm deploy:dry --path <document root>

       Then set REMOTE_PATH in scripts/deploy-prod.sh."
fi

# --- Upload ------------------------------------------------------------

# The trailing slash on dist/ copies the contents, not the directory itself.
args=(
  --recursive
  --links
  --compress            # the pages are text: worth compressing over the wire
  --checksum            # astro rewrites every file: compare content, not times
  --delete              # mirror: remove what the repository no longer has
  --chmod=u=rwX,go=rX   # readable by Apache whatever the local umask
  --human-readable
  --itemize-changes     # one line per file that actually changes
)

for f in "${protected[@]}"; do
  args+=(--exclude "$f")
done

target="${HOST}:${REMOTE_PATH}/"

if [ "$DRY_RUN" -eq 1 ]; then
  echo
  echo "(dry run — nothing will be transferred)"
  echo
  rsync "${args[@]}" --dry-run dist/ "$target"
  echo
  echo "Dry run complete. Nothing was changed on the server."
  echo
  exit 0
fi

# Show what the mirror would remove before it removes it. A deletion here is
# a page disappearing from a live site, which is worth a second look even
# when it is intended — a renamed file shows up as one of these.
echo
echo "Changes this deploy would make:"
echo
plan="$(rsync "${args[@]}" --dry-run dist/ "$target")"
if [ -z "$plan" ]; then
  echo "  none — the server already has this build."
else
  printf '%s\n' "$plan" | sed 's/^/  /'
fi

deletions="$(printf '%s\n' "$plan" | grep -c '^\*deleting' || true)"
if [ "$deletions" -gt 0 ]; then
  echo
  echo "  ⚠  ${deletions} file(s) would be DELETED from the live site."
fi

if [ "$ASSUME_YES" -eq 0 ]; then
  echo
  printf 'Deploy to production? Type yes to continue: '
  read -r reply
  case "$reply" in
    yes|YES|y|Y) ;;
    *) echo; echo "Aborted. Nothing was changed on the server."; echo; exit 1 ;;
  esac
fi

echo
rsync "${args[@]}" dist/ "$target"

# --- Verify ------------------------------------------------------------

# rsync succeeding means the files arrived, not that the site works: Apache
# reads .htaccess at request time, so a rule that does not parse only shows
# up now, as a 500 on every page.
echo
echo "Verifying ${SITE_URL}"

if ! command -v curl >/dev/null 2>&1; then
  echo "  curl not found — skipping checks. Open ${SITE_URL} and check it by hand."
  echo
  exit 0
fi

problems=0
note() { echo "  $1"; }
bad()  { echo "  ✗ $1"; problems=$((problems + 1)); }
code() { curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$1" 2>/dev/null || echo '000'; }

# No Accept-Language header, so the English redirect of / does not apply.
headers="$(curl -sS -I --max-time 20 "$SITE_URL" 2>/dev/null || true)"
status="$(printf '%s' "$headers" | awk 'NR==1{print $2}')"

case "$status" in
  200) note "✓ home page            200" ;;
  '')  bad "the site did not answer — check DNS and the certificate." ;;
  *)   bad "home page answered ${status}, expected 200." ;;
esac

en_status="$(code "${SITE_URL}en/")"
if [ "$en_status" = '200' ]; then
  note "✓ English home page    200"
else
  bad "/en/ answered ${en_status}, expected 200."
fi

# A site that ships this header disappears from search results and gives no
# other sign that anything is wrong.
if printf '%s' "$headers" | grep -qi '^x-robots-tag'; then
  bad "production is serving an X-Robots-Tag header:
       $(printf '%s' "$headers" | grep -i '^x-robots-tag' | tr -d '\r')
       If it says noindex, the site will be delisted. Fix .htaccess and redeploy."
else
  note "✓ indexable            no X-Robots-Tag"
fi

# The security headers come from mod_headers through .htaccess: their absence
# means the file was not read or the module block was skipped.
for h in Content-Security-Policy Strict-Transport-Security; do
  if printf '%s' "$headers" | grep -qi "^${h}:"; then
    note "✓ ${h}"
  else
    bad "the home page is missing its ${h} header."
  fi
done

# The bare domain over plain HTTP must reach the canonical origin in one 301.
bare="$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 20 "$BARE_URL" 2>/dev/null || echo '000')"
if [ "$bare" = "301 ${SITE_URL}" ]; then
  note "✓ ${BARE_URL}     301 → ${SITE_URL}"
else
  bad "${BARE_URL} answered '${bare}', expected '301 ${SITE_URL}'."
fi

robots_status="$(code "${SITE_URL}robots.txt")"
if [ "$robots_status" = '200' ]; then
  if curl -sS --max-time 20 "${SITE_URL}robots.txt" 2>/dev/null | grep -qiE '^[[:space:]]*Disallow:[[:space:]]*/[[:space:]]*$'; then
    bad "robots.txt disallows the whole site."
  else
    note "✓ robots.txt           200, crawlable"
  fi
else
  bad "robots.txt answered ${robots_status}, expected 200."
fi

sitemap_status="$(code "${SITE_URL}sitemap.xml")"
if [ "$sitemap_status" = '200' ]; then
  note "✓ sitemap.xml          200"
else
  bad "sitemap.xml answered ${sitemap_status}, expected 200."
fi

# A missing page must answer 404. Serving the home page with a 200 instead
# reads as the home page duplicated across every dead URL.
notfound="$(code "${SITE_URL}no-such-page-deploy-check/")"
if [ "$notfound" = '404' ]; then
  note "✓ unknown path         404"
else
  bad "an unknown path answered ${notfound}, expected 404."
fi

echo
if [ "$problems" -gt 0 ]; then
  echo "Deployed to ${HOST}:${REMOTE_PATH}, but ${problems} check(s) failed. Read them above."
  echo
  exit 1
fi

echo "Deployed ${branch} @ ${commit} to ${SITE_URL}"
echo
