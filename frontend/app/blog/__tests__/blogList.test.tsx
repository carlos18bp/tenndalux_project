import { render, screen } from '@testing-library/react';
import Blog from '../page';
import { listBlogPosts } from '@/lib/services/content';
import type { BlogPost } from '@/types/content';

jest.mock('@/lib/services/content', () => ({
  listBlogPosts: jest.fn(),
  mediaUrl: (path: string) => path,
}));
jest.mock('@/components/layout/Header', () => function Header() { return <header />; });
jest.mock('@/components/layout/Footer', () => function Footer() { return <footer />; });

const mockedList = listBlogPosts as jest.MockedFunction<typeof listBlogPosts>;

const post = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  id: 1,
  title: 'Cortinas inteligentes',
  slug: 'cortinas-inteligentes',
  excerpt: 'Qué son y cómo elegirlas.',
  content_blocks: [],
  cover_image_url: '/media/portada.webp',
  published_at: '2026-08-01T10:00:00Z',
  created_at: '2026-08-01T10:00:00Z',
  meta_title: '',
  meta_description: '',
  tags: [{ id: 1, name: 'Tecnología', slug: 'tecnologia' }],
  read_time_minutes: 8,
  ...overrides,
});

describe('Blog list', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the posts published in the admin', async () => {
    mockedList.mockResolvedValue([post(), post({ id: 2, title: 'Persianas celulares', slug: 'persianas' })]);
    render(<Blog />);

    // La página pinta variante móvil y de escritorio, de ahí el getAll.
    expect(await screen.findAllByText('Cortinas inteligentes')).not.toHaveLength(0);
    expect(screen.getAllByText('Persianas celulares')).not.toHaveLength(0);
  });

  it('builds the category filter from the tags the posts actually carry', async () => {
    mockedList.mockResolvedValue([
      post({ tags: [{ id: 1, name: 'Tecnología', slug: 'tecnologia' }] }),
      post({ id: 2, slug: 'b', title: 'B', tags: [{ id: 2, name: 'Diseño', slug: 'diseno' }] }),
    ]);
    render(<Blog />);

    expect(await screen.findByRole('button', { name: 'Tecnología' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Diseño' })).toBeInTheDocument();
    // Antes estaban fijas en el código e incluían categorías sin un solo post.
    expect(screen.queryByRole('button', { name: 'Sostenibilidad' })).not.toBeInTheDocument();
  });

  it('shows the read time the backend computed', async () => {
    mockedList.mockResolvedValue([post({ read_time_minutes: 12 })]);
    render(<Blog />);

    expect(await screen.findAllByText(/12 min/)).not.toHaveLength(0);
  });

  it('labels a post with no tags rather than leaving the badge empty', async () => {
    mockedList.mockResolvedValue([post({ tags: [] })]);
    render(<Blog />);

    // El botón del filtro y la insignia de la tarjeta, ambos con la etiqueta.
    expect(await screen.findByRole('button', { name: 'General' })).toBeInTheDocument();
    expect(screen.getAllByText('General').length).toBeGreaterThan(1);
  });

  it('does not claim there are no results while it is still loading', () => {
    mockedList.mockReturnValue(new Promise(() => {}));
    render(<Blog />);

    expect(screen.queryByText(/No encontramos artículos/)).not.toBeInTheDocument();
    expect(screen.getByLabelText('Cargando artículos')).toBeInTheDocument();
  });

  it('says so when the admin has published nothing', async () => {
    mockedList.mockResolvedValue([]);
    render(<Blog />);

    expect(await screen.findByText(/No encontramos artículos/)).toBeInTheDocument();
  });
});
