/**
 * Bloques de contenido tal como los devuelve la API.
 *
 * Espejo de `core_app/utils/content_blocks.py`. Dos campos existen sólo al
 * leer, porque los agrega el backend: `youtube_id` (extraído de la url) y las
 * imágenes de `galeria`, que se guardan como ids y se sirven ya resueltas.
 */

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export type ContentBlock =
  | { type: 'parrafo'; heading?: string; text: string }
  | { type: 'lista'; heading?: string; items: string[] }
  | { type: 'ejemplos'; heading?: string; items: string[] }
  | { type: 'subsecciones'; heading?: string; items: Array<{ title: string; description: string }> }
  | {
      type: 'linea_de_tiempo';
      heading?: string;
      steps: Array<{ step: string; description: string; duration?: string }>;
    }
  | { type: 'metricas'; heading?: string; items: Array<{ metric: string; description: string }> }
  | { type: 'galeria'; heading?: string; images: GalleryImage[] }
  | { type: 'video'; heading?: string; title?: string; youtube_url: string; youtube_id: string | null }
  | { type: 'testimonio'; heading?: string; text: string; author: string; role?: string }
  | { type: 'cierre'; text: string; note?: string };

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_blocks: ContentBlock[];
  cover_image_url: string | null;
  published_at: string | null;
  meta_title: string;
  meta_description: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content_blocks: ContentBlock[];
  location: string;
  year: number | null;
};
