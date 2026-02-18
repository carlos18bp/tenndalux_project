'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, MessageCircle, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock blog data - In production, fetch based on slug
const blogPosts: Record<string, BlogPost> = {
  'cortinas-inteligentes-guia-completa': {
    title: 'Cortinas Inteligentes: La Guía Completa para Automatizar Tu Hogar',
    excerpt: 'Descubre cómo la automatización de cortinas puede transformar tu espacio y mejorar tu calidad de vida con tecnología de vanguardia.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9uJTIwY3VydGFpbnN8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tecnología',
    date: '2026-02-15',
    readTime: '8 min',
    author: {
      name: 'María González',
      role: 'Especialista en Automatización',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTkyNDAwMHww&ixlib=rb-4.1.0&q=80&w=200',
    },
    content: {
      intro: 'La automatización del hogar ha dejado de ser una fantasía futurista para convertirse en una realidad accesible. Las cortinas inteligentes representan uno de los primeros pasos más impactantes hacia un hogar verdaderamente conectado.',
      sections: [
        {
          heading: '¿Qué son las Cortinas Inteligentes?',
          content: 'Las cortinas inteligentes son sistemas motorizados que se pueden controlar remotamente a través de aplicaciones móviles, comandos de voz o programación automática. Integran tecnología de motores silenciosos, sensores de luz y conectividad WiFi o Bluetooth para ofrecer control total sobre la iluminación natural de tu hogar.',
        },
        {
          heading: 'Beneficios Clave de la Automatización',
          list: [
            'Control desde cualquier lugar: Abre o cierra tus cortinas estés donde estés',
            'Programación inteligente: Rutinas personalizadas según tu horario',
            'Ahorro energético: Hasta 30% de reducción en costos de climatización',
            'Seguridad mejorada: Simula presencia cuando estás de viaje',
            'Integración total: Compatible con Google Home, Alexa y Apple HomeKit',
            'Protección de muebles: Evita la decoloración por exposición solar',
          ],
        },
        {
          heading: 'Tipos de Sistemas de Automatización',
          content: 'Existen diferentes niveles de automatización según tus necesidades y presupuesto:',
          subsections: [
            {
              title: 'Motorización Básica',
              description: 'Control por control remoto o switch de pared. Ideal para comenzar con la automatización sin inversión alta.',
            },
            {
              title: 'Smart Home Intermedio',
              description: 'Conectividad WiFi/Bluetooth con app móvil. Incluye programación de horarios y control por voz.',
            },
            {
              title: 'Sistema Premium Integrado',
              description: 'Automatización completa con sensores de luz, temperatura y integración con sistemas domóticos avanzados.',
            },
          ],
        },
        {
          heading: 'Cómo Elegir el Sistema Adecuado',
          content: 'Al seleccionar tu sistema de cortinas inteligentes, considera estos factores:',
          list: [
            'Tipo de cortina actual o deseada (roller, panel, romana, etc.)',
            'Tamaño y peso de las cortinas',
            'Ecosistema smart home existente (Google, Alexa, Apple)',
            'Presupuesto disponible',
            'Nivel de automatización deseado',
            'Instalación eléctrica disponible o necesidad de baterías',
          ],
        },
        {
          heading: 'Proceso de Instalación Profesional',
          content: 'En Tenndalux manejamos un proceso completo que garantiza resultados perfectos:',
          timeline: [
            { step: 'Consulta inicial', description: 'Evaluamos tus espacios y necesidades específicas' },
            { step: 'Diseño personalizado', description: 'Creamos una propuesta técnica y estética' },
            { step: 'Fabricación a medida', description: 'Producimos con las especificaciones exactas' },
            { step: 'Instalación experta', description: 'Montaje profesional con garantía total' },
            { step: 'Configuración y entrenamiento', description: 'Te enseñamos a usar todos los sistemas' },
          ],
        },
        {
          heading: 'Casos de Uso Reales',
          content: 'Nuestros clientes han transformado sus hogares con aplicaciones creativas:',
          examples: [
            'Home theaters con blackout total controlado por voz',
            'Habitaciones infantiles con rutinas de sueño automáticas',
            'Oficinas en casa con ajuste automático según luz solar',
            'Áreas sociales con escenas programadas para entretenimiento',
          ],
        },
      ],
      conclusion: 'La automatización de cortinas no es solo comodidad, es una inversión en calidad de vida, eficiencia energética y valor de tu propiedad. En Tenndalux contamos con más de 15 años de experiencia instalando sistemas inteligentes que nuestros clientes aman.',
      cta: '¿Listo para automatizar tu hogar? Agenda una consultoría gratuita y descubre todas las posibilidades.',
    },
  },
};

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      content?: string;
      list?: string[];
      subsections?: Array<{ title: string; description: string }>;
      timeline?: Array<{ step: string; description: string }>;
      examples?: string[];
    }>;
    conclusion: string;
    cta: string;
  };
}

const relatedPosts = [
  {
    slug: 'tendencias-diseno-interiores-2026',
    title: '7 Tendencias en Diseño de Interiores 2026',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMDIwMjZ8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Diseño',
    readTime: '6 min',
  },
  {
    slug: 'control-solar-eficiencia-energetica',
    title: 'Control Solar y Eficiencia Energética',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzdW5saWdodCUyMHdpbmRvd3N8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sostenibilidad',
    readTime: '7 min',
  },
  {
    slug: 'tipos-telas-cortinas-como-elegir',
    title: 'Tipos de Telas para Cortinas',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjB0ZXh0dXJlJTIwY3VydGFpbnN8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Guías',
    readTime: '10 min',
  },
];

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-stone-800 mb-4">
            Artículo no encontrado
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105 bg-stone-900 text-stone-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/573238122373?text=Hola,%20leí%20el%20artículo%20sobre%20cortinas%20inteligentes%20y%20me%20interesa%20una%20consultoría', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
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
      <div className="pt-28 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article>
        <header className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-2 rounded-full text-sm bg-stone-100 text-stone-900 font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} de lectura</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-[1.05] text-stone-900">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl mb-10 text-stone-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pb-10 border-b border-stone-200">
                <div className="flex items-center gap-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-stone-900 mb-1">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-stone-500">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 border-2 border-stone-200 text-stone-900"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">Compartir</span>
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 mb-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <div className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg"
            >
              {/* Introduction */}
              <p className="text-xl mb-12 text-stone-700 leading-relaxed">
                {post.content.intro}
              </p>

              {/* Sections */}
              {post.content.sections.map((section, index) => (
                <div key={index} className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-stone-900">
                    {section.heading}
                  </h2>
                  
                  {section.content && (
                    <p className="text-lg mb-6 text-stone-700 leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <ul className="space-y-4 mb-6">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-6 h-6 flex-shrink-0 mt-1 text-stone-900" />
                          <span className="text-lg text-stone-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, i) => (
                        <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                          <h3 className="text-xl font-semibold mb-3 text-stone-900">
                            {subsection.title}
                          </h3>
                          <p className="text-base text-stone-600 leading-relaxed">
                            {subsection.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.timeline && (
                    <div className="space-y-4">
                      {section.timeline.map((item, i) => (
                        <div key={i} className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-stone-100">
                              <span className="text-lg font-bold text-stone-900">
                                {i + 1}
                              </span>
                            </div>
                            {i < section.timeline!.length - 1 && (
                              <div className="w-0.5 h-full mt-2 bg-stone-200" />
                            )}
                          </div>
                          <div className="pb-8">
                            <h4 className="text-lg font-semibold mb-2 text-stone-900">
                              {item.step}
                            </h4>
                            <p className="text-base text-stone-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.examples && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.examples.map((example, i) => (
                        <div key={i} className="bg-stone-100 rounded-xl p-6">
                          <p className="text-base font-medium text-stone-900 leading-relaxed">
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="bg-stone-900 rounded-2xl p-10 mb-12">
                <p className="text-xl mb-6 text-stone-200 leading-relaxed">
                  {post.content.conclusion}
                </p>
                <p className="text-lg text-stone-400 leading-relaxed font-light">
                  {post.content.cta}
                </p>
              </div>

              {/* Article CTA */}
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-stone-100 text-center">
                <h3 className="text-3xl font-semibold mb-4 text-stone-900">
                  ¿Te Inspiró Este Artículo?
                </h3>
                <p className="text-lg mb-8 text-stone-600 leading-relaxed">
                  Hablemos de tu proyecto. Agenda una consultoría gratuita sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/573238122373?text=Hola,%20quiero%20agendar%20una%20consultoría"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 transition-all hover:scale-105 bg-stone-900 text-stone-50"
                  >
                    <span className="text-lg font-semibold">Agendar Consultoría</span>
                    <ArrowRight className="w-6 h-6" />
                  </a>
                  <button
                    onClick={handleWhatsApp}
                    className="px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 transition-all hover:scale-105 border-2 border-stone-900 text-stone-900"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-lg font-medium">WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12 text-center text-stone-900">
            Artículos Relacionados
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${relatedPost.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs backdrop-blur-md bg-white/90 text-stone-900 font-semibold">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-stone-600 transition-colors leading-tight">
                        {relatedPost.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        <Clock className="w-4 h-4" />
                        <span>{relatedPost.readTime}</span>
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
