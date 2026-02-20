'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

gsap.registerPlugin(ScrollTrigger);

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(tableRef.current, { opacity: 0, y: 60, scale: 0.98 });

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

      gsap.to(tableRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      name: 'Tecnología Sin Cables',
      tenndalux: true,
      standard: false,
      label: 'Motorización invisible integrada con Alexa, Google y Apple'
    },
    {
      name: 'Asesoría Experta en Diseño',
      tenndalux: true,
      standard: false,
      label: 'Te guiamos para que tu hogar se vea terminado y bien pensado'
    },
    {
      name: 'Instalación por Técnicos Propios',
      tenndalux: true,
      standard: false,
      label: 'Nada de terceros. Personal certificado y uniformado'
    },
    {
      name: 'Garantía Extendida 5 Años',
      tenndalux: true,
      standard: false,
      label: 'Respaldo total. Soporte post-venta cuando lo necesites'
    },
    {
      name: 'Acabados Premium',
      tenndalux: true,
      standard: true,
      label: 'Telas europeas certificadas. Protección UV y retardo de fuego'
    },
    {
      name: 'Visita Técnica Sin Costo',
      tenndalux: true,
      standard: false,
      label: 'Medición profesional y asesoría en tu hogar'
    }
  ];

  return (
    <section ref={sectionRef} className="pt-48 md:pt-64 pb-36 md:pb-48 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={headerRef} className="text-center mb-20 md:mb-28 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
            ¿Por qué elegir Tenndalux?
          </h2>
          <p className="text-xl md:text-2xl text-stone-500 max-w-3xl mx-auto font-light">
            La diferencia entre cubrir una ventana y diseñar un ambiente.
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto">
          <div className="min-w-[600px] overflow-hidden rounded-2xl sm:rounded-[2rem] border-2 border-stone-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-3 bg-stone-50 px-4 sm:px-10 py-6 sm:py-10 border-b border-stone-200">
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <span className="text-xs sm:text-base font-medium text-stone-500">Estándar</span>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-stone-300 mt-1 sm:mt-2">Otras Marcas</h3>
              </div>
              <div className="col-span-1 text-center relative">
                <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-50 text-[10px] sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg whitespace-nowrap">
                  Recomendado
                </div>
                <span className="text-xs sm:text-base font-medium text-stone-700">Premium</span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1 sm:mt-2">Tenndalux</h3>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 items-center px-4 sm:px-10 py-6 sm:py-10 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-stone-50/30'
                  }`}
                >
                  <div className="col-span-1 pr-4 sm:pr-8">
                    <h4 className="text-sm sm:text-xl font-bold text-stone-900">{feature.name}</h4>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-base text-stone-500 leading-relaxed">{feature.label}</p>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    {feature.standard ? (
                      <CheckIcon className="h-9 w-9 text-stone-900" />
                    ) : (
                      <XMarkIcon className="h-9 w-9 text-stone-300" />
                    )}
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <CheckIcon className="h-9 w-9 text-stone-900" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-14 bg-stone-50/50 text-center border-t border-stone-100">
              <p className="text-stone-600 mb-6 sm:mb-8 font-medium text-lg sm:text-2xl">Tu hogar merece una solución que refleje quién eres.</p>
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20una%20cotización%20para%20mi%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-16 py-5 sm:py-6 border border-transparent text-base sm:text-xl font-bold rounded-full text-white bg-stone-900 hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
                </svg>
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
