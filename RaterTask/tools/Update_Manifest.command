#!/bin/bash
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo "Updating RaterTask catalog manifest..."
echo

if bash "$SCRIPT_DIR/generate_catalog_manifest.sh"; then
  echo
  echo "Manifest updated successfully."
else
  status=$?
  echo
  echo "Manifest update failed (exit code: $status)."
fi

echo
read -r -p "Press Enter to close..."
