import { StarIcon } from '@heroicons/react/24/solid';
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  publishedReviews,
  type GoogleReview,
} from '@/lib/data/googleReviews';

function Stars({ rating, className = 'w-4 h-4' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          aria-hidden="true"
          className={`${className} ${star <= Math.round(rating) ? 'text-amber-400' : 'text-stone-300'}`}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 bg-white border border-stone-200 rounded-2xl p-6 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900 text-stone-50 font-semibold text-sm shrink-0">
          {review.author.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-stone-900 text-sm truncate">{review.author}</span>
          <span className="block text-xs text-stone-500">{review.date}</span>
        </span>
      </div>
      <Stars rating={review.rating} />
      {/* whitespace-pre-line keeps the author's own paragraph breaks; the clamp
          caps card height and the card itself links to the full review. */}
      <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line line-clamp-8">
        {review.text}
      </p>
    </a>
  );
}

export default function GoogleReviews() {
  const reviews = publishedReviews();

  // Sin reseñas cargadas no hay prueba social que mostrar: la sección entera se
  // omite en vez de dejar un bloque vacío bajo el hero.
  if (reviews.length === 0) return null;

  const averageRating =
    GOOGLE_RATING ?? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const reviewCount = GOOGLE_REVIEW_COUNT ?? reviews.length;

  return (
    <section id="opiniones" className="bg-stone-50 border-b border-stone-200 py-16 sm:py-20">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
              Opiniones verificadas en Google
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                {averageRating.toFixed(1)}
              </span>
              <Stars rating={averageRating} className="w-5 h-5" />
              <span className="text-sm text-stone-500">
                {reviewCount} {reviewCount === 1 ? 'opinión' : 'opiniones'}
              </span>
            </div>
          </div>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto border border-stone-300 text-stone-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-300"
          >
            Ver todas en Google
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <ReviewCard key={review.url} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
