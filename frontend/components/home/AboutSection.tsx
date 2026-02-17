'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(contentRef.current, { opacity: 0, x: -80 });
      gsap.set(imageRef.current, { opacity: 0, x: 80 });

      // Animate on scroll
      gsap.to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-36 md:py-48 bg-stone-50 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          <div ref={contentRef} className="space-y-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]">
              Excelencia en cada detalle,<br />
              <span className="text-stone-500">pasión por el diseño.</span>
            </h2>
            <div className="space-y-8 text-xl md:text-2xl text-stone-600 font-light leading-relaxed">
              <p>
                En Tenndalux, no solo vendemos cortinas; creamos atmósferas. Con más de 15 años de trayectoria, 
                hemos perfeccionado el arte de combinar funcionalidad técnica con estética de vanguardia.
              </p>
              <p>
                Trabajamos con los mejores fabricantes de tejidos de Europa y sistemas de motorización de última generación 
                para garantizar que cada instalación sea una inversión duradera en confort y estilo.
              </p>
            </div>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-5xl md:text-6xl font-bold text-stone-900">+1500</span>
                <span className="text-base text-stone-500 font-semibold uppercase tracking-wider">Proyectos Ejecutados</span>
              </div>
              <div className="w-px bg-stone-200 hidden sm:block"></div>
              <div className="flex flex-col gap-2">
                <span className="text-5xl md:text-6xl font-bold text-stone-900">100%</span>
                <span className="text-base text-stone-500 font-semibold uppercase tracking-wider">Satisfacción Garantizada</span>
              </div>
            </div>

            <div className="pt-8">
              <a 
                href="#catalogo" 
                className="group inline-flex items-center gap-3 text-xl text-stone-900 font-semibold hover:text-stone-600 transition-colors"
              >
                Conoce nuestra historia completa
                <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-stone-200 relative shadow-2xl">
              <Image
                src="/home/imgi_106_width_800.webp"
                alt="Interiorismo Tenndalux"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-stone-900 rounded-full -z-10 blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
