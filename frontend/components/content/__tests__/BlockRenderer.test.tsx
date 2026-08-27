import { render, screen } from '@testing-library/react';
import BlockRenderer from '../BlockRenderer';
import type { ContentBlock } from '@/types/content';

describe('BlockRenderer', () => {
  it('renders every block type the admin can produce', () => {
    const blocks: ContentBlock[] = [
      { type: 'parrafo', heading: 'Qué son', text: 'Sistemas motorizados.' },
      { type: 'lista', items: ['Control de luz'] },
      { type: 'ejemplos', items: ['Oficinas en casa'] },
      { type: 'subsecciones', items: [{ title: 'Básico', description: 'Un motor.' }] },
      { type: 'linea_de_tiempo', steps: [{ step: 'Medición', description: 'Visita.', duration: '1 día' }] },
      { type: 'metricas', items: [{ metric: '-40%', description: 'Menos calor.' }] },
      { type: 'galeria', images: [{ id: 'img_1', url: '/media/a.webp', alt: 'Sala' }] },
      { type: 'video', youtube_url: 'https://youtu.be/abc', youtube_id: 'abc', title: 'Demo' },
      { type: 'testimonio', text: 'Impecable.', author: 'Ana', role: 'Cliente' },
      { type: 'cierre', text: 'Cada espacio es distinto.', note: 'Escríbenos.' },
    ];

    render(<BlockRenderer blocks={blocks} />);

    expect(screen.getByText('Sistemas motorizados.')).toBeInTheDocument();
    expect(screen.getByText('Control de luz')).toBeInTheDocument();
    expect(screen.getByText('Oficinas en casa')).toBeInTheDocument();
    expect(screen.getByText('Básico')).toBeInTheDocument();
    expect(screen.getByText('Medición')).toBeInTheDocument();
    expect(screen.getByText('-40%')).toBeInTheDocument();
    expect(screen.getByAltText('Sala')).toBeInTheDocument();
    expect(screen.getByTitle('Demo')).toBeInTheDocument();
    expect(screen.getByText(/Impecable/)).toBeInTheDocument();
    expect(screen.getByText('Cada espacio es distinto.')).toBeInTheDocument();
  });

  it('keeps the order the admin gave the blocks', () => {
    render(
      <BlockRenderer
        blocks={[
          { type: 'parrafo', text: 'Primero' },
          { type: 'parrafo', text: 'Segundo' },
          { type: 'parrafo', text: 'Tercero' },
        ]}
      />,
    );

    const texts = screen.getAllByText(/Primero|Segundo|Tercero/).map((n) => n.textContent);
    expect(texts).toEqual(['Primero', 'Segundo', 'Tercero']);
  });

  it('embeds the video from the id the backend resolved', () => {
    render(
      <BlockRenderer
        blocks={[{ type: 'video', youtube_url: 'https://youtu.be/xyz', youtube_id: 'xyz' }]}
      />,
    );

    expect(screen.getByTitle('Video')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/xyz',
    );
  });

  it('skips a video whose url the backend could not resolve', () => {
    const { container } = render(
      <BlockRenderer blocks={[{ type: 'video', youtube_url: 'roto', youtube_id: null }]} />,
    );

    expect(container.querySelector('iframe')).toBeNull();
  });

  it('skips a gallery left empty because its images were deleted', () => {
    render(<BlockRenderer blocks={[{ type: 'galeria', heading: 'Antes y después', images: [] }]} />);

    // El encabezado suelto sin fotos se leería como una sección rota.
    expect(screen.queryByText('Antes y después')).not.toBeInTheDocument();
  });

  it('drops a block type it does not know instead of breaking the page', () => {
    const unknown = { type: 'mapa', lat: 4.7 } as unknown as ContentBlock;

    render(<BlockRenderer blocks={[unknown, { type: 'parrafo', text: 'Sigue vivo' }]} />);

    expect(screen.getByText('Sigue vivo')).toBeInTheDocument();
  });
});
