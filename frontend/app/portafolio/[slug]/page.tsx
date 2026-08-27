import PortafolioProjectClient from './PortafolioProjectClient';

/** Una sola plantilla para todos los proyectos — ver app/blog/[slug]/page.tsx. */
export function generateStaticParams() {
  return [{ slug: '_shell' }];
}

export default function Page() {
  return <PortafolioProjectClient />;
}
