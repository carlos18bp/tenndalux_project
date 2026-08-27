'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { whatsappUrl } from '@/lib/whatsapp';

export type ContactFeedbackStatus = 'success' | 'error';

type Props = {
  status: ContactFeedbackStatus | null;
  onClose: () => void;
};

const COPY = {
  success: {
    title: '¡Solicitud enviada!',
    body: 'Gracias por escribirnos. Un asesor de Tenndalux te contactará dentro de las próximas 24 horas hábiles para agendar tu asesoría.',
    aside: '¿Prefieres hablar ahora?',
    cta: 'Escribirnos por WhatsApp',
    interest: 'agendar mi asesoría',
    dismiss: 'Volver al sitio',
  },
  error: {
    title: 'No pudimos enviar tu solicitud',
    body: 'Algo falló al enviar el formulario. Puedes intentarlo de nuevo en un momento, o escribirnos directamente y lo resolvemos por ahí.',
    aside: 'La vía más rápida:',
    cta: 'Escribirnos por WhatsApp',
    interest: 'agendar una asesoría',
    dismiss: 'Volver e intentar de nuevo',
  },
} as const;

/**
 * Confirmación del formulario de contacto del home.
 *
 * Reemplaza al `alert()` del navegador, que no se puede diseñar, bloquea el
 * hilo y en móvil aparece como un aviso del sistema —lo que lo hace leer como
 * un error y no como un acuse de recibo.
 */
export default function ContactFeedbackModal({ status, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = status !== null;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    // Mismo bloqueo de scroll que usan las hojas inferiores de /servicios.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  const copy = status ? COPY[status] : null;
  const isError = status === 'error';

  return (
    <AnimatePresence>
      {copy && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-feedback-title"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            <span
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                isError ? 'bg-amber-50 text-amber-600' : 'bg-stone-900 text-stone-50'
              }`}
            >
              {isError ? (
                <ExclamationTriangleIcon className="w-8 h-8" aria-hidden="true" />
              ) : (
                <CheckIcon className="w-8 h-8" aria-hidden="true" />
              )}
            </span>

            <h3 id="contact-feedback-title" className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">
              {copy.title}
            </h3>
            <p className="text-stone-600 leading-relaxed mb-8">{copy.body}</p>

            <div className="border-t border-stone-100 pt-6 space-y-4">
              <p className="text-sm text-stone-500">{copy.aside}</p>
              <a
                href={whatsappUrl(copy.interest)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-stone-900 text-stone-50 font-semibold hover:bg-stone-800 transition-colors"
              >
                {copy.cta}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
              >
                {copy.dismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
