'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
    src: '/home/gallery/cortina-ondessence.png',
    alt: 'Cortina Ondessence ondas de lujo',
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
    src: '/home/gallery/cortina-classic.png',
    alt: 'Cortina Classic elegante',
    className: 'row-span-1'
  },
  {
    type: 'image',
    src: '/home/gallery/enrollable-screen.png',
    alt: 'Enrollable screen premium',
    className: 'row-span-2'
  },
  {
    type: 'image',
    src: '/home/gallery/ejemplo-uso-general.png',
    alt: 'Ambiente decorado con cortinas de lujo',
    className: 'row-span-2'
  },
  {
    type: 'image',
    src: '/home/gallery/cortina-celular-blackout.png',
    alt: 'Cortina celular tejido blackout',
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
      // Apple-style blur reveal for header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60, filter: 'blur(15px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }
        }
      );

      if (gridRef.current) {
        gsap.fromTo(gridRef.current,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%' }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const GalleryCard = ({ item }: { item: GalleryItem }) => (
    <div
      className={`relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl group ${item.type === 'video' ? 'cursor-pointer' : ''}`}
      onClick={() => item.type === 'video' && item.videoSrc && setSelectedVideo(item.videoSrc)}
    >
      {item.type === 'image' ? (
        <>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </>
      ) : (
        <div className="relative w-full h-full">
          <video
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={item.src} type="video/webm" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <PlayIcon className="w-7 h-7 md:w-10 md:h-10 text-stone-900 ml-0.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-36 bg-stone-50">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div ref={headerRef} className="text-center mb-10 md:mb-28 space-y-4 md:space-y-6">
            <span className="text-sm sm:text-base font-semibold text-stone-400 tracking-[0.2em] uppercase">Proyectos Reales</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
              Espacios que inspiran
            </h2>
            <p className="text-lg md:text-2xl text-stone-600 max-w-3xl mx-auto font-light">
              Proyectos residenciales, comerciales y hoteleros transformados con diseño, tecnología y precisión.
            </p>
          </div>

          <div ref={gridRef}>
            {/* Mobile: Swiper carousel */}
            <div className="sm:hidden">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={12}
                slidesPerView={1.15}
                centeredSlides={true}
                loop={false}
                rewind={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className="gallery-swiper !pb-10"
              >
                {galleryItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative aspect-[3/4]">
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <GalleryCard item={item} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 auto-rows-[250px] sm:auto-rows-[350px] grid-flow-dense">
              {galleryItems.map((item, index) => (
                <div key={index} className={`relative ${item.className}`}>
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo || ''}
      />
    </>
  );
}
