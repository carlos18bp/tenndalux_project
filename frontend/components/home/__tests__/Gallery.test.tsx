import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Gallery from '../Gallery';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  context: (fn: () => void) => { fn(); return { revert: jest.fn() }; },
  fromTo: jest.fn(),
}));
jest.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('swiper/modules', () => ({ Autoplay: {}, Pagination: {} }));

// Se cuentan los elementos que el observador global (jest.setup.ts) vigila.
const observed: Element[] = [];
const realObserve = window.IntersectionObserver.prototype.observe;

beforeAll(() => {
  window.IntersectionObserver.prototype.observe = function (target: Element) {
    observed.push(target);
    return realObserve.call(this, target);
  };
});

beforeEach(() => {
  observed.length = 0;
  jest.clearAllMocks();
});

describe('Gallery', () => {
  it('shows the five project clips', () => {
    render(<Gallery />);

    // La grilla y el carrusel móvil renderizan ambos, de ahí el ×2.
    for (const n of [1, 2, 3, 4, 5]) {
      expect(screen.getAllByLabelText(`Proyecto ${n} — instalación de cortinas`)).toHaveLength(2);
    }
  });

  it('plays the clips only while they are on screen', () => {
    render(<Gallery />);

    expect(observed.length).toBeGreaterThan(0);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('opens the modal with the full video, not the clip', () => {
    render(<Gallery />);

    const clip = screen.getAllByLabelText('Proyecto 3 — instalación de cortinas')[0];
    fireEvent.click(clip.closest('.group')!);

    const source = document.querySelector('video[controls] source');
    expect(source).toHaveAttribute('src', '/videos/proyectos/proyecto-3.webm');
    // Si abriera el clip, el visitante vería 7 segundos y no el proyecto.
    expect(source).not.toHaveAttribute('src', '/videos/proyectos/proyecto-3-clip.webm');
  });

  it('does not open the modal from a still image', () => {
    render(<Gallery />);

    fireEvent.click(screen.getAllByAltText('Cortina Classic elegante')[0].closest('.group')!);

    expect(document.querySelector('video[controls]')).toBeNull();
  });

  it('shows a poster frame so the card is never a black rectangle', () => {
    render(<Gallery />);

    const clip = screen.getAllByLabelText('Proyecto 2 — instalación de cortinas')[0];
    expect(clip).toHaveAttribute('poster', '/videos/proyectos/proyecto-2-poster.webp');
  });

  it('never preloads the clips, so opening the home does not fetch them', () => {
    render(<Gallery />);

    document.querySelectorAll('video:not([controls])').forEach((video) => {
      expect(video).toHaveAttribute('preload', 'none');
    });
  });
});
