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
    title: 'Cortina Ondessence',
    description: 'Sistema Ripplefold con ondas suaves y continuas. Tejidos europeos certificados y acabado premium.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 2,
    title: 'Luminux',
    description: 'Cortina de velo contemporánea. Luz difusa, privacidad y contacto visual con el exterior.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 3,
    title: 'Dunes',
    description: 'Cortina de velo con onda tipo montaña segmentada. Caída estructurada y acabado visual refinado.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 4,
    title: 'Tecnología y Automatización',
    description: 'Motores avanzados, control por voz, app gratuita e integración con asistentes inteligentes.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 5,
    title: 'Recubrimientos para Paredes',
    description: 'Vinilo, textil y ecológico. Materiales libres de compuestos nocivos e instalación profesional.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 6,
    title: 'Soluciones para Exterior',
    description: 'Toldos, pérgolas, cortinas exteriores y películas solares. Protección y diseño al aire libre.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
  },
  {
    id: 7,
    title: 'Servicio Integral',
    description: 'Asesoría, diseño, fabricación, instalación profesional, garantía y soporte postventa.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    link: '/servicios'
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
