'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Sun, 
  Shield, 
  Sparkles, 
  Zap,
  Home,
  Building2,
  Ruler,
  Settings,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Headphones,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Servicios() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [selectedProductTab, setSelectedProductTab] = useState('cortinas');

  const toggleProduct = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#292524] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#292524] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight leading-[1.05] text-stone-900">
              Servicios Premium
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-600 leading-relaxed">
              De la asesoría a la instalación. Todo lo que necesitas para transformar 
              tu espacio con garantía y excelencia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573238122373?text=Hola,%20quiero%20una%20asesoría%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 sm:px-14 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-xl bg-stone-900 text-stone-50"
              >
                <span className="text-base sm:text-lg font-semibold">Solicitar Asesoría Gratis</span>
                <ArrowRight style={{ width: '24px', height: '24px' }} />
              </a>
              
              <a
                href="#productos"
                className="px-8 sm:px-14 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-105 border-2 border-stone-900 text-stone-900"
              >
                <span className="text-base sm:text-lg font-medium">Ver Productos</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-stone-900">
              Nuestros Servicios
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-stone-600">
              Experiencia completa en cada etapa de tu proyecto
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-20">
            {[
              {
                icon: Headphones,
                title: 'Asesoría Gratuita',
                description: 'Evaluación completa de tu espacio, necesidades y presupuesto. Sin compromiso.',
                includes: ['Visita a domicilio o virtual', 'Medición precisa de espacios', 'Recomendaciones personalizadas', 'Presupuesto detallado'],
              },
              {
                icon: Ruler,
                title: 'Diseño Personalizado',
                description: 'Creamos la solución perfecta según tu estilo, funcionalidad y arquitectura.',
                includes: ['Renders 3D de propuesta', 'Selección de materiales premium', 'Paleta de colores y texturas', 'Ajustes ilimitados'],
              },
              {
                icon: Settings,
                title: 'Instalación Profesional',
                description: 'Montaje experto con garantía total. Equipos certificados y procesos probados.',
                includes: ['Instaladores certificados', 'Herramientas especializadas', 'Limpieza post-instalación', 'Garantía de 2 años'],
              },
              {
                icon: Zap,
                title: 'Automatización',
                description: 'Tecnología de vanguardia integrada con tu hogar inteligente.',
                includes: ['Motores silenciosos premium', 'Control por voz (Alexa/Google)', 'App móvil dedicada', 'Programación de rutinas'],
              },
              {
                icon: Shield,
                title: 'Garantía y Mantenimiento',
                description: 'Respaldo total en productos y servicio. Soporte continuo para tu tranquilidad.',
                includes: ['2 años de garantía', 'Mantenimiento preventivo', 'Soporte técnico 24/7', 'Repuestos originales'],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#FAFAF9] rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-stone-100"
              >
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-stone-100">
                  <service.icon style={{ width: '40px', height: '40px', color: '#292524' }} />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-stone-900">
                  {service.title}
                </h3>
                
                <p className="text-base mb-6 text-stone-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold mb-3 text-stone-900">
                    Incluye:
                  </p>
                  {service.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                      <span className="text-sm text-stone-500">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="https://wa.me/573238122373?text=Hola,%20quiero%20hablar%20con%20un%20asesor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-10 py-4 sm:py-5 rounded-full inline-flex items-center gap-3 transition-all hover:scale-105 hover:shadow-xl bg-stone-900 text-stone-50"
            >
              <span className="text-sm sm:text-base font-semibold">Hablar con un Asesor</span>
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 448 512" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Products & Solutions */}
      <section id="productos" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 tracking-tight text-stone-900">
              Productos y Soluciones
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-stone-600">
              Tecnología, diseño y funcionalidad en cada solución
            </p>
          </motion.div>

          {/* Product Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
            {[
              { id: 'cortinas', label: 'Cortinas', icon: Home },
              { id: 'paredes', label: 'Recubrimientos', icon: Building2 },
              { id: 'exterior', label: 'Exteriores', icon: Sun },
              { id: 'tecnologia', label: 'Tecnología', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedProductTab(tab.id)}
                className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 border-2 text-sm sm:text-base ${
                  selectedProductTab === tab.id 
                    ? 'bg-stone-900 text-stone-50 border-stone-900 font-semibold' 
                    : 'bg-white text-stone-600 border-stone-200 font-medium'
                }`}
              >
                <tab.icon style={{ width: '18px', height: '18px' }} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Cortinas */}
          {selectedProductTab === 'cortinas' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {[
                {
                  id: 'enrollables',
                  title: 'Cortinas Enrollables',
                  image: 'https://images.unsplash.com/photo-1758974775331-c5400bbef625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbSUyMGN1cnRhaW5zfGVufDF8fHx8MTc3MTI5NzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
                  description: 'Diseño minimalista y funcional. Ideales para espacios modernos.',
                  idealPara: ['Oficinas', 'Salas de estar', 'Habitaciones', 'Cocinas'],
                  beneficios: ['Control total de luz', 'Fácil mantenimiento', 'Durabilidad superior', 'Motorización disponible'],
                  opciones: ['Screen solar (filtro UV)', 'Blackout total', 'Translúcidas', 'Decorativas'],
                },
                {
                  id: 'sheer',
                  title: 'Sheer Elegance / Ondas',
                  image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5JTIwaG91c2UlMjBpbnRlcmlvciUyMGRlc2lnbiUyMDIwMjZ8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  description: 'Elegancia y sofisticación con doble capa ajustable.',
                  idealPara: ['Salas formales', 'Comedores', 'Habitaciones principales', 'Áreas sociales'],
                  beneficios: ['Doble privacidad', 'Diseño elegante', 'Versatilidad única', 'Iluminación ajustable'],
                  opciones: ['Telas premium', 'Colores personalizados', 'Automatización', 'Sistemas duales'],
                },
                {
                  id: 'paneles',
                  title: 'Paneles Japoneses',
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  description: 'Diseño modular contemporáneo para grandes ventanales.',
                  idealPara: ['Ventanas amplias', 'Divisores de ambiente', 'Puertas corredizas', 'Espacios abiertos'],
                  beneficios: ['Diseño arquitectónico', 'Sistema modular', 'Fácil operación', 'Gran impacto visual'],
                  opciones: ['2 a 5 paneles', 'Telas combinadas', 'Motorización', 'Rieles premium'],
                },
                {
                  id: 'duo',
                  title: 'Cortinas Dúo',
                  image: 'https://images.unsplash.com/photo-1750271336580-f11df678e840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwcm9sbGVyJTIwYmxpbmRzfGVufDF8fHx8MTc3MTI5NzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
                  description: 'Combinación perfecta de privacidad y entrada de luz natural.',
                  idealPara: ['Habitaciones', 'Oficinas en casa', 'Estudios', 'Salas multiuso'],
                  beneficios: ['Doble funcionalidad', 'Control preciso', 'Estética única', 'Ahorro energético'],
                  opciones: ['Telas texturizadas', 'Colores duales', 'Motorización sincronizada', 'Control independiente'],
                },
              ].map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
                >
                  <button
                    onClick={() => toggleProduct(product.id)}
                    className="w-full p-5 sm:p-10 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-stone-900">
                          {product.title}
                        </h3>
                        <p className="text-sm sm:text-base text-stone-600 hidden sm:block">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    {expandedProduct === product.id ? (
                      <ChevronUp style={{ width: '24px', height: '24px', flexShrink: 0, color: '#292524' }} />
                    ) : (
                      <ChevronDown style={{ width: '24px', height: '24px', flexShrink: 0, color: '#292524' }} />
                    )}
                  </button>

                  {expandedProduct === product.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-stone-100"
                    >
                      <div className="p-5 sm:p-10 pt-6 sm:pt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
                        <div>
                          <h4 className="text-sm font-semibold mb-4 text-stone-900">
                            IDEAL PARA
                          </h4>
                          <ul className="space-y-3">
                            {product.idealPara.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                                <span className="text-sm text-stone-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-4 text-stone-900">
                            BENEFICIOS CLAVE
                          </h4>
                          <ul className="space-y-3">
                            {product.beneficios.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                                <span className="text-sm text-stone-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-4 text-stone-900">
                            OPCIONES
                          </h4>
                          <ul className="space-y-3">
                            {product.opciones.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Sparkles style={{ width: '16px', height: '16px', flexShrink: 0, color: '#292524' }} />
                                <span className="text-sm text-stone-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="px-5 sm:px-10 pb-6 sm:pb-10 pt-4">
                        <a
                          href={`https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(product.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-12 py-5 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] bg-stone-900 text-stone-50"
                        >
                          <span className="font-semibold">Cotizar {product.title}</span>
                          <ArrowRight style={{ width: '20px', height: '20px' }} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Recubrimientos para Paredes */}
          {selectedProductTab === 'paredes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-10 shadow-sm border border-stone-100"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h3 className="text-3xl font-semibold mb-6 text-stone-900">
                    Recubrimientos para Paredes
                  </h3>
                  <p className="text-lg mb-8 text-stone-600 leading-relaxed">
                    Transforma tus espacios con texturas y diseños que reflejan personalidad y estilo único.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      'Texturas premium y exclusivas',
                      'Instalación profesional certificada',
                      'Diseños personalizados',
                      'Materiales de alta durabilidad',
                      'Resistencia al desgaste',
                      'Fácil mantenimiento',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                        <span className="text-base text-stone-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/573238122373?text=Hola,%20quiero%20el%20catálogo%20de%20recubrimientos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 rounded-full inline-flex items-center gap-3 transition-all hover:scale-105 bg-stone-900 text-stone-50"
                  >
                    <span className="text-lg font-semibold">Solicitar Catálogo</span>
                    <ArrowRight style={{ width: '24px', height: '24px' }} />
                  </a>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjB0ZXh0dXJlJTIwY3VydGFpbnN8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Recubrimientos"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Soluciones para Exterior */}
          {selectedProductTab === 'exterior' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {[
                {
                  title: 'Toldos',
                  description: 'Protección solar premium para terrazas, balcones y áreas comerciales.',
                  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVycmFjZSUyMG91dGRvb3J8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  features: ['Telas resistentes a rayos UV', 'Motorización y sensores', 'Diseños personalizados', 'Estructuras en aluminio'],
                },
                {
                  title: 'Pérgolas',
                  description: 'Estructura y diseño para crear espacios exteriores únicos y funcionales.',
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5JTIwaG91c2UlMjBleHRlcmlvcnxlbnwxfHx8fDE3Mzk5MjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  features: ['Ingeniería estructural', 'Diseño arquitectónico', 'Materiales premium', 'Automatización disponible'],
                },
                {
                  title: 'Películas Solares',
                  description: 'Control térmico y protección UV para ventanas sin sacrificar visibilidad.',
                  image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzdW5saWdodCUyMHdpbmRvd3N8ZW58MXx8fHwxNzM5OTI0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  features: ['Reducción de calor hasta 80%', 'Protección UV 99%', 'Ahorro energético comprobado', 'Instalación sin obra'],
                },
              ].map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="p-10">
                      <h3 className="text-3xl font-semibold mb-4 text-stone-900">
                        {solution.title}
                      </h3>
                      <p className="text-lg mb-8 text-stone-600 leading-relaxed">
                        {solution.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                            <span className="text-base text-stone-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={`https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(solution.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-5 rounded-full inline-flex items-center gap-3 transition-all hover:scale-105 bg-stone-900 text-stone-50"
                      >
                        <span className="font-semibold">Cotizar {solution.title}</span>
                        <ArrowRight style={{ width: '20px', height: '20px' }} />
                      </a>
                    </div>

                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tecnología */}
          {selectedProductTab === 'tecnologia' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-stone-900 to-stone-700 rounded-2xl p-6 sm:p-12 md:p-20 text-white"
            >
              <div className="text-center mb-16">
                <h3 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
                  Automatización Inteligente
                </h3>
                <p className="text-xl max-w-3xl mx-auto text-stone-300 leading-relaxed">
                  Convierte tu hogar o negocio en un espacio inteligente con tecnología de vanguardia
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
                {[
                  {
                    icon: Zap,
                    title: 'Motores Inalámbricos',
                    description: 'Tecnología silenciosa y eficiente sin necesidad de cables.',
                  },
                  {
                    icon: Settings,
                    title: 'Control por Voz',
                    description: 'Compatible con Alexa, Google Home y Siri. Control total con tu voz.',
                  },
                  {
                    icon: Settings,
                    title: 'Programación Inteligente',
                    description: 'Crea rutinas y horarios personalizados según tus hábitos.',
                  },
                  {
                    icon: Sun,
                    title: 'Sensores de Luz',
                    description: 'Ajuste automático según intensidad de luz ambiental.',
                  },
                  {
                    icon: Clock,
                    title: 'Automatización por Horarios',
                    description: 'Apertura y cierre programado. Simula presencia cuando viajas.',
                  },
                  {
                    icon: Sparkles,
                    title: 'App Móvil Dedicada',
                    description: 'Control total desde tu celular, estés donde estés.',
                  },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-10 hover:bg-white/20 transition-colors"
                  >
                    <tech.icon style={{ width: '48px', height: '48px', marginBottom: '20px', color: '#FAFAF9' }} />
                    <h4 className="text-xl font-semibold mb-4">
                      {tech.title}
                    </h4>
                    <p className="text-base text-stone-300 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="https://wa.me/573238122373?text=Hola,%20quiero%20automatizar%20mi%20espacio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 sm:px-14 py-5 sm:py-6 rounded-full inline-flex items-center gap-3 sm:gap-4 transition-all hover:scale-105 bg-stone-50 text-stone-900"
                >
                  <span className="text-base sm:text-xl font-semibold">Automatizar Mi Espacio</span>
                  <ArrowRight style={{ width: '28px', height: '28px' }} />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Work Process */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 tracking-tight text-stone-900">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-stone-600">
              Metodología probada para resultados excepcionales
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Consultamos', time: '1 día', description: 'Visita y evaluación inicial' },
              { step: '02', title: 'Diseñamos', time: '3 días', description: 'Propuesta y renders 3D' },
              { step: '03', title: 'Aprobamos', time: '1 día', description: 'Ajustes y confirmación' },
              { step: '04', title: 'Fabricamos', time: '2 semanas', description: 'Producción a medida' },
              { step: '05', title: 'Instalamos', time: '2-3 días', description: 'Montaje y configuración' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-stone-100">
                  <span className="text-3xl font-bold text-stone-900">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-stone-900">
                  {item.title}
                </h3>
                <p className="text-sm mb-3 px-3 py-1 rounded-full inline-block bg-stone-100 text-stone-500 font-medium">
                  {item.time}
                </p>
                <p className="text-sm text-stone-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-sm border border-stone-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-stone-900">
                Nuestra Garantía
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-stone-600">
                Tu tranquilidad es nuestra prioridad
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Shield,
                  title: '2 Años de Garantía',
                  description: 'Cobertura total en productos y mano de obra',
                },
                {
                  icon: Award,
                  title: 'Calidad Certificada',
                  description: 'Materiales premium con certificaciones internacionales',
                },
                {
                  icon: Headphones,
                  title: 'Soporte 24/7',
                  description: 'Asistencia técnica cuando la necesites',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-stone-100">
                    <item.icon style={{ width: '40px', height: '40px', color: '#292524' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-br from-stone-900 to-stone-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight text-stone-50 leading-[1.1]"
          >
            ¿Listo para Empezar?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl mb-12 text-stone-300 leading-relaxed"
          >
            Cotización gratuita · Asesoría personalizada · Sin compromiso
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a
              href="https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20mi%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 sm:px-14 py-5 sm:py-6 rounded-full flex items-center justify-center gap-3 sm:gap-4 transition-all hover:scale-110 hover:shadow-2xl bg-stone-50 text-stone-900"
            >
              <span className="text-base sm:text-xl font-semibold">Cotizar Mi Proyecto</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <Link
              href="/portafolio"
              className="group px-8 sm:px-14 py-5 sm:py-6 rounded-full flex items-center justify-center gap-3 sm:gap-4 transition-all hover:scale-110 border-2 border-stone-50 text-stone-50"
            >
              <span className="text-base sm:text-xl font-medium">Ver Proyectos</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
