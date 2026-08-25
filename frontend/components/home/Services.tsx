'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

/**
 * Imágenes de las cards de "Nuestras Soluciones".
 *
 * Assets entregados por el cliente (carpeta "NUESTRAS SOLUCIONES"), optimizados
 * a WebP q80 y servidos desde `frontend/public/products/<solucion>/`.
 * Es el único lugar que hay que tocar: el array `services` lee de aquí.
 */
const SOLUTION_IMAGES = {
  enrollables: '/products/enrollables/enrollables-portada.webp',
  ondessence: '/products/ondessence/ondessence-portada.webp',
  luminux: '/products/luminux/luminux-portada.webp',
  tecnologia: '/products/tecnologia/tecnologia-portada.webp',
  exterior: '/products/exterior/exterior-portada.webp',
  recubrimientos: '/products/recubrimientos/recubrimientos-portada.webp',
  peliculasSolares: '/products/peliculas-solares/peliculas-solares-portada.webp',
} as const;

const services = [
  {
    id: 1,
    title: 'Cortinas enrollables',
    description: 'Control de luz, privacidad y diseño minimalista en un sistema práctico y versátil.',
    image: SOLUTION_IMAGES.enrollables,
    link: '/servicios#cortinas'
  },
  {
    id: 2,
    title: 'Ondessence',
    description: 'Ondas suaves y continuas que aportan movimiento, suavidad y diseño a tus espacios.',
    image: SOLUTION_IMAGES.ondessence,
    link: '/servicios#cortinas'
  },
  {
    id: 3,
    title: 'Luminux',
    description: 'Ondas tipo M o S con giro de 180°, para controlar luz y privacidad en un solo sistema.',
    image: SOLUTION_IMAGES.luminux,
    link: '/servicios#cortinas'
  },
  {
    id: 4,
    title: 'Tecnología y automatización',
    description: 'Motores avanzados, control por voz, app gratuita e integración con asistentes inteligentes.',
    image: SOLUTION_IMAGES.tecnologia,
    link: '/servicios#tecnologia'
  },
  {
    id: 5,
    title: 'Soluciones para exterior',
    description: 'Toldos, pérgolas y sistemas de control solar para disfrutar tus espacios al aire libre.',
    image: SOLUTION_IMAGES.exterior,
    link: '/servicios#exterior'
  },
  {
    id: 6,
    title: 'Recubrimiento para paredes',
    description: 'Papeles tapiz, texturas y acabados que dan personalidad a cada espacio.',
    image: SOLUTION_IMAGES.recubrimientos,
    link: '/servicios#paredes'
  },
  {
    id: 7,
    title: 'Películas de control solar',
    description: 'Protección solar, privacidad y confort térmico sin perder la luz natural ni la vista exterior.',
    image: SOLUTION_IMAGES.peliculasSolares,
    link: '/servicios#exterior'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apple-style blur reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60, filter: 'blur(15px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }
        }
      );

      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, delay: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="py-20 md:py-36 bg-white">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-28 gap-6 md:gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 tracking-tight">
              Nuestras Soluciones
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light">
              Cortinas, automatización, recubrimientos y soluciones exteriores diseñadas con tecnología y precisión.
            </p>
          </div>
          
          <Link 
            href="/servicios" 
            className="hidden md:inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border-2 border-stone-200 text-stone-900 font-semibold text-lg hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
          >
            <span>Ver todos los servicios</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>

        <div ref={sliderRef} className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 3.5,
              },
            }}
            className="services-swiper !pb-12"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <Link href={service.link} className="block group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {service.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      Explorar
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 md:hidden text-center">
          <Link 
            href="/servicios" 
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-stone-200 text-stone-900 font-medium hover:bg-stone-50 hover:border-stone-300 transition-all duration-200 w-full sm:w-auto"
          >
            <span>Ver todos los servicios</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
