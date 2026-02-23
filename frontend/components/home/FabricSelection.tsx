'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function FabricSelection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(imageRef.current, { opacity: 0, y: 60 });
      gsap.set(contentRef.current, { opacity: 0, y: 60 });

      // Animate on scroll
      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
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
    <section ref={sectionRef} className="py-20 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative aspect-square w-full max-w-[580px] mx-auto">
              <div className="absolute inset-0 bg-stone-200 rounded-[48px] transform rotate-3 scale-95 opacity-50"></div>
              <Image
                src="/home/seleccionTelas.webp"
                alt="Muestrario de telas premium Tenndalux"
                fill
                className="object-cover rounded-[48px] shadow-2xl relative z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-3xl shadow-2xl border border-stone-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-lg font-bold text-stone-800">Envío Gratis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.05]">
              Siente la calidad<br />antes de comprar
            </h2>
            
            <p className="text-xl md:text-2xl text-stone-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Sabemos que la textura y el color son fundamentales. Por eso te enviamos muestras de nuestras telas premium directamente a tu puerta, sin costo alguno.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center gap-3 bg-stone-900 text-stone-50 px-8 sm:px-14 py-5 sm:py-6 rounded-full font-bold text-base sm:text-xl hover:bg-stone-800 transition-all duration-300 shadow-xl shadow-stone-900/10 hover:shadow-stone-900/30 transform hover:-translate-y-1"
              >
                <span>Solicitar Muestras Gratis</span>
                <ArrowRightIcon className="w-7 h-7" />
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-10 pt-6 text-lg text-stone-600 font-medium">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 rounded-full">
                    <svg className="w-7 h-7 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 rounded-full">
                    <svg className="w-7 h-7 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span>Asesoría incluida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
