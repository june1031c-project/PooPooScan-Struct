#!/usr/bin/env bash
set -euo pipefail

RAW_URL="${1:-${FIREBASE_STUDIO_AUTH_RAW_URL:-}}"
OUT_FILE="firebase-studio-auth.generated.js"
TOKEN="${2:-${FIREBASE_STUDIO_AUTH_BEARER:-}}"

if [[ -z "$RAW_URL" ]]; then
  echo "FIREBASE_STUDIO_AUTH_RAW_URL is required" >&2
  exit 1
fi

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

if [[ -n "$TOKEN" ]]; then
  curl -fsSL -H "Authorization: Bearer $TOKEN" "$RAW_URL" -o "$TMP_FILE"
else
  curl -fsSL "$RAW_URL" -o "$TMP_FILE"
fi

if ! grep -q "FIREBASE_STUDIO_AUTH" "$TMP_FILE"; then
  echo "Downloaded file must define window.FIREBASE_STUDIO_AUTH" >&2
  exit 1
fi

cp "$TMP_FILE" "$OUT_FILE"
echo "Updated $OUT_FILE from $RAW_URL"
