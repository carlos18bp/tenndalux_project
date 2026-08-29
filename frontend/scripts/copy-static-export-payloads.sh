#!/usr/bin/env bash
# Copy Next.js static-export RSC payloads into Django's public static tree.
set -euo pipefail

if [[ "$#" -ne 2 ]]; then
  echo "usage: $0 <next-out-dir> <django-static-dir>" >&2
  exit 2
fi

OUT_DIR="$1"
STATIC_DIR="$2"

if [[ ! -d "$OUT_DIR" ]]; then
  echo "ERROR: Next export directory does not exist: $OUT_DIR" >&2
  exit 2
fi

mkdir -p "$STATIC_DIR"

# Remove generated payload groups from previous builds. An `index.txt` is a
# Next payload only when it lives beside an `__next*.txt`; unrelated public
# text files with the same generic name must survive the deployment.
while IFS= read -r -d '' payload_dir; do
  find "$payload_dir" -maxdepth 1 -type f \
    \( -name '__next*.txt' -o -name 'index.txt' \) -delete
done < <(
  find "$STATIC_DIR" -type f -name '__next*.txt' -printf '%h\0' \
    | sort -zu
)

payload_count=0
while IFS= read -r -d '' payload; do
  relative_path="${payload#"$OUT_DIR"/}"
  destination="$STATIC_DIR/$relative_path"
  mkdir -p "$(dirname "$destination")"
  cp "$payload" "$destination"
  payload_count=$((payload_count + 1))
done < <(find "$OUT_DIR" -type f -name '*.txt' -print0)

if [[ "$payload_count" -eq 0 ]]; then
  echo "ERROR: Next export produced no .txt payloads" >&2
  exit 2
fi

echo "==> Copied ${payload_count} Next static-export payloads"
