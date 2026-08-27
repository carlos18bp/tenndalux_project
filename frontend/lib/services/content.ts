/**
 * Contenido publicado desde el admin: posts del blog y proyectos del portafolio.
 *
 * El detalle se pide por slug —es lo que trae la URL— y no por id, que no
 * aparece en ninguna parte de la web pública.
 */
import { get } from '@/lib/services/http';
import type { BlogPost, PortfolioProject } from '@/types/content';

/** La API pagina por defecto (PAGE_SIZE 20). */
type Paginated<T> = { count: number; next: string | null; results: T[] };

/**
 * El backend devuelve las rutas de media relativas (`/media/…`). En producción
 * comparten dominio con la web y ya resuelven; en desarrollo el front corre en
 * otro puerto, así que hay que anteponerle el origen de la API.
 */
export function mediaUrl(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;

  const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    return new URL(path, new URL(apiBase).origin).toString();
  } catch {
    return path;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const response = await get<BlogPost>(`/blog/posts/${slug}/`);
  return response.data;
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProject> {
  const response = await get<PortfolioProject>(`/portfolio/projects/${slug}/`);
  return response.data;
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const response = await get<Paginated<BlogPost>>('/blog/posts/');
  return response.data.results;
}

export async function listPortfolioProjects(): Promise<PortfolioProject[]> {
  const response = await get<Paginated<PortfolioProject>>('/portfolio/projects/');
  return response.data.results;
}
