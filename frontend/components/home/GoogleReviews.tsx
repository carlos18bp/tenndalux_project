'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  publishedReviews,
  type GoogleReview,
} from '@/lib/data/googleReviews';
import { whatsappUrl } from '@/lib/whatsapp';

const WHATSAPP_URL = whatsappUrl('contarles mi proyecto');

// Long enough to actually read a review before it moves on.
const AUTOPLAY_DELAY_MS = 7000;

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
      className="flex flex-col gap-4 h-full bg-white border border-stone-200 rounded-2xl p-6 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
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

/**
 * The section is rendered twice on the home page, so `id` keeps the anchors
 * unique instead of duplicating one across the document.
 */
export default function GoogleReviews({ id = 'opiniones' }: { id?: string }) {
  const reviews = publishedReviews();

  // Sin reseñas cargadas no hay prueba social que mostrar: la sección entera se
  // omite en vez de dejar un bloque vacío.
  if (reviews.length === 0) return null;

  const averageRating =
    GOOGLE_RATING ?? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const reviewCount = GOOGLE_REVIEW_COUNT ?? reviews.length;

  return (
    <section id={id} className="bg-stone-50 border-b border-stone-200 py-16 sm:py-20">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
              <CheckBadgeIcon className="w-4 h-4 text-stone-400" aria-hidden="true" />
              Opiniones verificadas en Google
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-4xl sm:text-5xl font-bold text-stone-900 tabular-nums">
                {averageRating.toFixed(1)}
              </span>
              <Stars rating={averageRating} className="w-6 h-6" />
              <span className="text-base text-stone-500">
                {reviewCount} {reviewCount === 1 ? 'opinión' : 'opiniones'}
              </span>
            </div>
            <p className="text-sm text-stone-500 max-w-md">
              Son reseñas reales publicadas en Google por nuestros clientes. Nadie las
              edita, ni nosotros.
            </p>
          </div>

          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 self-start lg:self-auto bg-stone-900 text-stone-50 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Ver las {reviewCount} reseñas en Google
          </a>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          loop={true}
          autoplay={{
            delay: AUTOPLAY_DELAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="reviews-swiper !pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.url} className="!h-auto">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mt-6 text-center sm:text-left">
          <p className="text-lg sm:text-xl text-stone-900 font-semibold max-w-md">
            {reviewCount} familias ya nos eligieron. ¿Hacemos la tuya la siguiente?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border-2 border-stone-300 text-stone-900 px-8 py-4 rounded-full font-semibold text-base hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-300 shrink-0"
          >
            Cuéntanos tu proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
