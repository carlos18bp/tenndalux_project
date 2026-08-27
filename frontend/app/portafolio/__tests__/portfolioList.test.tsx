import { render, screen } from '@testing-library/react';
import Portafolio from '../page';
import { listPortfolioProjects } from '@/lib/services/content';
import type { PortfolioProject } from '@/types/content';

jest.mock('@/lib/services/content', () => ({
  listPortfolioProjects: jest.fn(),
  mediaUrl: (path: string) => path,
}));
jest.mock('@/components/layout/Header', () => function Header() { return <header />; });
jest.mock('@/components/layout/Footer', () => function Footer() { return <footer />; });

const mockedList = listPortfolioProjects as jest.MockedFunction<typeof listPortfolioProjects>;

const project = (overrides: Partial<PortfolioProject> = {}): PortfolioProject => ({
  id: 1,
  title: 'Residencia Premium Envigado',
  slug: 'residencia-premium-envigado',
  description: 'Automatización completa.',
  content_blocks: [],
  cover_image_url: '/media/portada.webp',
  location: 'Envigado, Antioquia',
  year: 2026,
  featured: false,
  categories: [{ id: 1, name: 'Residencial', slug: 'residencial' }],
  styles: [
    { id: 1, name: 'Cortinas Roller', slug: 'roller' },
    { id: 2, name: 'Automatización', slug: 'automatizacion' },
  ],
  ...overrides,
});

describe('Portfolio list', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the projects published in the admin', async () => {
    mockedList.mockResolvedValue([project(), project({ id: 2, title: 'Oficinas Medellín', slug: 'oficinas' })]);
    render(<Portafolio />);

    expect(await screen.findAllByText('Residencia Premium Envigado')).not.toHaveLength(0);
    expect(screen.getAllByText('Oficinas Medellín')).not.toHaveLength(0);
  });

  it('builds the category filter from the categories the projects carry', async () => {
    mockedList.mockResolvedValue([
      project(),
      project({ id: 2, slug: 'b', title: 'B', categories: [{ id: 2, name: 'Hotelería', slug: 'hoteleria' }] }),
    ]);
    render(<Portafolio />);

    expect(await screen.findByRole('button', { name: 'Residencial' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hotelería' })).toBeInTheDocument();
    // Antes la lista era fija e incluía categorías sin un solo proyecto.
    expect(screen.queryByRole('button', { name: 'Comercial' })).not.toBeInTheDocument();
  });

  it('uses the styles as the project type', async () => {
    mockedList.mockResolvedValue([project()]);
    render(<Portafolio />);

    expect(await screen.findAllByText('Cortinas Roller + Automatización')).not.toHaveLength(0);
  });

  it('respects the featured flag set in the admin', async () => {
    mockedList.mockResolvedValue([
      project({ id: 1, title: 'Normal', slug: 'normal', featured: false }),
      project({ id: 2, title: 'El destacado', slug: 'destacado', featured: true }),
    ]);
    render(<Portafolio />);

    expect(await screen.findAllByText('El destacado')).not.toHaveLength(0);
  });

  it('promotes the first project when nobody marked one as featured', async () => {
    mockedList.mockResolvedValue([
      project({ id: 1, title: 'Primero', slug: 'primero', featured: false }),
      project({ id: 2, title: 'Segundo', slug: 'segundo', featured: false }),
    ]);
    render(<Portafolio />);

    // Sin esto la franja destacada de arriba quedaría vacía.
    expect(await screen.findAllByText('Primero')).not.toHaveLength(0);
  });

  it('does not claim there are no results while it is still loading', () => {
    mockedList.mockReturnValue(new Promise(() => {}));
    render(<Portafolio />);

    expect(screen.getByLabelText('Cargando proyectos')).toBeInTheDocument();
  });
});
