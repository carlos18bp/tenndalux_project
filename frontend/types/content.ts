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

/** Tag, categoría, estilo o espacio: todos se serializan igual. */
export type Term = {
  id: number;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_blocks: ContentBlock[];
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
  meta_title: string;
  meta_description: string;
  tags: Term[];
  /** Calculado por el backend sobre el contenido real, no un campo editable. */
  read_time_minutes: number;
};

export type PortfolioProject = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content_blocks: ContentBlock[];
  cover_image_url: string | null;
  location: string;
  year: number | null;
  featured: boolean;
  categories: Term[];
  styles: Term[];
};
