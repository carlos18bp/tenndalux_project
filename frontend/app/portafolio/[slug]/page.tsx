import PortafolioProjectClient from './PortafolioProjectClient';

export function generateStaticParams() {
  return [
    { slug: 'residencia-premium-envigado' },
  ];
}

export default function Page() {
  return <PortafolioProjectClient />;
}
