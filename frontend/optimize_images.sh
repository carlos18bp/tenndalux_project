#!/bin/bash

# Directorio de origen
SOURCE_DIR="public/home"
# Calidad de compresión (0-100)
QUALITY=80

echo "Iniciando optimización de imágenes en $SOURCE_DIR..."

# Verificar si cwebp está instalado
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp no está instalado."
    exit 1
fi

# Recorrer archivos png y jpg en el directorio
find "$SOURCE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    filename=$(basename -- "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"
    output_file="$SOURCE_DIR/$filename.webp"

    echo "Convirtiendo $file a $output_file..."
    
    # Convertir a WebP
    cwebp -q "$QUALITY" "$file" -o "$output_file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Optimizado: $output_file"
    else
        echo "❌ Error al convertir: $file"
    fi
done

echo "¡Optimización completada!"
