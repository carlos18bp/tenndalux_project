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

/** Panel del negocio en Google, con las 143 opiniones. */
export const GOOGLE_PROFILE_URL = 'https://share.google/IzOrQiMDU3qLOqptR';

/** Ficha en Google Maps (place CID 4281377378138462335). */
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps?cid=4281377378138462335';

/** Calificación global del perfil. */
export const GOOGLE_RATING: number | null = 4.8;

/** Cantidad total de opiniones del perfil. */
export const GOOGLE_REVIEW_COUNT: number | null = 143;

// Transcritas del perfil el 2026-08-26. Las fechas son relativas, como las
// muestra Google: si pasa mucho tiempo hay que volver a capturarlas.
// El texto va tal cual lo escribió cada persona, sin corregir ni recortar.
// El orden es el que pidió el cliente; las tres últimas venían de la primera
// tanda y se conservan al final.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Guillermo Andres Torres Ramirez',
    rating: 5,
    date: 'hace 3 semanas',
    text:
      'Realice la instalación de las cortinas motorizadas en mi apartamento y quede muy satisfecho. Manejan una excelente asesoría ya que en la visita se tomaron el tiempo necesario y sin prisas que me llevaron a tomar una buena decisión. La calidad de las telas y de los materiales son excelentes, entre los que destaco los motores y las telas. Adicional me ayudaron a programar los comandos para abrir y cerrar las cortinas a través de Alexa y crear escenarios lo cual me pareció una maravilla. Excelente la venta y la posventa porque realice una solicitud de la programación y me atendieron inmediatamente para resolver mis dudas. Tenndalux muchas gracias.',
    url: 'https://share.google/5fECPLt4JYZziS57i',
  },
  {
    author: 'Nataly Oviedo',
    rating: 5,
    date: 'hace 3 meses',
    text:
      'La atención es muy buena, te asesoran y la calidad es excelente',
    url: 'https://share.google/jwX8sCVV6f2DHm8Ww',
  },
  {
    author: 'weymar gomez',
    rating: 5,
    date: 'hace 6 meses',
    text:
      'Que buena decisión haber realizado el proceso de elegir a Tenndalux para las cortinas y Blackout de mi apto. Personas profesionales, agradables, decentes y cumplidos. Recomendados 100%',
    url: 'https://share.google/AIs0nk6PlkKszATZU',
  },
  {
    author: 'Monica Santos',
    rating: 5,
    date: 'hace 4 meses',
    text:
      'Super recomendados. Desde el inicio de la asesoría, durante el proceso de elaboración y en la entrega e instalación. Todo impecable 11/10. Muchas gracias Tenndalux quedé muy feliz con mis cortinas',
    url: 'https://share.google/ClBMfPkSdhVgERcxB',
  },
  {
    author: 'Estudio Juridico',
    rating: 5,
    date: 'hace 4 meses',
    text:
      'Excelente servicio y calidad. Los recomiendo. Muy profesionales y cumplidos. Trabajan mucho la estética. Cero cables visibles. Compatibles con automatización. La verde los recomiendo.',
    url: 'https://share.google/5Xp1ueYRSPcRrPbgz',
  },
  {
    author: 'Milena Moreno',
    rating: 5,
    date: 'hace 5 meses',
    text:
      'Excelente aliado para las cortinas de tu hogar! Una empresa seria, responsable, cumplida y que está pendiente de todo el proceso desde la cotización hasta la post venta. Los recomiendo al 100%',
    url: 'https://share.google/Gy5Pg5GFMPbG45ulo',
  },
  {
    author: 'Juan Pablo Castro Peña',
    rating: 5,
    date: 'hace 6 meses',
    text:
      'Excelente servicio y calidad, muy buena asistencia y variedad de productos, súper recomendado',
    url: 'https://share.google/uvqxAUVoGomqsCWJl',
  },
  {
    author: 'CARLOS ECHEVERRY RAMIREZ',
    rating: 5,
    date: 'hace 7 meses',
    text:
      'Excelente inversión. Recomiendo 110%',
    url: 'https://share.google/n6pYbJjDB3dnb8nfI',
  },
  {
    author: 'LUIS FERNANDO LEAL GOMEZ',
    rating: 5,
    date: 'hace 6 meses',
    text:
      'Los mejores en tiempos de entrega, instalación y post venta',
    url: 'https://share.google/EwYpDhvU3WdQlUUYF',
  },
  {
    author: 'Adriana Cuestas',
    rating: 5,
    date: 'hace 6 meses',
    text:
      'Excelente servicio, cumplidos. Se puede presentar incidentes pero muy amables y dispuestos para dar solución lo más rápido posible',
    url: 'https://share.google/mOTz0qw60laxqKP24',
  },
  {
    author: 'L Acosta',
    rating: 5,
    date: 'hace 7 meses',
    text:
      'Excelente servicio, entienden tus necesidades, van a tu casa y toman medidas. Sin duda, recomendaría a esta empresa. Encortine todo mi apto con ellos y fue la mejor decisión!',
    url: 'https://maps.app.goo.gl/iLSSQHgWCCibS6yf8',
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
