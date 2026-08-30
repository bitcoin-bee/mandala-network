#!/usr/bin/env bash
# Mandala Network — deploy to production.
# Usage:  ./deploy.sh
# Static site. No build step. Every run redeploys this folder to the linked Vercel project.

set -euo pipefail
cd "$(dirname "$0")"

fail() { printf '\033[31m✗ %s\033[0m\n' "$1"; exit 1; }
ok()   { printf '\033[32m✓ %s\033[0m\n' "$1"; }

echo "Pre-flight"

[ -f index.html ]              || fail "index.html missing — are you in the right folder?"
[ -f event-intelligence.html ] || fail "event-intelligence.html missing"
[ -f vercel.json ]             || fail "vercel.json missing — /event-intelligence will 404 without it"
[ -d assets/img ]              || fail "assets/img missing"
[ -d assets/fonts ]            || fail "assets/fonts missing"

grep -q '"cleanUrls": true' vercel.json || fail 'vercel.json lost "cleanUrls": true — /event-intelligence would 404'
ok "structure"

fonts=$(ls assets/fonts/*.woff2 2>/dev/null | wc -l | tr -d ' ')
[ "$fonts" -ge 8 ] || fail "expected 8 font files, found $fonts"
ok "$fonts fonts"

imgs=$(ls assets/img/*.webp 2>/dev/null | wc -l | tr -d ' ')
[ "$imgs" -ge 20 ] || fail "expected 20+ images, found $imgs"
ok "$imgs images"

# Every local asset referenced by the HTML must actually exist.
missing=0
for f in index.html event-intelligence.html; do
  while IFS= read -r ref; do
    [ -f ".$ref" ] || { printf '\033[31m  missing: %s (in %s)\033[0m\n' "$ref" "$f"; missing=1; }
  done < <(grep -o '/assets/[A-Za-z0-9._/-]*' "$f" | sort -u)
done
[ "$missing" -eq 0 ] || fail "broken asset references — fix before deploying"
ok "asset references resolve"

echo
echo "Deploying to production…"
npx vercel --prod

echo
echo "Now check on the live URL:"
echo "  · /event-intelligence resolves without .html"
echo "  · headings in Newsreader, body in Source Serif 4"
echo "  · the three event tabs switch panel, image and the 0X / 03 counter"
echo "  · FAQ opens and closes, one at a time"
echo "  · /robots.txt and /sitemap.xml return 200"
