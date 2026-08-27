import type { ReactNode } from 'react';
import { render, screen, within } from '@testing-library/react';
import GoogleReviews from '../GoogleReviews';
import type { GoogleReview } from '@/lib/data/googleReviews';

// Swiper ships ESM and only matters for presentation here, so the carousel is
// flattened to plain markup and the tests assert on the cards themselves.
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('swiper/modules', () => ({ Autoplay: {}, Pagination: {} }));

const mockReviews: GoogleReview[] = [];
const mockAggregate: { rating: number | null; count: number | null } = { rating: 4.8, count: 143 };

jest.mock('@/lib/data/googleReviews', () => {
  const actual = jest.requireActual('@/lib/data/googleReviews');
  return {
    ...actual,
    publishedReviews: () => mockReviews,
    get GOOGLE_RATING() {
      return mockAggregate.rating;
    },
    get GOOGLE_REVIEW_COUNT() {
      return mockAggregate.count;
    },
  };
});

const review = (overrides: Partial<GoogleReview> = {}): GoogleReview => ({
  author: 'Ana Rodríguez',
  rating: 5,
  date: 'hace 2 meses',
  text: 'Instalaron las cortinas del apartamento y quedaron impecables.',
  url: 'https://share.google/ana',
  ...overrides,
});

function renderWith(reviews: GoogleReview[], props: { id?: string } = {}) {
  mockReviews.splice(0, mockReviews.length, ...reviews);
  return render(<GoogleReviews {...props} />);
}

describe('GoogleReviews', () => {
  beforeEach(() => {
    mockAggregate.rating = 4.8;
    mockAggregate.count = 143;
  });

  it('renders nothing while no review has been loaded', () => {
    const { container } = renderWith([]);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the review text, author and a link to that review on Google', () => {
    renderWith([review()]);

    expect(screen.getByText(/quedaron impecables/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ana Rodríguez/ })).toHaveAttribute(
      'href',
      'https://share.google/ana',
    );
  });

  it('shows the profile totals rather than the average of the loaded sample', () => {
    renderWith([review({ rating: 5 }), review({ rating: 5, url: 'https://share.google/b' })]);

    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('143 opiniones')).toBeInTheDocument();
  });

  it('falls back to the loaded sample when the profile totals are unset', () => {
    mockAggregate.rating = null;
    mockAggregate.count = null;
    renderWith([review({ rating: 5 }), review({ rating: 4, url: 'https://share.google/b' })]);

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('2 opiniones')).toBeInTheDocument();
  });

  it('drives the main call to action to the Google profile', () => {
    renderWith([review()]);

    expect(screen.getByRole('link', { name: 'Ver las 143 reseñas en Google' })).toHaveAttribute(
      'href',
      'https://share.google/IzOrQiMDU3qLOqptR',
    );
  });

  it('offers a WhatsApp call to action alongside the reviews', () => {
    renderWith([review()]);

    expect(screen.getByRole('link', { name: 'Cuéntanos tu proyecto' })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/573227904563'),
    );
  });

  it('keeps the reviews in the curated order', () => {
    renderWith([
      review({ author: 'Primera', url: 'https://share.google/1' }),
      review({ author: 'Segunda', url: 'https://share.google/2' }),
      review({ author: 'Tercera', url: 'https://share.google/3' }),
    ]);

    const authors = within(screen.getByTestId('swiper'))
      .getAllByRole('link')
      .map((card) => within(card).getByText(/Primera|Segunda|Tercera/).textContent);
    expect(authors).toEqual(['Primera', 'Segunda', 'Tercera']);
  });

  it('takes a custom id so the section can appear twice on the page', () => {
    const { container } = renderWith([review()], { id: 'opiniones-faq' });
    expect(container.querySelector('section')).toHaveAttribute('id', 'opiniones-faq');
  });
});
