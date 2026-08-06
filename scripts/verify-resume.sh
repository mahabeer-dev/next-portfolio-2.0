#!/usr/bin/env bash
#
# Verify every resume variant is ATS-clean.
#
#   npm run verify:resume            # against an already-running server
#   PORT=3001 npm run verify:resume
#
# Checks each (market x profile) PDF for:
#   - HTTP 200 and a real PDF
#   - at most 2 pages (a 3rd page is almost always a one-line widow)
#   - no mid-word hyphen breaks   ("serv-er-side rendering" kills keyword matching)
#   - no letter-spaced headings   ("P R O F E S S I O N A L")
#   - no unresolved placeholders  ([[FILL]], null, undefined)
#   - no URL noise                ("www.example.com/")
#
# Requires poppler (`brew install poppler`) for pdfinfo/pdftotext.

set -uo pipefail

PORT="${PORT:-3000}"
BASE="http://localhost:${PORT}"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

MARKETS=(international domestic)
PROFILES=(fullstack react node mobile sveltekit bubble javascript)

if ! command -v pdftotext >/dev/null || ! command -v pdfinfo >/dev/null; then
  echo "error: pdftotext/pdfinfo not found. Install with: brew install poppler" >&2
  exit 2
fi

if ! curl -sf -o /dev/null "${BASE}/api/resume?market=international&profile=fullstack"; then
  echo "error: no server responding at ${BASE}. Start one with 'npm run dev' first." >&2
  exit 2
fi

fail=0
printf "%-26s %-6s %s\n" VARIANT PAGES ISSUES

for market in "${MARKETS[@]}"; do
  for profile in "${PROFILES[@]}"; do
    name="${market}-${profile}"
    pdf="${OUT}/${name}.pdf"
    txt="${OUT}/${name}.txt"

    code=$(curl -s -o "$pdf" -w '%{http_code}' "${BASE}/api/resume?market=${market}&profile=${profile}")
    issues=""

    if [ "$code" != "200" ] || [ "$(head -c 4 "$pdf")" != "%PDF" ]; then
      printf "%-26s %-6s %s\n" "$name" "-" "REQUEST FAILED (http=$code)"
      fail=1
      continue
    fi

    pdftotext -layout "$pdf" "$txt" 2>/dev/null
    pages=$(pdfinfo "$pdf" | awk '/^Pages/{print $2}')

    [ "$pages" -gt 2 ]                                  && { issues="$issues over-2-pages"; fail=1; }
    grep -qE '[a-z]-$' "$txt"                           && { issues="$issues hyphen-break"; fail=1; }
    grep -qE '^([A-Z] ){3,}' "$txt"                     && { issues="$issues letter-spaced-heading"; fail=1; }
    grep -qE '\[\[|undefined|\bnull\b|NaN' "$txt"       && { issues="$issues placeholder-leak"; fail=1; }
    grep -qE '— (www\.|.*/$)' "$txt"                    && { issues="$issues url-noise"; fail=1; }

    printf "%-26s %-6s %s\n" "$name" "$pages" "${issues:-ok}"
  done
done

echo
if [ "$fail" -eq 0 ]; then
  echo "All $(( ${#MARKETS[@]} * ${#PROFILES[@]} )) variants clean."
else
  echo "FAILED — see issues above." >&2
fi
exit "$fail"
