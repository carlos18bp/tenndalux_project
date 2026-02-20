'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const projectsData: Record<string, Project> = {
  'residencia-premium-envigado': {
    title: 'Residencia Premium Envigado',
    subtitle: 'Automatización completa de 350m² con integración smart home',
    category: 'Residencial',
    location: 'Envigado, Antioquia',
    year: '2026',
    duration: '4 semanas',
    client: 'Familia Gómez',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    challenge: 'Los clientes buscaban modernizar su residencia con soluciones de control solar que combinaran estética minimalista, máxima eficiencia energética y tecnología de automatización de última generación, todo integrado con su ecosistema Google Home existente.',
    solution: 'Diseñamos e implementamos un sistema integral de cortinas roller motorizadas con telas blackout y screen de alta calidad, automatización completa mediante control por voz, app móvil y sensores de luz ambiental, logrando una integración perfecta con su hogar inteligente.',
    
    features: [
      'Cortinas Roller motorizadas en todas las habitaciones',
      'Telas blackout premium para habitaciones',
      'Telas screen solar para áreas sociales',
      'Automatización con Google Home y Alexa',
      'Sensores de luz ambiental para control automático',
      'Programación de rutinas personalizadas',
      'Control remoto desde cualquier lugar',
      'App móvil iOS/Android dedicada',
    ],

    process: [
      {
        step: 'Consulta y Medición',
        description: 'Visita inicial para entender necesidades, medir espacios y evaluar infraestructura existente',
        duration: '1 día',
      },
      {
        step: 'Diseño y Propuesta',
        description: 'Creación de propuesta técnica con renders 3D, selección de materiales y presupuesto detallado',
        duration: '3 días',
      },
      {
        step: 'Fabricación',
        description: 'Producción a medida de cortinas con especificaciones exactas y control de calidad riguroso',
        duration: '2 semanas',
      },
      {
        step: 'Instalación',
        description: 'Montaje profesional de motores, cortinas y sistemas eléctricos con mínima invasión',
        duration: '3 días',
      },
      {
        step: 'Configuración Smart',
        description: 'Integración con ecosistema smart home, programación de rutinas y capacitación al cliente',
        duration: '2 días',
      },
    ],

    results: [
      { metric: '30%', description: 'Reducción en costos de climatización' },
      { metric: '100%', description: 'Automatización de todas las ventanas' },
      { metric: '15', description: 'Escenas programadas personalizadas' },
    ],

    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMDIwMjZ8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Sala principal con cortinas roller screen',
      },
      {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Vista nocturna con iluminación ambiental',
      },
      {
        image: 'https://images.unsplash.com/photo-1750271336580-f11df678e840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwcm9sbGVyJTIwYmxpbmRzfGVufDF8fHx8MTc3MTI5NzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Habitación principal con blackout total',
      },
      {
        image: 'https://images.unsplash.com/photo-1758974775331-c5400bbef625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbSUyMGN1cnRhaW5zfGVufDF8fHx8MTc3MTI5NzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Detalle de integración con arquitectura',
      },
    ],

    testimonial: {
      text: 'Superaron nuestras expectativas. La automatización es increíble, el diseño quedó perfecto y el equipo fue profesional en todo momento. Ahora nuestro hogar es más eficiente y cómodo.',
      author: 'Carlos Gómez',
      role: 'Propietario',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=200',
    },

    video: {
      src: '/videos/optimized/IMG_5435.webm',
      title: 'Video del proyecto: Automatización en acción',
      duration: '0:15',
    },
  },
};

interface Project {
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  duration: string;
  client: string;
  heroImage: string;
  challenge: string;
  solution: string;
  features: string[];
  process: Array<{ step: string; description: string; duration: string }>;
  results: Array<{ metric: string; description: string }>;
  gallery: Array<{ image: string; caption: string }>;
  testimonial: { text: string; author: string; role: string; avatar: string };
  video: { src: string; title: string; duration: string };
}

const relatedProjects = [
  {
    slug: 'oficinas-corporativas-medellin',
    title: 'Oficinas Corporativas Medellín',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzdW5saWdodCUyMHdpbmRvd3N8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Corporativo',
    location: 'El Poblado, Medellín',
  },
  {
    slug: 'penthouse-llanogrande',
    title: 'Penthouse Llanogrande',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Residencial',
    location: 'Llanogrande, Rionegro',
  },
  {
    slug: 'spa-wellness-santa-fe',
    title: 'Spa & Wellness Santa Fe',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMGludGVyaW9yfGVufDF8fHx8MTczOTkyNDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Comercial',
    location: 'Santa Fe, Medellín',
  },
];

export default function PortafolioProject() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-stone-800 mb-4">
            Proyecto no encontrado
          </h1>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105 bg-stone-900 text-stone-50"
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
            Volver al Portafolio
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Header />

      {/* Back Button */}
      <div className="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
            Volver al Portafolio
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <article>
        <header className="px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-stone-100 text-stone-900 font-semibold">
                  {project.category}
                </span>
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-500">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar style={{ width: '16px', height: '16px' }} />
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 sm:mb-8 tracking-tight leading-[1.05] text-stone-900">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-stone-600 leading-relaxed">
                {project.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-stone-200">
                <div className="flex items-center gap-6 sm:gap-8">
                  <div>
                    <p className="text-xs mb-1 text-stone-500 font-medium">DURACIÓN</p>
                    <p className="text-sm sm:text-base font-semibold text-stone-900">
                      {project.duration}
                    </p>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-stone-200" />
                  <div>
                    <p className="text-xs mb-1 text-stone-500 font-medium">CLIENTE</p>
                    <p className="text-sm sm:text-base font-semibold text-stone-900">
                      {project.client}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 border-2 border-stone-200 text-stone-900"
                >
                  <Share2 style={{ width: '18px', height: '18px' }} />
                  <span className="text-sm font-medium">Compartir</span>
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 sm:px-6 mb-10 sm:mb-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Project Content */}
        <div className="px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Challenge */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-stone-900">
                  El Desafío
                </h2>
                <p className="text-xl text-stone-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-stone-900">
                  Nuestra Solución
                </h2>
                <p className="text-xl mb-8 text-stone-700 leading-relaxed">
                  {project.solution}
                </p>

                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-stone-100">
                  <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 text-stone-900">
                    Características Implementadas
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                        <span className="text-base text-stone-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Process */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-stone-900">
                  Proceso de Trabajo
                </h2>
                <div className="space-y-4">
                  {project.process.map((item, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-stone-100">
                          <span className="text-lg font-bold text-stone-900">
                            {index + 1}
                          </span>
                        </div>
                        {index < project.process.length - 1 && (
                          <div className="w-0.5 h-full mt-2 bg-stone-200" />
                        )}
                      </div>
                      <div className="pb-8 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-semibold text-stone-900">
                            {item.step}
                          </h4>
                          <span className="text-sm px-3 py-1 rounded-full bg-stone-100 text-stone-500 font-medium">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-base text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-stone-900">
                  Resultados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {project.results.map((result, index) => (
                    <div key={index} className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-center">
                      <p className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-3 text-stone-50">
                        {result.metric}
                      </p>
                      <p className="text-base text-stone-300 leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              {project.video && (
                <div className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-stone-900">
                    Video del Proyecto
                  </h2>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <video
                      src={project.video.src}
                      controls
                      className="w-full h-full object-cover"
                      poster={project.heroImage}
                    />
                  </div>
                  <p className="text-sm text-stone-500 mt-4">{project.video.title}</p>
                </div>
              )}

              {/* Gallery */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-stone-900">
                  Galería del Proyecto
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {project.gallery.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.caption}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {item.caption}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="mb-16">
                  <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-100">
                    <div className="mb-4 sm:mb-6">
                      <svg width="48" height="36" viewBox="0 0 32 24" fill="none">
                        <path d="M0 24H8L14 0H6L0 24ZM18 24H26L32 0H24L18 24Z" fill="#E7E5E4" />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-2xl mb-6 sm:mb-8 text-stone-900 leading-relaxed font-medium">
                      {project.testimonial.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        width={64}
                        height={64}
                        className="rounded-full object-cover w-16 h-16"
                      />
                      <div>
                        <p className="text-base font-semibold mb-1 text-stone-900">
                          {project.testimonial.author}
                        </p>
                        <p className="text-sm text-stone-500">
                          {project.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-100 text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-stone-900">
                  ¿Te Inspiró Este Proyecto?
                </h3>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 text-stone-600 leading-relaxed">
                  Hagamos realidad tu proyecto. Agenda una consultoría gratuita sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href={`https://wa.me/573238122373?text=Hola,%20vi%20el%20proyecto%20${encodeURIComponent(project.title)}%20y%20me%20interesa%20algo%20similar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 sm:px-10 py-4 sm:py-5 rounded-full inline-flex items-center justify-center gap-3 transition-all hover:scale-105 bg-stone-900 text-stone-50"
                  >
                    <span className="text-base sm:text-lg font-semibold">Agendar Consultoría</span>
                    <ArrowRight style={{ width: '24px', height: '24px' }} />
                  </a>
                  <a
                    href={`https://wa.me/573238122373?text=Hola,%20vi%20el%20proyecto%20${encodeURIComponent(project.title)}%20y%20tengo%20preguntas`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 sm:px-10 py-4 sm:py-5 rounded-full inline-flex items-center justify-center gap-3 transition-all hover:scale-105 border-2 border-stone-900 text-stone-900"
                  >
                    <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 448 512" fill="currentColor">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
                    </svg>
                    <span className="text-base sm:text-lg font-medium">WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Projects */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-center text-stone-900">
            Proyectos Relacionados
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/portafolio/${relatedProject.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs backdrop-blur-md bg-white/90 text-stone-900 font-semibold">
                          {relatedProject.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-stone-600 transition-colors leading-tight">
                        {relatedProject.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        <MapPin style={{ width: '16px', height: '16px' }} />
                        <span>{relatedProject.location}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
