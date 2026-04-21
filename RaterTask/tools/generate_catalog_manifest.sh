#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RATER_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DRAWINGS_DIR="${1:-$RATER_DIR/DrawingsNDescriptions}"
PNG_DIR="$DRAWINGS_DIR/PNGs"
TXT_DIR="$DRAWINGS_DIR/TXTs"
OUT_FILE="$DRAWINGS_DIR/catalog_manifest.js"

if [[ ! -d "$PNG_DIR" ]]; then
  echo "Error: PNG folder not found: $PNG_DIR" >&2
  exit 1
fi

if [[ ! -d "$TXT_DIR" ]]; then
  echo "Error: TXT folder not found: $TXT_DIR" >&2
  exit 1
fi

js_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  printf '%s' "$s"
}

png_files=()
while IFS= read -r file_name; do
  png_files+=("$file_name")
done < <(find "$PNG_DIR" -maxdepth 1 -type f \( -iname '*.png' \) -print | sed 's|.*/||' | LC_ALL=C sort)

if [[ ${#png_files[@]} -eq 0 ]]; then
  echo "Error: no PNG files found in $PNG_DIR" >&2
  exit 1
fi

{
  echo "window.RATER_CATALOG_MANIFEST = {"
  echo "  items: ["
} > "$OUT_FILE"

for i in "${!png_files[@]}"; do
  png_file="${png_files[$i]}"
  stem="${png_file%.*}"
  txt_file=""

  candidate_1="${stem}.txt"
  stem_no_phase="$(printf '%s' "$stem" | sed -E 's/_(draw|edit)$//I')"
  candidate_2="${stem_no_phase}.txt"

  if [[ -f "$TXT_DIR/$candidate_1" ]]; then
    txt_file="$candidate_1"
  elif [[ -f "$TXT_DIR/$candidate_2" ]]; then
    txt_file="$candidate_2"
  fi

  comma=","
  if [[ "$i" -eq $((${#png_files[@]} - 1)) ]]; then
    comma=""
  fi

  escaped_png="$(js_escape "$png_file")"
  if [[ -n "$txt_file" ]]; then
    escaped_txt="$(js_escape "$txt_file")"
    echo "    { file_name: \"$escaped_png\", text_file: \"$escaped_txt\" }$comma" >> "$OUT_FILE"
  else
    echo "    { file_name: \"$escaped_png\" }$comma" >> "$OUT_FILE"
    echo "Warning: no matching TXT found for $png_file" >&2
  fi
done

{
  echo "  ]"
  echo "};"
} >> "$OUT_FILE"

echo "Wrote manifest: $OUT_FILE (${#png_files[@]} PNG entries)"
