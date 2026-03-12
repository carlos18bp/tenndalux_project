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
      // Apple-style blur reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 70, filter: 'blur(15px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.3, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.3, delay: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Subtle parallax on image
      gsap.to(imageRef.current, {
        y: -40,
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
    <section ref={sectionRef} className="py-20 md:py-36 bg-stone-50 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center">
          <div ref={contentRef} className="space-y-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]">
              Diseño que se ve.<br />
              <span className="text-stone-500">Tecnología que no se nota.</span>
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed">
              En Tenndalux unimos estética, innovación y funcionalidad para crear ambientes inteligentes con estilo y respaldo real.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Diseño personalizado para cada espacio',
                'Tecnología sin cables visibles',
                'Sistemas ultra silenciosos',
                'Garantía y soporte postventa confiable',
              ].map((pillar, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-stone-900" />
                  <span className="text-lg md:text-xl text-stone-700 font-medium">{pillar}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <a 
                href="#contacto" 
                className="group inline-flex items-center gap-3 text-xl text-stone-900 font-semibold hover:text-stone-600 transition-colors"
              >
                Conoce más sobre nuestra empresa
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
