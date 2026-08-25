'use client';

import { useEffect, useRef, useState } from 'react';

// Google Customer Reviews (Merchant Center). The merchant id is public by
// design — it travels inside the badge iframe URL — so it ships in the bundle;
// the env var only exists so another account can be pointed at in staging.
const MERCHANT_ID = Number(process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID ?? 5538542234);

const GAPI_SRC = 'https://apis.google.com/js/platform.js';

// Google always injects its iframe, but leaves it empty (0px tall) when the
// account has no survey data or when the origin is not the one registered in
// Merchant Center. Presence of the iframe is therefore NOT proof of a badge --
// only a laid-out height is, and the strip stays collapsed until it measures one.
const RENDER_TIMEOUT_MS = 8000;
const POLL_INTERVAL_MS = 250;
const MIN_BADGE_HEIGHT_PX = 20;

type RatingBadgeApi = {
  render: (
    container: Element,
    options: { merchant_id: number; position: 'INLINE' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' },
  ) => void;
};

type Gapi = {
  load: (feature: string, callback: () => void) => void;
  ratingbadge?: RatingBadgeApi;
};

declare global {
  interface Window {
    gapi?: Gapi;
  }
}

function loadGapi(): Promise<Gapi> {
  if (window.gapi) return Promise.resolve(window.gapi);

  return new Promise((resolve, reject) => {
    const settle = () => (window.gapi ? resolve(window.gapi) : reject(new Error('gapi missing')));

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GAPI_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', settle, { once: true });
      existing.addEventListener('error', () => reject(new Error('gapi failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = GAPI_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', settle, { once: true });
    script.addEventListener('error', () => reject(new Error('gapi failed')), { once: true });
    document.head.appendChild(script);
  });
}

type Status = 'loading' | 'ready' | 'unavailable';

// Why nothing showed up -- surfaced in the development-only notice so the miss
// can be told apart from a wiring bug without opening the devtools.
type Miss = 'empty-iframe' | 'no-iframe' | 'script-failed';

const MISS_REASON: Record<Miss, string> = {
  'empty-iframe':
    'Google devolvió un badge vacío. Pasa cuando el comercio aún no acumula respuestas de encuestas, o cuando el origen no es el dominio registrado en Merchant Center (este dev server no lo es).',
  'no-iframe': 'Google no llegó a inyectar el badge.',
  'script-failed': 'No se pudo cargar apis.google.com/js/platform.js.',
};

export default function GoogleReviewsBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [miss, setMiss] = useState<Miss | null>(null);

  useEffect(() => {
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | undefined;

    const stopPolling = () => {
      if (poll) clearInterval(poll);
      poll = undefined;
    };

    // The badge is an iframe injected asynchronously by gapi; there is no
    // callback for "rendered", so we watch the container until it has real size.
    const waitForBadge = () => {
      const deadline = Date.now() + RENDER_TIMEOUT_MS;
      poll = setInterval(() => {
        if (cancelled) return stopPolling();

        const iframe = containerRef.current?.querySelector('iframe');
        if (iframe && iframe.getBoundingClientRect().height >= MIN_BADGE_HEIGHT_PX) {
          stopPolling();
          setStatus('ready');
        } else if (Date.now() > deadline) {
          stopPolling();
          setMiss(iframe ? 'empty-iframe' : 'no-iframe');
          setStatus('unavailable');
        }
      }, POLL_INTERVAL_MS);
    };

    loadGapi()
      .then((gapi) => {
        if (cancelled) return;
        gapi.load('ratingbadge', () => {
          if (cancelled || !containerRef.current || !gapi.ratingbadge) return;
          gapi.ratingbadge.render(containerRef.current, {
            merchant_id: MERCHANT_ID,
            position: 'INLINE',
          });
          waitForBadge();
        });
      })
      .catch(() => {
        if (cancelled) return;
        setMiss('script-failed');
        setStatus('unavailable');
      });

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, []);

  const isDev = process.env.NODE_ENV !== 'production';
  const showPlaceholder = isDev && status === 'unavailable';
  const isVisible = status === 'ready' || showPlaceholder;

  return (
    <section
      aria-hidden={!isVisible}
      className={`bg-stone-50 border-b border-stone-200 transition-opacity duration-500 ${
        isVisible ? 'py-8 sm:py-10 opacity-100' : 'h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16 flex flex-col items-center gap-4">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
          Opiniones verificadas por Google
        </p>
        <div ref={containerRef} className="min-h-[1px]" />
        {showPlaceholder && (
          <p className="text-xs text-stone-400 border border-dashed border-stone-300 rounded-lg px-4 py-3 text-center max-w-md">
            Solo visible en desarrollo (comercio {MERCHANT_ID}):{' '}
            {MISS_REASON[miss ?? 'no-iframe']} En producción esta franja no se
            muestra.
          </p>
        )}
      </div>
    </section>
  );
}
