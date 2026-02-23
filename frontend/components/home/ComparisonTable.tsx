'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(tableRef.current, { opacity: 0, y: 60, scale: 0.98 });

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

  const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-7 h-7'}>
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
    </svg>
  );

  const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-7 h-7'}>
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-36 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
        <div ref={headerRef} className="text-center mb-12 md:mb-28 space-y-4 md:space-y-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
            ¿Por qué elegir Tenndalux?
          </h2>
          <p className="text-lg md:text-2xl text-stone-500 max-w-3xl mx-auto font-light">
            La diferencia entre cubrir una ventana y diseñar un ambiente.
          </p>
        </div>

        {/* Desktop Table (md+) */}
        <div ref={tableRef}>
          <div className="hidden md:block overflow-hidden rounded-[2rem] border-2 border-stone-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-3 bg-stone-50 px-10 py-10 border-b border-stone-200">
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <span className="text-base font-medium text-stone-500">Estándar</span>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-300 mt-2">Otras Marcas</h3>
              </div>
              <div className="col-span-1 text-center relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-50 text-sm font-semibold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                  Recomendado
                </div>
                <span className="text-base font-medium text-stone-700">Premium</span>
                <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mt-2">Tenndalux</h3>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 items-center px-10 py-10 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-stone-50/30'
                  }`}
                >
                  <div className="col-span-1 pr-8">
                    <h4 className="text-xl font-bold text-stone-900">{feature.name}</h4>
                    <p className="mt-2 text-base text-stone-500 leading-relaxed">{feature.label}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {feature.standard ? (
                      <CheckIcon className="h-9 w-9 text-stone-900" />
                    ) : (
                      <XIcon className="h-9 w-9 text-stone-300" />
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <CheckIcon className="h-9 w-9 text-stone-900" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-14 bg-stone-50/50 text-center border-t border-stone-100">
              <p className="text-stone-600 mb-8 font-medium text-2xl">Tu hogar merece una solución que refleje quién eres.</p>
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20una%20cotización%20para%20mi%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-16 py-6 border border-transparent text-xl font-bold rounded-full text-white bg-stone-900 hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
                </svg>
                Solicitar Cotización
              </a>
            </div>
          </div>

          {/* Mobile Cards (< md) */}
          <div className="md:hidden space-y-4">
            {/* Header badge */}
            <div className="flex items-center justify-between mb-6 mt-4 pt-8 relative">
              <div className="text-center flex-1">
                <span className="text-xs font-medium text-stone-400 block">Estándar</span>
                <span className="text-sm font-bold text-stone-300">Otras Marcas</span>
              </div>
              <div className="text-center flex-1">
                <div className="inline-block bg-stone-900 text-stone-50 text-[10px] font-semibold px-3 py-1 rounded-full mb-2">
                  Recomendado
                </div>
                <span className="text-xs font-medium text-stone-600 block">Premium</span>
                <span className="text-base font-bold text-stone-900">Tenndalux</span>
              </div>
            </div>

            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
              >
                <h4 className="text-base font-bold text-stone-900 mb-1">{feature.name}</h4>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{feature.label}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-medium">Otras</span>
                    {feature.standard ? (
                      <CheckIcon className="h-5 w-5 text-stone-900" />
                    ) : (
                      <XIcon className="h-5 w-5 text-stone-300" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-700 font-semibold">Tenndalux</span>
                    <CheckIcon className="h-5 w-5 text-stone-900" />
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 text-center">
              <p className="text-stone-600 mb-5 font-medium text-base">Tu hogar merece una solución que refleje quién eres.</p>
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20una%20cotización%20para%20mi%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 text-base font-bold rounded-full text-white bg-stone-900 hover:bg-stone-800 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor">
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
