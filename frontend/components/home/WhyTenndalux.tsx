'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlayIcon } from '@heroicons/react/24/solid';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import VideoModal from '@/components/ui/VideoModal';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: SparklesIcon,
    title: 'Estatus Silencioso',
    description: 'Tu hogar refleja quién eres. Diseño que impresiona sin gritar.'
  },
  {
    icon: CpuChipIcon,
    title: 'Tecnología Sin Cables',
    description: 'Motorización invisible. Control desde tu celular, Alexa o Google.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Respaldo y Garantía',
    description: '5 años de garantía total. Soporte técnico cuando lo necesites.'
  },
  {
    icon: UserGroupIcon,
    title: 'Asesoría Experta',
    description: 'No improvisamos. Te guiamos en cada decisión de diseño.'
  },
];

const VIDEO_SRC = '/videos/optimized/copy_429DCD28-111F-43D8-BC3D-9277828BFA0D.webm';

export default function WhyTenndalux() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(videoRef.current, { opacity: 0, x: -80 });
      gsap.set(contentRef.current, { opacity: 0, x: 80 });

      gsap.to(videoRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.to(contentRef.current, {
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
    <>
      <section ref={sectionRef} className="pt-36 md:pt-48 pb-48 md:pb-64 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Video */}
            <div ref={videoRef} className="relative">
              <div 
                className="relative aspect-[9/16] max-w-[380px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={VIDEO_SRC} type="video/webm" />
                </video>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-10 h-10 text-stone-900 ml-1" />
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-stone-700 to-transparent rounded-full blur-3xl opacity-50 -z-10" />
            </div>

            {/* Right: Content */}
            <div ref={contentRef} className="space-y-16">
              <div className="space-y-8">
                <span className="text-base font-semibold text-stone-400 tracking-[0.25em] uppercase">
                  No Vendemos Cortinas
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  Diseñamos el hogar que<br />
                  <span className="text-stone-400">siempre imaginaste</span>
                </h2>
                <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed max-w-xl">
                  Para personas que estrenan apartamento, remodelan o construyen. 
                  Que investigan, comparan y no quieren soluciones corrientes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-stone-800 flex items-center justify-center">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-stone-400 text-base leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20una%20asesoría%20para%20mi%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-white text-stone-900 px-20 py-12 rounded-full font-bold text-lg hover:bg-stone-100 transition-all duration-300 shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
                </svg>
                Solicitar Asesoría Gratis
              </a>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc={VIDEO_SRC}
        title="Cortinas motorizadas Tenndalux"
      />
    </>
  );
}
