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

const services = [
  {
    id: 1,
    title: 'Cortinas Modernas',
    description: 'Elegancia y suavidad con tejidos que transforman la luz natural de tus espacios.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    link: '/servicios/cortinas'
  },
  {
    id: 2,
    title: 'Persianas Enrollables',
    description: 'Funcionalidad minimalista con control preciso de privacidad y protección UV.',
    image: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=800&auto=format&fit=crop',
    link: '/servicios/persianas'
  },
  {
    id: 3,
    title: 'Automatización',
    description: 'Sistemas inteligentes para controlar tus cortinas desde tu smartphone o voz.',
    image: 'https://images.unsplash.com/photo-1558002038-10917738179d?q=80&w=800&auto=format&fit=crop',
    link: '/servicios/automatizacion'
  },
  {
    id: 4,
    title: 'Toldos Exteriores',
    description: 'Disfruta de tus terrazas y balcones con protección solar de alto rendimiento.',
    image: 'https://images.unsplash.com/photo-1631641551473-f303d9d2cc80?q=80&w=800&auto=format&fit=crop',
    link: '/servicios/toldos'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(sliderRef.current, { opacity: 0, y: 60 });

      // Animate on scroll
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });

      gsap.to(sliderRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sliderRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="py-36 md:py-44 bg-white">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-28 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 tracking-tight">
              Soluciones Integrales
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light">
              Descubre nuestra gama de productos diseñados para elevar el confort y la estética de tu hogar u oficina.
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
                <div className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
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
                </div>
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
