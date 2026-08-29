#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

OUT_DIR="$TMP_DIR/out"
STATIC_DIR="$TMP_DIR/static"
mkdir -p "$OUT_DIR/servicios" "$OUT_DIR/portafolio/_shell" "$STATIC_DIR/removed" "$STATIC_DIR/public"
printf 'tree' > "$OUT_DIR/servicios/__next._tree.txt"
printf 'index' > "$OUT_DIR/servicios/index.txt"
printf 'shell' > "$OUT_DIR/portafolio/_shell/__next._full.txt"
printf 'stale' > "$STATIC_DIR/removed/__next._tree.txt"
printf 'stale-index' > "$STATIC_DIR/removed/index.txt"
printf 'keep' > "$STATIC_DIR/public/readme.txt"
printf 'keep-index' > "$STATIC_DIR/public/index.txt"

bash "$SCRIPT_DIR/copy-static-export-payloads.sh" "$OUT_DIR" "$STATIC_DIR"

test "$(cat "$STATIC_DIR/servicios/__next._tree.txt")" = "tree"
test "$(cat "$STATIC_DIR/servicios/index.txt")" = "index"
test "$(cat "$STATIC_DIR/portafolio/_shell/__next._full.txt")" = "shell"
test ! -e "$STATIC_DIR/removed/__next._tree.txt"
test ! -e "$STATIC_DIR/removed/index.txt"
test "$(cat "$STATIC_DIR/public/readme.txt")" = "keep"
test "$(cat "$STATIC_DIR/public/index.txt")" = "keep-index"

echo "copy-static-export-payloads: OK"
