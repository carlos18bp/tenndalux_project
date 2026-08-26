'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Curtain } from '@/lib/data/curtains';

const BEAD_COUNT = 6;
const BEAD_SIZE_PX = 4;

// La cadena se dibuja bolita por bolita, da el tirón, y en ese mismo instante
// la pill empieza a bajar. Los tiempos se comparten para que el tirón y el
// desenrollado se lean como causa y efecto, no como dos animaciones seguidas.
const BEAD_STAGGER_S = 0.045;
const TUG_DELAY_S = 0.4;
const UNROLL_DELAY_S = 0.48;

type Props = {
  curtains: Curtain[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** El botón "Cortinas" de la fila de pestañas: de ahí cuelga la cadenilla. */
  originRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Selector de cortinas con la metáfora de una persiana roller: una cadenilla de
 * bolitas se descuelga del botón "Cortinas", alguien le da el tirón, y la pill
 * con las nueve opciones baja desenrollándose como la tela de la persiana.
 *
 * La pill queda centrada como la fila de pestañas, así que en reposo la
 * composición es simétrica. Lo que la ata a "Cortinas" es la cadena, que cuelga
 * de la x exacta de ese botón — y como en una persiana real la cadena va en un
 * extremo y no en el centro, la asimetría juega a favor.
 *
 * El desenrollado se hace con `clip-path` y no con `scaleY` porque escalar
 * aplastaría el texto de las opciones; el clip las revela a medida que baja,
 * que es justo lo que hace una persiana.
 */
export default function CurtainChainSelector({ curtains, selectedId, onSelect, originRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [chainLeft, setChainLeft] = useState<number | null>(null);
  const [chainSpan, setChainSpan] = useState(0);
  const reduceMotion = useReducedMotion();

  // La fila de pestañas envuelve según el ancho, así que la x del botón se mide
  // en vez de asumirse. La cadena ocupa el padding superior del contenedor, que
  // es exactamente el hueco que dejan las pestañas.
  useEffect(() => {
    const measure = () => {
      const origin = originRef.current;
      const container = containerRef.current;
      if (!origin || !container) return;

      const originBox = origin.getBoundingClientRect();
      const containerBox = container.getBoundingClientRect();
      setChainLeft(originBox.left + originBox.width / 2 - containerBox.left);
      setChainSpan(parseFloat(getComputedStyle(container).paddingTop));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [originRef]);

  const handleSelect = (id: string, index: number) => {
    onSelect(id);
    // Con nueve opciones la pill scrollea en pantallas angostas: la elegida se
    // centra sola para no dejarla mordida en el borde.
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const beadGap = chainSpan / BEAD_COUNT;

  return (
    <div ref={containerRef} className="relative -mt-10 sm:-mt-16 pt-10 sm:pt-16 mb-10 sm:mb-14">
      {!reduceMotion && chainLeft !== null && (
        <motion.div
          aria-hidden="true"
          className="absolute top-0"
          style={{ left: chainLeft, marginLeft: -BEAD_SIZE_PX / 2 }}
          animate={{ y: [0, 6, 0], opacity: [1, 1, 0] }}
          transition={{
            // El tirón: baja de golpe y vuelve.
            y: { delay: TUG_DELAY_S, duration: 0.3, times: [0, 0.45, 1], ease: 'easeOut' },
            // Se apaga recién después del tirón, mientras la persiana ya baja.
            opacity: { delay: TUG_DELAY_S + 0.22, duration: 0.3, times: [0, 0.3, 1] },
          }}
        >
          {Array.from({ length: BEAD_COUNT }, (_, i) => (
            <motion.span
              key={i}
              className="absolute block rounded-full bg-stone-400"
              style={{ top: i * beadGap, width: BEAD_SIZE_PX, height: BEAD_SIZE_PX }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * BEAD_STAGGER_S, duration: 0.16, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        className="relative w-fit max-w-full mx-auto"
        initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { delay: UNROLL_DELAY_S, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <div aria-hidden="true" className="absolute inset-0 rounded-full bg-stone-100 border border-stone-200" />

        <ul
          ref={trackRef}
          className="relative flex items-center gap-1 p-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {curtains.map((curtain, index) => {
            const isActive = curtain.id === selectedId;
            return (
              <li key={curtain.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(curtain.id, index)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative whitespace-nowrap rounded-full px-4 sm:px-5 py-2.5 text-sm transition-colors ${
                    isActive ? 'text-stone-50 font-semibold' : 'text-stone-600 hover:text-stone-900 font-medium'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="curtain-pill-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-stone-900"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{curtain.shortLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
