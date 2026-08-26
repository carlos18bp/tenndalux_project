/** Número comercial de Tenndalux, en formato internacional sin signos. */
const SALES_PHONE = '573227904563';

/**
 * Arma el enlace de WhatsApp que abre un botón de la web.
 *
 * `interest` es lo que la persona quiere, redactado en primera persona y sin
 * el verbo inicial: "cotizar Toldos", "agendar una asesoría". Va después de
 * "estoy interesado en", así que el mensaje llega con el contexto de la
 * sección desde la que se pulsó y el asesor no tiene que empezar preguntando
 * de dónde salió el contacto. Sin `interest` cae al saludo genérico, que es lo
 * correcto para el botón flotante: no viene de ninguna sección concreta.
 */
export function whatsappUrl(interest?: string): string {
  const message = interest
    ? `Vi su página web y estoy interesado en ${interest}`
    : 'Vi su página web y quiero contactarlos';

  return `https://wa.me/${SALES_PHONE}?text=${encodeURIComponent(message)}`;
}
