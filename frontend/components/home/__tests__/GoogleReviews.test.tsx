import { render, screen } from '@testing-library/react';
import GoogleReviews from '../GoogleReviews';
import type { GoogleReview } from '@/lib/data/googleReviews';

// The section reads the curated list from the data module, so the tests drive
// it through that seam instead of a prop that production code never passes.
const mockReviews: GoogleReview[] = [];

jest.mock('@/lib/data/googleReviews', () => {
  const actual = jest.requireActual('@/lib/data/googleReviews');
  return { ...actual, publishedReviews: () => mockReviews };
});

const review = (overrides: Partial<GoogleReview> = {}): GoogleReview => ({
  author: 'Ana Rodríguez',
  rating: 5,
  date: 'hace 2 meses',
  text: 'Instalaron las cortinas del apartamento y quedaron impecables.',
  url: 'https://maps.app.goo.gl/iLSSQHgWCCibS6yf8',
  ...overrides,
});

function renderWith(reviews: GoogleReview[]) {
  mockReviews.splice(0, mockReviews.length, ...reviews);
  return render(<GoogleReviews />);
}

describe('GoogleReviews', () => {
  it('renders nothing while no review has been loaded', () => {
    const { container } = renderWith([]);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the review text, author and a link to that review on Google', () => {
    renderWith([review()]);

    expect(screen.getByText(/quedaron impecables/)).toBeInTheDocument();
    expect(screen.getByText('Ana Rodríguez')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ana Rodríguez/ })).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/iLSSQHgWCCibS6yf8',
    );
  });

  it('averages the loaded ratings when Google aggregates are not set', () => {
    renderWith([
      review({ rating: 5, url: 'https://maps.app.goo.gl/a' }),
      review({ rating: 4, url: 'https://maps.app.goo.gl/b' }),
    ]);

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('2 opiniones')).toBeInTheDocument();
  });

  it('links to the business profile on Google', () => {
    renderWith([review()]);

    expect(screen.getByRole('link', { name: 'Ver todas en Google' })).toHaveAttribute(
      'href',
      'https://www.google.com/maps?cid=4281377378138462335',
    );
  });
});
