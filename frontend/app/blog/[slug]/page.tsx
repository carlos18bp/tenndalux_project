import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return [
    { slug: 'cortinas-inteligentes-guia-completa' },
  ];
}

export default function Page() {
  return <BlogPostClient />;
}
