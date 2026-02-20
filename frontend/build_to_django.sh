#!/bin/bash
# Build Next.js static export and deploy to Django backend
# Usage: bash build_to_django.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR"
BACKEND_DIR="$SCRIPT_DIR/../backend"
OUT_DIR="$FRONTEND_DIR/out"

echo "==> Building Next.js static export..."
cd "$FRONTEND_DIR"
npx next build

echo "==> Cleaning previous deployment..."
rm -rf "$BACKEND_DIR/static/_next"
rm -rf "$BACKEND_DIR/static/home"
rm -rf "$BACKEND_DIR/static/videos"
rm -rf "$BACKEND_DIR/templates/frontend"

echo "==> Copying static assets to backend/static/..."
mkdir -p "$BACKEND_DIR/static"

# Copy _next (JS/CSS chunks)
cp -r "$OUT_DIR/_next" "$BACKEND_DIR/static/_next"

# Copy public folder assets (images, videos, svgs)
for item in "$OUT_DIR"/*/; do
    dirname=$(basename "$item")
    # Skip directories that are HTML pages (they have index.html inside)
    if [ "$dirname" = "_next" ] || [ "$dirname" = "_not-found" ] || [ "$dirname" = "404" ]; then
        continue
    fi
    # If the directory contains index.html, it's an HTML page, not a static asset
    if [ -f "$item/index.html" ]; then
        continue
    fi
    cp -r "$item" "$BACKEND_DIR/static/$dirname"
done

# Copy root-level static files (svgs, ico, etc.)
for file in "$OUT_DIR"/*.svg "$OUT_DIR"/*.ico "$OUT_DIR"/*.png "$OUT_DIR"/*.txt; do
    [ -f "$file" ] && cp "$file" "$BACKEND_DIR/static/"
done

echo "==> Copying HTML templates to backend/templates/frontend/..."
mkdir -p "$BACKEND_DIR/templates/frontend"

# Copy all HTML files preserving directory structure
find "$OUT_DIR" -name "index.html" | while read -r htmlfile; do
    # Get relative path from out dir
    relpath="${htmlfile#$OUT_DIR/}"
    reldir=$(dirname "$relpath")

    if [ "$reldir" = "." ]; then
        # Root index.html
        cp "$htmlfile" "$BACKEND_DIR/templates/frontend/index.html"
    else
        mkdir -p "$BACKEND_DIR/templates/frontend/$reldir"
        cp "$htmlfile" "$BACKEND_DIR/templates/frontend/$reldir/index.html"
    fi
done

# Also copy 404.html
if [ -f "$OUT_DIR/404.html" ]; then
    cp "$OUT_DIR/404.html" "$BACKEND_DIR/templates/frontend/404.html"
fi

echo "==> Done! Deployment structure:"
echo "    Templates: $BACKEND_DIR/templates/frontend/"
echo "    Static:    $BACKEND_DIR/static/"
find "$BACKEND_DIR/templates/frontend" -name "*.html" | sort | sed 's/^/    /'
