'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { 
  ClipboardDocumentCheckIcon, 
  SwatchIcon, 
  TruckIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Cotización',
    description: 'Envíanos las medidas aproximadas de tus ventanas y recibe un presupuesto preliminar en menos de 24 horas.'
  },
  {
    icon: SwatchIcon,
    title: 'Asesoría en Casa',
    description: 'Un experto te visitará para rectificar medidas y mostrarte nuestro catálogo físico de telas y acabados.'
  },
  {
    icon: TruckIcon,
    title: 'Fabricación e Instalación',
    description: 'Fabricamos tus persianas a medida y las instalamos profesionalmente para asegurar un funcionamiento perfecto.'
  },
  {
    icon: SparklesIcon,
    title: 'Garantía Total',
    description: 'Disfruta de tus espacios con la tranquilidad de contar con nuestra garantía extendida y soporte post-venta.'
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      if (stepsRef.current) {
        gsap.set(stepsRef.current, { opacity: 0, y: 60 });
      }

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

      if (stepsRef.current) {
        gsap.to(stepsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => (
    <div className="relative bg-white pt-4 group">
      <div className="w-36 h-36 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto bg-stone-50 rounded-[2rem] flex items-center justify-center mb-8 sm:mb-10 border-2 border-stone-200 shadow-lg text-stone-800 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-500">
        <step.icon className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 stroke-[1.2]" />
      </div>
      <div className="text-center px-2 sm:px-4">
        <div className="text-xs font-bold text-stone-400 mb-2 sm:hidden">Paso {index + 1}</div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 mb-3 sm:mb-4">{step.title}</h3>
        <p className="text-sm sm:text-base md:text-lg text-stone-500 leading-relaxed font-light">
          {step.description}
        </p>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-36 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
        <div ref={headerRef} className="text-center mb-14 md:mb-32">
          <span className="text-sm sm:text-base font-semibold text-stone-400 tracking-[0.2em] uppercase mb-4 sm:mb-6 block">Proceso Simple</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
            Tu proyecto en 4 pasos
          </h2>
        </div>

        {/* Mobile: Swiper carousel */}
        <div ref={stepsRef}>
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.3}
              centeredSlides={true}
              loop={false}
              rewind={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="process-swiper !pb-10"
            >
              {steps.map((step, index) => (
                <SwiperSlide key={index}>
                  <StepCard step={step} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 relative">
            <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 -z-10" />
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
