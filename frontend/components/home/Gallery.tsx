'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';
import VideoModal from '@/components/ui/VideoModal';

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  className: string;
  videoSrc?: string;
};

const galleryItems: GalleryItem[] = [
  {
    type: 'image',
    src: '/home/imgi_104_width_800.webp',
    alt: 'Cortinas modernas en sala de estar',
    className: 'row-span-2'
  },
  {
    type: 'video',
    src: '/videos/optimized/c56462c7c6fd441d8cebe16d51ee5336.webm',
    videoSrc: '/videos/optimized/c56462c7c6fd441d8cebe16d51ee5336.webm',
    alt: 'Instalación de cortinas motorizadas',
    className: 'row-span-2'
  },
  {
    type: 'image',
    src: '/home/imgi_106_width_800.webp',
    alt: 'Ambiente minimalista con persianas',
    className: 'row-span-1'
  },
  {
    type: 'image',
    src: '/home/imgi_98_width_800.webp',
    alt: 'Control de luz en dormitorio',
    className: 'row-span-2'
  },
  {
    type: 'video',
    src: '/videos/optimized/copy_2F556132-9535-4303-88F9-07ACE5933B06.webm',
    videoSrc: '/videos/optimized/copy_2F556132-9535-4303-88F9-07ACE5933B06.webm',
    alt: 'Persianas roller en acción',
    className: 'row-span-2'
  },
  {
    type: 'image',
    src: '/home/imgi_86_0022.webp',
    alt: 'Persianas motorizadas',
    className: 'row-span-1'
  }
];

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(gridRef.current?.children || [], { opacity: 0, scale: 0.9 });

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

      gsap.to(gridRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-36 md:py-44 bg-stone-50">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
          <div ref={headerRef} className="text-center mb-20 md:mb-28 space-y-6">
            <span className="text-base font-semibold text-stone-400 tracking-[0.2em] uppercase">Inspiración</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
              Espacios que inspiran
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto font-light">
              Descubre cómo nuestras soluciones transforman diferentes ambientes y estilos de vida.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px] grid-flow-dense">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-3xl group ${item.className} ${item.type === 'video' ? 'cursor-pointer' : ''}`}
                onClick={() => item.type === 'video' && item.videoSrc && setSelectedVideo(item.videoSrc)}
              >
                {item.type === 'image' ? (
                  <>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </>
                ) : (
                  <div className="relative w-full h-full">
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
                      <source src={item.src} type="video/webm" />
                    </video>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-stone-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo || ''}
      />
    </>
  );
}
