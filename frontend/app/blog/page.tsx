'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Search, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const blogPosts = [
  {
    id: '1',
    slug: 'cortinas-inteligentes-guia-completa',
    title: 'Cortinas Inteligentes: La Guía Completa para Automatizar Tu Hogar',
    excerpt: 'Descubre cómo la automatización de cortinas puede transformar tu espacio y mejorar tu calidad de vida con tecnología de vanguardia.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9uJTIwY3VydGFpbnN8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tecnología',
    date: '2026-02-15',
    readTime: '8 min',
    featured: true,
  },
  {
    id: '2',
    slug: 'tendencias-diseno-interiores-2026',
    title: '7 Tendencias en Diseño de Interiores que Debes Conocer en 2026',
    excerpt: 'Colores, texturas y estilos que están revolucionando los espacios modernos este año.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMDIwMjZ8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Diseño',
    date: '2026-02-12',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '3',
    slug: 'tipos-telas-cortinas-como-elegir',
    title: 'Tipos de Telas para Cortinas: Cómo Elegir la Perfecta',
    excerpt: 'Guía práctica sobre materiales, opacidad, mantenimiento y durabilidad para tomar la mejor decisión.',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjB0ZXh0dXJlJTIwY3VydGFpbnN8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Guías',
    date: '2026-02-10',
    readTime: '10 min',
    featured: false,
  },
  {
    id: '4',
    slug: 'control-solar-eficiencia-energetica',
    title: 'Control Solar y Eficiencia Energética: Ahorra hasta 30% en Climatización',
    excerpt: 'Cómo las soluciones de control solar reducen costos y mejoran el confort térmico.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzdW5saWdodCUyMHdpbmRvd3N8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sostenibilidad',
    date: '2026-02-08',
    readTime: '7 min',
    featured: false,
  },
  {
    id: '5',
    slug: 'mantenimiento-cortinas-roller',
    title: 'Mantenimiento de Cortinas Roller: Tips para Prolongar su Vida Útil',
    excerpt: 'Consejos prácticos de limpieza y cuidado para mantener tus cortinas como nuevas.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHdpbmRvdyUyMGJsaW5kc3xlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mantenimiento',
    date: '2026-02-05',
    readTime: '5 min',
    featured: false,
  },
  {
    id: '6',
    slug: 'caso-estudio-proyecto-residencial-premium',
    title: 'Caso de Estudio: Transformación Completa de Residencia Premium',
    excerpt: 'Descubre cómo transformamos un apartamento de 350m² con automatización total.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casos de Éxito',
    date: '2026-02-01',
    readTime: '12 min',
    featured: false,
  },
];

const categories = ['Todos', 'Tecnología', 'Diseño', 'Guías', 'Sostenibilidad', 'Mantenimiento', 'Casos de Éxito'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight leading-[1.05] text-stone-900">
              Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-stone-600 leading-relaxed">
              Tendencias, guías y consejos expertos sobre diseño de interiores 
              y soluciones de control solar
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-stone-900 transition-all text-lg bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all hover:scale-105 border-2 text-sm sm:text-base ${
                    selectedCategory === category 
                      ? 'bg-stone-900 text-stone-50 border-stone-900 font-semibold' 
                      : 'bg-white text-stone-600 border-stone-200 font-medium hover:border-stone-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'Todos' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-20"
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-stone-50 text-stone-900 font-semibold">
                        ⭐ Destacado
                      </span>
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-white/20 text-stone-50 font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 max-w-4xl text-stone-50 leading-[1.1]">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8 max-w-3xl text-stone-200 leading-relaxed hidden sm:block">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="hidden sm:flex items-center gap-6 text-sm text-stone-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime} de lectura</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto group-hover:gap-4 transition-all">
                        <span className="font-semibold text-stone-50">Leer artículo</span>
                        <ArrowRight className="w-5 h-5 text-stone-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs backdrop-blur-md bg-white/90 text-stone-900 font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4 text-xs text-stone-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-stone-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-base mb-6 flex-1 text-stone-500 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-stone-900 font-semibold group-hover:gap-4 transition-all">
                        <span>Leer más</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl mb-4 text-stone-500 font-medium">
                No encontramos artículos con esos criterios
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                }}
                className="text-sm font-semibold text-stone-900 hover:opacity-60 transition-opacity"
              >
                Limpiar filtros
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-stone-50">
              ¿Tienes un Proyecto en Mente?
            </h2>
            <p className="text-xl mb-10 text-stone-300 leading-relaxed">
              Agenda una consultoría gratuita y descubre cómo transformar tu espacio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20agendar%20una%20consultoría"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 bg-stone-50 text-stone-900"
              >
                <span className="text-base sm:text-lg font-semibold">Agendar Consultoría</span>
                <ArrowRight className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/573238122373?text=Hola,%20tengo%20una%20pregunta%20sobre%20sus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 border-2 border-stone-50 text-stone-50"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-base sm:text-lg font-medium">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

<Footer />
    </div>
  );
}
