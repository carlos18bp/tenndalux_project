'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      // Set initial hidden state
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(stepsRef.current?.children || [], { opacity: 0, y: 60 });

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

      gsap.to(stepsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-36 md:py-44 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={headerRef} className="text-center mb-24 md:mb-32">
          <span className="text-base font-semibold text-stone-400 tracking-[0.2em] uppercase mb-6 block">Proceso Simple</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
            Tu proyecto en 4 pasos
          </h2>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 relative">
          {/* Connecting line for large screens */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="relative bg-white pt-4 group">
              <div className="w-32 h-32 md:w-36 md:h-36 mx-auto bg-stone-50 rounded-[2rem] flex items-center justify-center mb-10 border-2 border-stone-200 shadow-lg text-stone-800 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-500">
                <step.icon className="w-16 h-16 md:w-20 md:h-20 stroke-[1.2]" />
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-4">{step.title}</h3>
                <p className="text-base md:text-lg text-stone-500 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
