import { render, screen } from '@testing-library/react';
import CurtainCard from '../CurtainCard';
import { CURTAINS } from '@/lib/data/curtains';

const curtain = CURTAINS[0];

describe('CurtainCard', () => {
  it('shows the image before the text on mobile, and beside it from md up', () => {
    const { container } = render(<CurtainCard curtain={curtain} />);
    const figure = container.querySelector('.aspect-\\[4\\/5\\]')!;

    // order-first la sube en la columna única del móvil; md:order-none la
    // devuelve a su lugar en el DOM, que es la segunda celda de la grilla.
    expect(figure).toHaveClass('order-first', 'md:order-none');
  });

  it('frames the image at the ratio the photos actually have', () => {
    const { container } = render(<CurtainCard curtain={curtain} />);

    // Las nueve son 800x1000. Un contenedor 4/3 con object-cover les recorta
    // casi la mitad del alto.
    expect(container.querySelector('.aspect-\\[4\\/5\\]')).not.toBeNull();
    expect(container.querySelector('.aspect-\\[4\\/3\\]')).toBeNull();
  });

  it('still renders the curtain content', () => {
    render(<CurtainCard curtain={curtain} />);

    expect(screen.getByRole('heading', { name: curtain.title })).toBeInTheDocument();
    expect(screen.getByAltText(curtain.title)).toBeInTheDocument();
    expect(screen.getByText(curtain.beneficios[0])).toBeInTheDocument();
  });
});
