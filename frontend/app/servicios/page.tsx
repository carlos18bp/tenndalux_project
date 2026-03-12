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
  Settings,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Headphones,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Product = {
  id: string;
  title: string;
  image: string;
  description: string;
  idealPara: string[];
  beneficios: string[];
  opciones: string[];
};

type ExteriorSolution = {
  title: string;
  description: string;
  image: string;
  features: string[];
};

export default function Servicios() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [selectedProductTab, setSelectedProductTab] = useState('cortinas');
  const [mobileDetailProduct, setMobileDetailProduct] = useState<Product | null>(null);
  const [mobileDetailExterior, setMobileDetailExterior] = useState<ExteriorSolution | null>(null);

  const toggleProduct = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const openMobileDetail = (product: Product) => {
    setMobileDetailProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileDetail = () => {
    setMobileDetailProduct(null);
    document.body.style.overflow = '';
  };

  const openMobileExterior = (solution: ExteriorSolution) => {
    setMobileDetailExterior(solution);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileExterior = () => {
    setMobileDetailExterior(null);
    document.body.style.overflow = '';
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
              Productos y Soluciones
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-600 leading-relaxed">
              Tecnología, diseño y funcionalidad en cada solución. De la asesoría a la instalación, con garantía y excelencia.
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

          {(() => {
            const services = [
              {
                icon: Headphones,
                title: 'Asesoría Personalizada',
                description: 'Análisis técnico del espacio con recomendación estética y funcional. Visita o videollamada sin compromiso.',
                includes: ['Análisis técnico del espacio', 'Recomendación estética y funcional', 'Selección de tejidos y sistemas', 'Visita o videollamada sin compromiso'],
              },
              {
                icon: Settings,
                title: 'Instalación Profesional',
                description: 'Equipo técnico certificado. Nivelación, fijación especializada e instalación estética sin cables visibles.',
                includes: ['Equipo técnico certificado', 'Nivelación y fijación especializada', 'Instalación estética sin cables visibles', 'Programación completa del sistema'],
              },
              {
                icon: Shield,
                title: 'Garantía y Mantenimiento',
                description: 'Hasta 5 años de garantía según producto. Cobertura total en productos y mano de obra.',
                includes: ['Hasta 5 años según producto', 'Cobertura en productos y mano de obra', 'Mantenimiento preventivo', 'Atención especializada en garantía'],
              },
              {
                icon: Award,
                title: 'Postventa y Soporte',
                description: 'Acompañamiento continuo con ajustes técnicos y soporte en automatización.',
                includes: ['Acompañamiento continuo', 'Ajustes técnicos', 'Soporte en automatización', 'Atención especializada'],
              },
            ];

            const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => (
              <div className="group bg-[#FAFAF9] rounded-2xl p-6 sm:p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-stone-100 h-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform bg-stone-100">
                  <service.icon style={{ width: '32px', height: '32px', color: '#292524' }} />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-stone-900">{service.title}</h3>
                <p className="text-sm sm:text-base mb-4 sm:mb-6 text-stone-600 leading-relaxed">{service.description}</p>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm font-semibold mb-2 sm:mb-3 text-stone-900">Incluye:</p>
                  {service.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px', color: '#292524' }} />
                      <span className="text-sm text-stone-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <div className="mb-14 sm:mb-20">
                {/* Mobile: Swiper */}
                <div className="sm:hidden">
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={12}
                    slidesPerView={1.1}
                    centeredSlides={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="!pb-10"
                  >
                    {services.map((service, index) => (
                      <SwiperSlide key={index}>
                        <ServiceCard service={service} index={index} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* Desktop: Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ServiceCard service={service} index={index} />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}

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
          {selectedProductTab === 'cortinas' && (() => {
            const cortinas: Product[] = [
              {
                id: 'ondessence',
                title: 'Cortina Ondessence',
                image: '/products/ondessence/ondessence-principal.webp',
                description: 'La evolución moderna de la cortina tradicional. Sistema Ripplefold con ondas suaves, perfectamente definidas y continuas.',
                idealPara: ['Salas amplias', 'Dormitorios principales', 'Hoteles', 'Ventanales piso a techo'],
                beneficios: ['Ondas técnicas uniformes', 'Movimiento fluido y silencioso', 'Tejidos europeos certificados (Light Fastness Clase 6)', 'Instalación premium con planchado a vapor'],
                opciones: ['Proporción 2.3 (onda sutil 9 cm)', 'Proporción 2.8 (onda profunda)', 'Automatización RF, Wi-Fi y app gratuita', 'Compatible con asistentes de voz'],
              },
              {
                id: 'luminux',
                title: 'Luminux',
                image: '/products/luminux/luminux-m.webp',
                description: 'Cortina de velo contemporánea que combina suavidad visual, control de luz y diseño escultural.',
                idealPara: ['Espacios sociales', 'Ambientes modernos', 'Ventanales piso a techo', 'Salas de estar'],
                beneficios: ['Entrada de luz controlada', 'Estética continua y decorativa', 'Instalación profesional', 'Motorización opcional'],
                opciones: ['Luminux M (onda tipo montaña)', 'Luminux S (onda tipo S intercalada)', 'Accionamiento manual o motorizado', 'Recolección lateral, central o a extremos'],
              },
              {
                id: 'dunes',
                title: 'Dunes',
                image: '/products/dunes/dunes-principal.webp',
                description: 'Cortina de velo con onda tipo montaña segmentada. Cada ola es un tramo independiente de tela con caída estructurada y acabado visual refinado.',
                idealPara: ['Espacios de diseño protagonista', 'Salas elegantes', 'Ambientes sofisticados', 'Proyectos arquitectónicos'],
                beneficios: ['Estética sofisticada', 'Movimiento definido', 'Control suave de luz', 'Mayor control estructural en caída'],
                opciones: ['Sistema segmentado de ondas independientes', 'Automatización opcional', 'Instalación técnica especializada', 'Compatible con automatización'],
              },
              {
                id: 'celulares',
                title: 'Persianas Celulares',
                image: '/products/celulares/celular-principal.webp',
                description: 'Sistema estructural con diseño celular que crea una cámara de aire interna para mejorar el confort térmico y acústico.',
                idealPara: ['Habitaciones', 'Oficinas', 'Espacios con ruido exterior', 'Ambientes con alta exposición solar'],
                beneficios: ['Aislamiento térmico', 'Reducción de ruido exterior', 'Alta eficiencia energética', 'Sistema Día y Noche disponible'],
                opciones: ['Top Down Bottom Up', 'Manual o TwinPull (seguro para niños)', 'Motorizado RF + Bluetooth', 'Transparentes, translúcidas y blackout'],
              },
              {
                id: 'enrollables',
                title: 'Cortinas Enrollables',
                image: '/products/enrollables/enrollable-screen.webp',
                description: 'Solución minimalista y funcional para el control de luz y privacidad.',
                idealPara: ['Oficinas', 'Salas de estar', 'Habitaciones', 'Cocinas'],
                beneficios: ['Control total de luz', 'Fácil mantenimiento', 'Durabilidad superior', 'Guías laterales disponibles para blackout'],
                opciones: ['Screen solar (filtro UV)', 'Blackout total', 'Translúcidas', 'Cabezal Modern 3 y perfiles Coverlight Boston'],
              },
              {
                id: 'paneles',
                title: 'Paneles Deslizantes',
                image: '/products/paneles/panel-principal.webp',
                description: 'Sistema modular ideal para grandes ventanales. Modularidad hasta 11.5 m con rieles de 2 a 10 vías.',
                idealPara: ['Grandes ventanales', 'Divisores de ambiente', 'Puertas corredizas', 'Espacios abiertos'],
                beneficios: ['Diseño arquitectónico', 'Sistema modular', 'Rieles de 2 a 10 vías', 'Gran impacto visual'],
                opciones: ['Telos de 50–60 cm', 'Motorización opcional', 'Recogida lateral, central o combinada', 'Instalación consecutiva hasta 11.5 m'],
              },
              {
                id: 'duo',
                title: 'Roller Dúo',
                image: '/products/roller-duo/roller-duo-principal.webp',
                description: 'Sistema de doble capa con franjas alternadas opacas y transparentes. Permite regular luz sin subir la cortina.',
                idealPara: ['Habitaciones', 'Oficinas en casa', 'Estudios', 'Salas multiuso'],
                beneficios: ['Doble funcionalidad', 'Control preciso de luz', 'Perfil inferior técnico', 'Cabezal de lujo'],
                opciones: ['Franjas opacas y transparentes', 'Automatización compatible', 'Telas texturizadas', 'Colores variados'],
              },
              {
                id: 'horizontales',
                title: 'Persianas Horizontales',
                image: '/products/horizontales/horizontal-principal.webp',
                description: 'Disponibles en madera Basswood, aluminio y poliéster. Opciones manuales y motorizadas con acabados premium.',
                idealPara: ['Estudios', 'Oficinas', 'Cocinas', 'Baños'],
                beneficios: ['Acabado artesanal en madera', 'Control eficiente de luz', 'Resistentes a agua y rayaduras', 'Retardantes al fuego'],
                opciones: ['Madera Basswood', 'Aluminio Micro y Mini', 'Poliéster con nanopartículas', 'Classic 50'],
              },
              {
                id: 'verticales',
                title: 'Persianas Verticales',
                image: '/products/dunes/dunes-giro.webp',
                description: 'Sistema moderno adaptable incluso a ventanas inclinadas. Lamas de 9 cm y 13 cm con motorización disponible.',
                idealPara: ['Ventanas trapezoidales', 'Oficinas', 'Espacios comerciales', 'Ventanales amplios'],
                beneficios: ['Adaptación a ventanas inclinadas', 'Sistema de liberación para limpieza', 'Riel delgado con carros equidistantes', 'Motorización disponible'],
                opciones: ['Lamas de 9 cm', 'Lamas de 13 cm', 'Colección screen y blackout', 'Colección decorativa'],
              },
            ];

            return (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Mobile: 2-col image grid */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  {cortinas.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => openMobileDetail(product)}
                      className="group text-left bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image src={product.image} alt={product.title} fill className="object-cover" sizes="50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-sm font-semibold text-white leading-tight">{product.title}</h3>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-stone-500 line-clamp-2">{product.description}</p>
                        <span className="text-xs font-semibold text-stone-900 mt-2 inline-flex items-center gap-1">
                          Ver detalles <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Desktop: Accordion */}
                <div className="hidden sm:block space-y-6">
                  {cortinas.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                      <button
                        onClick={() => toggleProduct(product.id)}
                        className="w-full p-10 flex items-center justify-between hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-center gap-6">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="80px" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-2xl font-semibold mb-2 text-stone-900">{product.title}</h3>
                            <p className="text-base text-stone-600">{product.description}</p>
                          </div>
                        </div>
                        {expandedProduct === product.id ? (
                          <ChevronUp className="w-6 h-6 flex-shrink-0 text-stone-900" />
                        ) : (
                          <ChevronDown className="w-6 h-6 flex-shrink-0 text-stone-900" />
                        )}
                      </button>

                      {expandedProduct === product.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-stone-100">
                          <div className="p-10 pt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-12">
                            <div>
                              <h4 className="text-sm font-semibold mb-4 text-stone-900">IDEAL PARA</h4>
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
                              <h4 className="text-sm font-semibold mb-4 text-stone-900">BENEFICIOS CLAVE</h4>
                              <ul className="space-y-3">
                                {product.beneficios.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-stone-900" />
                                    <span className="text-sm text-stone-600">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-4 text-stone-900">OPCIONES</h4>
                              <ul className="space-y-3">
                                {product.opciones.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 flex-shrink-0 text-stone-900" />
                                    <span className="text-sm text-stone-600">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="px-10 pb-10 pt-4">
                            <a
                              href={`https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(product.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full px-12 py-5 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] bg-stone-900 text-stone-50"
                            >
                              <span className="font-semibold">Cotizar {product.title}</span>
                              <ArrowRight className="w-5 h-5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}

          {/* Recubrimientos para Paredes */}
          {selectedProductTab === 'paredes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 sm:p-10 shadow-sm border border-stone-100"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-stone-900">
                    Recubrimientos para Paredes
                  </h3>
                  <p className="text-sm sm:text-lg mb-5 sm:mb-8 text-stone-600 leading-relaxed">
                    Paredes que hablan de ti. Vinilo, textil y ecológico con instalación profesional y materiales libres de compuestos nocivos.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      'Vinilo, textil y ecológico',
                      'Opciones resistentes a humedad',
                      'Instalación profesional',
                      'Materiales libres de compuestos nocivos',
                      'Diseños personalizados',
                      'Alta durabilidad y fácil mantenimiento',
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
                    src="/products/recubrimientos/papel-tapiz.webp"
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
          {selectedProductTab === 'exterior' && (() => {
            const exteriorSolutions: ExteriorSolution[] = [
              {
                title: 'Toldos',
                description: 'Brazos extensibles y verticales. Sistemas Cofrex, Crab y PTP con mecanismos en acero colado y guías de acero.',
                image: '/products/exterior/toldo-principal.webp',
                features: ['Toldos verticales con soportes en acero inoxidable', 'Sistema Cofrex con cofre protector (hasta 6 m x 3 m)', 'Sistema Crab con barra estructural (hasta 12 m x 4 m)', 'Sistema PTP liviano (hasta 6 m x 3.5 m)'],
              },
              {
                title: 'Pérgolas',
                description: 'Retráctiles y bioclimáticas. Estructura y diseño para crear espacios exteriores únicos y funcionales.',
                image: '/products/exterior/toldos-exterior.webp',
                features: ['Ingeniería estructural', 'Diseño arquitectónico', 'Materiales premium', 'Automatización disponible'],
              },
              {
                title: 'Cortinas Exteriores',
                description: 'Protección solar y privacidad para espacios al aire libre con diseño y funcionalidad.',
                image: '/products/exterior/toldos-exterior-2.webp',
                features: ['Protección solar efectiva', 'Privacidad exterior', 'Diseño personalizado', 'Materiales resistentes a intemperie'],
              },
              {
                title: 'Películas Solares',
                description: 'Bloqueo UV y protección de vidrio. Control térmico sin sacrificar visibilidad.',
                image: '/products/general/uso-general.webp',
                features: ['Bloqueo UV y protección de vidrio', 'Reducción de calor', 'Ahorro energético comprobado', 'Instalación sin obra'],
              },
            ];

            return (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Mobile: compact image cards */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                  {exteriorSolutions.map((solution, index) => (
                    <button
                      key={index}
                      onClick={() => openMobileExterior(solution)}
                      className="group text-left bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={solution.image} alt={solution.title} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-stone-900 mb-1">{solution.title}</h3>
                          <p className="text-xs text-stone-500 line-clamp-2">{solution.description}</p>
                          <span className="text-xs font-semibold text-stone-900 mt-1 inline-flex items-center gap-1">
                            Ver detalles <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Desktop: full cards */}
                <div className="hidden sm:block space-y-8">
                  {exteriorSolutions.map((solution, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="p-10">
                          <h3 className="text-3xl font-semibold mb-4 text-stone-900">{solution.title}</h3>
                          <p className="text-lg mb-8 text-stone-600 leading-relaxed">{solution.description}</p>
                          <ul className="space-y-3 mb-8">
                            {solution.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-900" />
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
                            <ArrowRight className="w-5 h-5" />
                          </a>
                        </div>
                        <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
                          <Image src={solution.image} alt={solution.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}

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
                  Motores avanzados compatibles con la mayoría de sistemas de automatización y asistentes de voz mediante protocolo IP
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src="/products/tecnologia/tecnologia-principal.webp" alt="Automatización y control inteligente" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src="/products/tecnologia/tecnologia-completa.webp" alt="Control de lujo adaptable a pared" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src="/products/tecnologia/tecnologia-controles.webp" alt="Controles de automatización Alexa y Google" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-16">
                {[
                  {
                    icon: Zap,
                    title: 'Operación Ultra Silenciosa',
                    description: 'Motores de última generación con bajo consumo de energía.',
                  },
                  {
                    icon: Settings,
                    title: 'Integración Total',
                    description: 'Compatible con Alexa, Google Home, IFTTT y SmartThings.',
                  },
                  {
                    icon: Sparkles,
                    title: 'App Gratuita',
                    description: 'Programación de escenas, horarios automáticos y control remoto.',
                  },
                  {
                    icon: Sun,
                    title: 'Sin Cables Visibles',
                    description: 'Instalación limpia sin obra. Baterías autónomas recargables.',
                  },
                  {
                    icon: Clock,
                    title: 'Garantía Limitada 5 Años',
                    description: 'Soporte técnico en programación y acompañamiento continuo.',
                  },
                  {
                    icon: Shield,
                    title: 'Control Inteligente',
                    description: 'Agrupación de cortinas, bloqueo de cambios no autorizados y domótica.',
                  },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-10 hover:bg-white/20 transition-colors"
                  >
                    <tech.icon className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-5 text-stone-50" />
                    <h4 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
                      {tech.title}
                    </h4>
                    <p className="text-xs sm:text-base text-stone-300 leading-relaxed">
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
              Acompañamos el Proceso Completo
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-stone-600">
              De la asesoría a la postventa, estamos contigo en cada paso
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { step: '01', title: 'Análisis', description: 'Análisis de proyecto' },
              { step: '02', title: 'Asesoría', description: 'Asesoría en diseño' },
              { step: '03', title: 'Medidas', description: 'Toma de medidas' },
              { step: '04', title: 'Fabricación', description: 'Producción a medida' },
              { step: '05', title: 'Instalación', description: 'Montaje profesional' },
              { step: '06', title: 'Automatización', description: 'Programación del sistema' },
              { step: '07', title: 'Postventa', description: 'Soporte continuo' },
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

            {(() => {
              const guarantees = [
                {
                  icon: Shield,
                  title: '5 Años de Garantía',
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
              ];

              return (
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                  {guarantees.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 bg-stone-100">
                        <item.icon className="w-7 h-7 sm:w-10 sm:h-10 text-stone-900" />
                      </div>
                      <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-stone-900">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              );
            })()}
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

      {/* Mobile Bottom Sheet: Product Detail */}
      {mobileDetailProduct && (
        <div className="fixed inset-0 z-50 sm:hidden" onClick={closeMobileDetail}>
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 pt-3 pb-2 px-6">
              <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto" />
            </div>

            {/* Hero image */}
            <div className="relative aspect-[16/9] mx-4 rounded-2xl overflow-hidden">
              <Image src={mobileDetailProduct.image} alt={mobileDetailProduct.title} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{mobileDetailProduct.title}</h3>
              </div>
            </div>

            <div className="px-5 py-5 space-y-5">
              <p className="text-sm text-stone-600 leading-relaxed">{mobileDetailProduct.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-stone-900 mb-3 uppercase tracking-wide">Ideal para</h4>
                  <ul className="space-y-1.5">
                    {mobileDetailProduct.idealPara.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-stone-900" />
                        <span className="text-xs text-stone-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-stone-900 mb-3 uppercase tracking-wide">Beneficios</h4>
                  <ul className="space-y-1.5">
                    {mobileDetailProduct.beneficios.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 flex-shrink-0 mt-0.5 text-stone-900" />
                        <span className="text-xs text-stone-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-stone-900 mb-3 uppercase tracking-wide">Opciones disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {mobileDetailProduct.opciones.map((item, i) => (
                    <span key={i} className="text-xs bg-white border border-stone-200 text-stone-700 px-3 py-1.5 rounded-full">{item}</span>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(mobileDetailProduct.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 bg-stone-900 text-stone-50 font-semibold text-sm"
              >
                Cotizar {mobileDetailProduct.title}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Bottom Sheet: Exterior Detail */}
      {mobileDetailExterior && (
        <div className="fixed inset-0 z-50 sm:hidden" onClick={closeMobileExterior}>
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 pt-3 pb-2 px-6">
              <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto" />
            </div>

            <div className="relative aspect-[16/9] mx-4 rounded-2xl overflow-hidden">
              <Image src={mobileDetailExterior.image} alt={mobileDetailExterior.title} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{mobileDetailExterior.title}</h3>
              </div>
            </div>

            <div className="px-5 py-5 space-y-5">
              <p className="text-sm text-stone-600 leading-relaxed">{mobileDetailExterior.description}</p>

              <div className="bg-stone-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-stone-900 mb-3 uppercase tracking-wide">Características</h4>
                <ul className="space-y-2">
                  {mobileDetailExterior.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-stone-900" />
                      <span className="text-sm text-stone-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/573238122373?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(mobileDetailExterior.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 bg-stone-900 text-stone-50 font-semibold text-sm"
              >
                Cotizar {mobileDetailExterior.title}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
