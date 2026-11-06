#!/usr/bin/env bash
# Fetch the content, build the site and sync dist/ to the production host over SSH.
#
# Copy this file to scripts/deploy.sh (git-ignored), fill in the server
# settings below, then run:
#   scripts/deploy.sh             # test, build, show the plan, ask, sync
#   scripts/deploy.sh --dry-run   # test, build, list what would change
#   scripts/deploy.sh --yes       # same as the default, without the prompt
set -euo pipefail

REMOTE_USER="user"
REMOTE_HOST="example.com"
REMOTE_PATH="/home/user/example.com/htdocs"
SSH_PORT=22

# Where the content comes from: "cms" pulls it from PAYLOAD_URL, "fixture" uses fixtures/
# (the test data, which is the live content until the CMS is in production).
CONTENT_SOURCE="cms"
PAYLOAD_URL="https://cms.example.com"

cd "$(dirname "$0")/.."

dry_run=false
assume_yes=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) dry_run=true ;;
    -y|--yes) assume_yes=true ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

# Files managed by the host: never uploaded, never deleted by --delete.
rsync_opts=(
  -rlvz --delete --checksum
  --chmod=u=rwX,go=rX
  -e "ssh -p $SSH_PORT"
  --exclude ".well-known/"
  --exclude "cgi-bin/"
  --exclude ".user.ini"
  --exclude "error_log"
  --exclude ".DS_Store"
)
target="$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

pnpm test
if [[ "$CONTENT_SOURCE" == "fixture" ]]; then
  pnpm content:fixture
else
  PAYLOAD_URL="$PAYLOAD_URL" pnpm content:pull
fi
pnpm build

if $dry_run; then
  rsync "${rsync_opts[@]}" --dry-run dist/ "$target"
  exit 0
fi

if ! $assume_yes; then
  rsync "${rsync_opts[@]}" --dry-run dist/ "$target"
  read -r -p "Deploy these changes to $REMOTE_HOST:$REMOTE_PATH? [y/N] " answer
  [[ "$answer" =~ ^[yY]$ ]] || { echo "Aborted."; exit 1; }
fi

rsync "${rsync_opts[@]}" dist/ "$target"
echo "Deployed to $REMOTE_HOST:$REMOTE_PATH"
