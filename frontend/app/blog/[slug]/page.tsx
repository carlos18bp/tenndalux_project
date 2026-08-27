import BlogPostClient from './BlogPostClient';

/**
 * Una sola plantilla para todos los artículos.
 *
 * Con `output: 'export'` cada slug listado aquí genera un HTML en el build, lo
 * que ataría publicar un post a un despliegue. En vez de eso se genera este
 * shell y `blog_detail` de Django lo sirve para cualquier slug; el contenido lo
 * pide el navegador a la API.
 */
export function generateStaticParams() {
  return [{ slug: '_shell' }];
}

export default function Page() {
  return <BlogPostClient />;
}
