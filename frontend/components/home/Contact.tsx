'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(leftRef.current, { opacity: 0, x: -60 });
      gsap.set(rightRef.current, { opacity: 0, x: 60 });

      // Animate on scroll
      gsap.to(leftRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.to(rightRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert('¡Gracias por tu interés! Un asesor te contactará pronto.');
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contacto" className="py-36 md:py-44 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr_580px] gap-20 lg:gap-28 items-start">
          <div ref={leftRef} className="space-y-14 pt-4">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Hablemos de<br />tu proyecto
              </h2>
              <p className="text-stone-400 text-xl md:text-2xl leading-relaxed font-light max-w-[520px]">
                Nuestros expertos están listos para diseñar la solución perfecta para tus espacios.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="p-5 bg-stone-800/60 rounded-2xl border border-stone-700">
                  <PhoneIcon className="w-10 h-10 text-stone-200 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-2xl">Llámanos</h3>
                  <p className="text-stone-400 mt-2 text-xl font-light">+57 (300) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-5 bg-stone-800/60 rounded-2xl border border-stone-700">
                  <EnvelopeIcon className="w-10 h-10 text-stone-200 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-2xl">Escríbenos</h3>
                  <p className="text-stone-400 mt-2 text-xl font-light">contacto@tenndalux.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-5 bg-stone-800/60 rounded-2xl border border-stone-700">
                  <MapPinIcon className="w-10 h-10 text-stone-200 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-2xl">Showroom</h3>
                  <p className="text-stone-400 mt-2 text-xl font-light">Calle 123 # 45-67, Bogotá</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightRef} className="bg-white/95 backdrop-blur rounded-[2rem] p-10 sm:p-12 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.25)] border border-white/20">
            <div className="space-y-4 mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Solicitar Asesoría</h3>
              <p className="text-stone-500 text-lg leading-relaxed">Completa el formulario y te contactaremos.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-900 focus:bg-white focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all placeholder:text-stone-400 text-base"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium text-stone-700">Apellido</label>
                  <input
                    type="text"
                    id="lastname"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-900 focus:bg-white focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all placeholder:text-stone-400 text-base"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-stone-700">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-900 focus:bg-white focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all placeholder:text-stone-400 text-base"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-stone-700">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-900 focus:bg-white focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all placeholder:text-stone-400 text-base"
                  placeholder="+57 (300) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium text-stone-700">Me interesa</label>
                <div className="relative">
                  <select
                    id="interest"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border border-stone-200 bg-stone-50/80 text-stone-900 focus:bg-white focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all appearance-none text-base cursor-pointer"
                  >
                    <option value="cortinas">Cortinas Modernas</option>
                    <option value="persianas">Persianas Enrollables</option>
                    <option value="automatizacion">Automatización</option>
                    <option value="toldos">Toldos Exteriores</option>
                    <option value="otro">Otro</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 text-white font-semibold py-4 rounded-full hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl mt-2 disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>

              <p className="text-xs text-stone-400 text-center mt-4 font-light">
                Al enviar aceptas nuestra política de privacidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
