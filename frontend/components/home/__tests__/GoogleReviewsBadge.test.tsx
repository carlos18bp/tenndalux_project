import { act, render, screen } from '@testing-library/react';
import GoogleReviewsBadge from '../GoogleReviewsBadge';

const GAPI_SRC = 'https://apis.google.com/js/platform.js';
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

function setNodeEnv(value: string) {
  Object.defineProperty(process.env, 'NODE_ENV', { value, configurable: true });
}

// jsdom lays nothing out, so a real Google badge is simulated by an iframe that
// reports a height -- which is exactly what the component measures.
function makeIframe(height: number) {
  const iframe = document.createElement('iframe');
  iframe.getBoundingClientRect = () => ({ height }) as DOMRect;
  return iframe;
}

function strip() {
  // The label is always mounted; the <section> around it carries the state.
  return screen.getByText('Opiniones verificadas por Google').closest('section')!;
}

describe('GoogleReviewsBadge', () => {
  afterEach(() => {
    setNodeEnv(ORIGINAL_NODE_ENV!);
    delete window.gapi;
    document.querySelectorAll(`script[src="${GAPI_SRC}"]`).forEach((s) => s.remove());
    jest.useRealTimers();
  });

  it('stays collapsed and loads the Google platform script while the badge is pending', () => {
    render(<GoogleReviewsBadge />);

    expect(document.querySelector(`script[src="${GAPI_SRC}"]`)).not.toBeNull();
    expect(strip()).toHaveClass('h-0', 'opacity-0');
    expect(strip()).toHaveAttribute('aria-hidden', 'true');
  });

  it('reveals the strip once Google injects the badge iframe', async () => {
    jest.useFakeTimers();
    let renderedInto: Element | null = null;
    window.gapi = {
      load: (_feature: string, callback: () => void) => callback(),
      ratingbadge: {
        render: (container: Element) => {
          renderedInto = container;
          container.appendChild(makeIframe(65));
        },
      },
    };

    render(<GoogleReviewsBadge />);
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(renderedInto).not.toBeNull();
    expect(strip()).toHaveClass('opacity-100');
    expect(strip()).toHaveAttribute('aria-hidden', 'false');
  });

  it('stays collapsed when Google injects an empty badge iframe', async () => {
    jest.useFakeTimers();
    setNodeEnv('production');
    window.gapi = {
      load: (_feature: string, callback: () => void) => callback(),
      ratingbadge: {
        render: (container: Element) => container.appendChild(makeIframe(0)),
      },
    };

    render(<GoogleReviewsBadge />);
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(9000);
    });

    expect(strip().querySelector('iframe')).not.toBeNull();
    expect(strip()).toHaveClass('h-0', 'opacity-0');
  });

  it('names the empty-badge cause in the development notice', async () => {
    jest.useFakeTimers();
    window.gapi = {
      load: (_feature: string, callback: () => void) => callback(),
      ratingbadge: {
        render: (container: Element) => container.appendChild(makeIframe(0)),
      },
    };

    render(<GoogleReviewsBadge />);
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(9000);
    });

    expect(screen.getByText(/badge vac[ií]o/)).toBeInTheDocument();
  });

  it('stays hidden in production when Google renders nothing', async () => {
    jest.useFakeTimers();
    setNodeEnv('production');
    window.gapi = {
      load: (_feature: string, callback: () => void) => callback(),
      ratingbadge: { render: () => {} },
    };

    render(<GoogleReviewsBadge />);
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(9000);
    });

    expect(screen.queryByText(/Solo visible en desarrollo/)).not.toBeInTheDocument();
    expect(strip()).toHaveClass('h-0', 'opacity-0');
  });
});
