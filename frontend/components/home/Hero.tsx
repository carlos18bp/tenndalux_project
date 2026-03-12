'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.2,
      });

      // Apple-style blur reveal: heading
      tl.fromTo(headingRef.current,
        { y: 100, opacity: 0, filter: 'blur(20px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4 }
      )
      // Subtitle fade blur
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
        '-=0.9'
      )
      // CTA buttons
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      // Stats
      .fromTo(statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      // Video with scale + blur
      .fromTo(imageRef.current,
        { scale: 0.9, opacity: 0, filter: 'blur(15px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
        '-=1.0'
      )
      // Floating card
      .fromTo(cardRef.current,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        '-=0.4'
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-stone-50 flex items-center pt-28 sm:pt-40 pb-20 sm:pb-32 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Left: Text Content */}
          <div className="space-y-14">
            <div className="space-y-10">
              <h1
                ref={headingRef}
                className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-bold text-stone-900 leading-[1.02] tracking-tight will-change-transform"
                style={{ opacity: 0 }}
              >
                Tu casa no solo<br />se estrena. Se diseña.
              </h1>
              <p
                ref={subtitleRef}
                className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-[560px] font-light will-change-transform"
                style={{ opacity: 0 }}
              >
                Cortinas, automatización y soluciones que combinan diseño, tecnología y precisión para transformar tus espacios.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 pt-6" style={{ opacity: 0 }}>
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20agendar%20una%20asesoría%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-stone-900 text-stone-50 px-8 sm:px-14 py-5 sm:py-6 rounded-full font-bold text-base sm:text-xl hover:bg-stone-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <svg className="w-7 h-7" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
                </svg>
                <span>Agenda asesoría sin costo</span>
              </a>

              <Link
                href="#proyectos"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-stone-800 px-8 sm:px-14 py-5 sm:py-6 rounded-full font-bold text-base sm:text-xl border-2 border-stone-300 hover:bg-stone-100 transition-all duration-300"
              >
                <span>Ver proyectos reales</span>
              </Link>
            </div>

            <div ref={statsRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-14 pt-10" style={{ opacity: 0 }}>
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold text-stone-900 leading-none">500+</div>
                <div className="text-base text-stone-500 font-semibold uppercase tracking-wider">
                  Proyectos completados
                </div>
              </div>
              <div className="w-16 sm:w-px h-px sm:h-16 bg-stone-200"></div>
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold text-stone-900 leading-none">15+</div>
                <div className="text-base text-stone-500 font-semibold uppercase tracking-wider">
                  Años de experiencia
                </div>
              </div>
            </div>
          </div>

          {/* Right: Video */}
          <div ref={imageRef} className="relative flex justify-end lg:pr-8 will-change-transform" style={{ opacity: 0 }}>
            <div className="relative aspect-[3.5/5] w-full max-w-[520px] rounded-[3rem] overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/optimized/0728.webm" type="video/webm" />
                <source src="/videos/0728.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Floating Card */}
            <div
              ref={cardRef}
              className="absolute bottom-12 -left-8 lg:-left-20 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-stone-100/80 max-w-[300px] hidden md:block will-change-transform"
              style={{ opacity: 0 }}
            >
              <div className="space-y-3">
                <div className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Diseño Premium
                </div>
                <p className="text-lg text-stone-800 font-medium leading-relaxed">
                  Tejidos europeos certificados y sistemas de automatización de última generación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
