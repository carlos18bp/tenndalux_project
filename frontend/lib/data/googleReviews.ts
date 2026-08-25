// Reseñas reales del perfil de Google Maps de Tenndalux.
//
// Se cargan a mano a propósito: Google Maps renderiza las reseñas por XHR
// después de arrancar el JS, así que no hay forma de leerlas desde el permalink
// sin scrapear (contra sus términos) ni sin una API key de Places.
//
// Para actualizar: buscar "Tenndalux" en Google, abrir la ficha del negocio,
// entrar a "Opiniones", y copiar autor / estrellas / fecha / texto tal cual.
// Nunca inventar ni retocar el texto de una reseña.

export type GoogleReview = {
  /** Nombre del autor tal como aparece en Google. */
  author: string;
  /** Estrellas que dejó el autor, 1 a 5. */
  rating: number;
  /** Antigüedad tal como la muestra Google, ej. "hace 2 meses". */
  date: string;
  /** Texto de la reseña, sin editar. */
  text: string;
  /** Permalink de esa reseña concreta. */
  url: string;
};

/** Ficha del negocio en Google Maps (place CID 4281377378138462335). */
export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=4281377378138462335';

/** Calificación global. `null` mientras no se confirme el valor real en la ficha. */
export const GOOGLE_RATING: number | null = null;

/** Cantidad total de opiniones. `null` mientras no se confirme el valor real. */
export const GOOGLE_REVIEW_COUNT: number | null = null;

// Transcritas del perfil el 2026-08-25. Las fechas son relativas, como las
// muestra Google: si pasa mucho tiempo hay que volver a capturarlas.
// El texto va tal cual lo escribió cada persona, sin corregir ni recortar.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'L Acosta',
    rating: 5,
    date: 'hace 7 meses',
    text:
      'Excelente servicio, entienden tus necesidades, van a tu casa y toman medidas. Sin duda, recomendaría a esta empresa. Encortine todo mi apto con ellos y fue la mejor decisión!',
    url: 'https://maps.app.goo.gl/iLSSQHgWCCibS6yf8',
  },
  {
    author: 'Monica Santos',
    rating: 5,
    date: 'hace 4 meses',
    text:
      'Super recomendados. Desde el inicio de la asesoría, durante el proceso de elaboración y en la entrega e instalación. Todo impecable 11/10. Muchas gracias Tenndalux quedé muy feliz con mis cortinas',
    url: 'https://maps.app.goo.gl/qb9ZNeA5sJWb6nGt9',
  },
  {
    author: 'Caro Rubiano',
    rating: 5,
    date: 'hace 4 meses',
    text:
      'La experiencia fue excelente de principio a fin. La calidad del producto es muy buena y todo el proceso fue ágil y organizado. Quiero destacar especialmente la orientación y buena disposición del decorador, que fue clave para elegir la mejor opción según el espacio. Su asesoría fue muy profesional, con muy buen gusto y atención a los detalles.\n\nEl equipo de instalación también fue puntual, ordenado y dejó todo perfecto. Sin duda, una experiencia muy completa. ¡Totalmente recomendado!',
    url: 'https://maps.app.goo.gl/1PXScw39gioBtCKs9',
  },
  {
    author: 'Mayerli Mateus',
    rating: 5,
    date: 'hace 8 meses',
    text:
      'Muchas gracias a Tenndalux por la excelente experiencia y servicio al cliente.\n\nEl resultado final es impresionante, todo quedó muy bonito y acorde a nuestra sala, Gracias a la asesoría de Cesar en la selección de colores. La calidad, acabados y materiales son de primera.\n\n¡Recomiendo 100% Tenndalux!',
    url: 'https://maps.app.goo.gl/qg9q5Acmkj9npdbZ7',
  },
];

/** Sólo las reseñas efectivamente cargadas. */
export function publishedReviews(reviews: GoogleReview[] = GOOGLE_REVIEWS): GoogleReview[] {
  return reviews.filter((review) => review.text.trim() !== '' && review.author.trim() !== '');
}
