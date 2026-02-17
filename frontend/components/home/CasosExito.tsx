'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoModal from '@/components/ui/VideoModal';

gsap.registerPlugin(ScrollTrigger);

interface VideoCase {
  id: string;
  title: string;
  description: string;
  location: string;
  videoSrc: string;
  thumbnailTime?: number;
}

const videoCases: VideoCase[] = [
  {
    id: '1',
    title: 'Cortinas Motorizadas',
    description: 'Instalación completa de sistema motorizado con control inteligente para hogar moderno.',
    location: 'Bogotá, Colombia',
    videoSrc: '/videos/optimized/c56462c7c6fd441d8cebe16d51ee5336.webm',
  },
  {
    id: '2',
    title: 'Persianas Roller',
    description: 'Proyecto residencial con persianas roller blackout para máximo control de luz.',
    location: 'Chía, Colombia',
    videoSrc: '/videos/optimized/copy_2F556132-9535-4303-88F9-07ACE5933B06.webm',
  },
];

export default function CasosExito() {
  const [selectedVideo, setSelectedVideo] = useState<VideoCase | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(gridRef.current?.children || [], 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="proyectos" className="py-36 md:py-44 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
          <div ref={headerRef} className="text-center mb-20 md:mb-28 space-y-6">
            <span className="text-base font-semibold text-stone-400 tracking-[0.2em] uppercase">
              Proyectos Realizados
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
              Casos de Éxito
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto font-light">
              Mira cómo hemos transformado espacios con nuestras soluciones de control solar.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {videoCases.map((videoCase) => (
              <div
                key={videoCase.id}
                className="group relative bg-stone-100 rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(videoCase)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video">
                  <video
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  >
                    <source src={videoCase.videoSrc} type="video/webm" />
                  </video>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <PlayIcon className="w-10 h-10 md:w-12 md:h-12 text-stone-900 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{videoCase.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">
                    {videoCase.title}
                  </h3>
                  <p className="text-lg text-stone-600 font-light">
                    {videoCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg text-stone-500 mb-6">
              Más proyectos disponibles pronto
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo?.videoSrc || ''}
        title={selectedVideo?.title}
      />
    </>
  );
}
