'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function FabricSelection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apple-style blur reveal
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.3, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 70, filter: 'blur(15px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.3, delay: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Subtle parallax on image
      gsap.to(imageRef.current, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative aspect-square w-full max-w-[580px] mx-auto">
              <div className="absolute inset-0 bg-stone-200 rounded-[48px] transform rotate-3 scale-95 opacity-50"></div>
              <Image
                src="/home/visita-decorador.webp"
                alt="Diseñador Tenndalux asesorando en proyecto"
                fill
                className="object-cover rounded-[48px] shadow-2xl relative z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.05]">
              Diseñamos contigo.<br />Transformamos tu espacio.
            </h2>
            
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <p className="text-xl md:text-2xl text-stone-500 leading-relaxed font-light">
                Nuestros diseñadores de interiores llevan la experiencia Tenndalux hasta tu proyecto. Te asesoran personalmente en la elección de tejidos, colores, sistemas y toman las medidas con precisión para lograr un resultado completamente a la medida.
              </p>
              <p className="text-xl md:text-2xl text-stone-500 leading-relaxed font-light">
                Descubre además cómo funciona nuestra tecnología inteligente mediante una demostración en vivo, directamente en tu hogar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20agendar%20una%20asesoría%20de%20diseño"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-stone-900 text-stone-50 px-8 sm:px-14 py-5 sm:py-6 rounded-full font-bold text-base sm:text-xl hover:bg-stone-800 transition-all duration-300 shadow-xl shadow-stone-900/10 hover:shadow-stone-900/30 transform hover:-translate-y-1"
              >
                <span>Agenda tu Asesoría de Diseño</span>
                <ArrowRightIcon className="w-7 h-7" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 text-lg text-stone-600 font-medium">
              {[
                'Diseñador en tu proyecto',
                'Soluciones a la medida',
                'Tecnología en vivo',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-full">
                    <svg className="w-7 h-7 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
