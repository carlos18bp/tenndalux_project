#!/bin/bash

# Script para optimizar videos para web y convertirlos a WebM
# Usa VP9 codec para video y Opus para audio

INPUT_DIR="$(dirname "$0")"
OUTPUT_DIR="$INPUT_DIR/optimized"

mkdir -p "$OUTPUT_DIR"

echo "=== Optimizador de Videos para Web ==="
echo "Directorio de entrada: $INPUT_DIR"
echo "Directorio de salida: $OUTPUT_DIR"
echo ""

converted=0
failed=0

shopt -s nullglob nocaseglob

for file in "$INPUT_DIR"/*.mp4 "$INPUT_DIR"/*.mov "$INPUT_DIR"/*.avi "$INPUT_DIR"/*.mkv; do
    [ -f "$file" ] || continue
    
    filename=$(basename "$file")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.webm"
    
    # Saltar si ya existe
    if [ -f "$output" ]; then
        echo "⏭ Saltando (ya existe): ${name}.webm"
        ((converted++))
        continue
    fi
    
    original_size=$(du -h "$file" | cut -f1)
    
    echo ""
    echo "Procesando: $filename ($original_size)"
    
    if ffmpeg -i "$file" \
        -c:v libvpx-vp9 \
        -crf 32 \
        -b:v 0 \
        -vf "scale='min(1280,iw)':'-2'" \
        -c:a libopus \
        -b:a 96k \
        -deadline good \
        -cpu-used 2 \
        -row-mt 1 \
        -y \
        "$output" 2>/dev/null; then
        
        new_size=$(du -h "$output" | cut -f1)
        echo "✓ Completado: ${name}.webm ($new_size)"
        ((converted++))
    else
        echo "✗ Error al convertir: $filename"
        ((failed++))
    fi
done

shopt -u nullglob nocaseglob

echo ""
echo "========================================"
echo "Conversión completada"
echo "Convertidos: $converted"
echo "Fallidos: $failed"
echo "Videos optimizados en: $OUTPUT_DIR"
