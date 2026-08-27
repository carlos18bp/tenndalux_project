/**
 * Las 9 cortinas del catálogo, mostradas en /servicios.
 *
 * `shortLabel` existe sólo para la pill horizontal del selector: los títulos
 * completos ("Persianas Horizontales") no caben en una fila de nueve opciones,
 * y el título largo sigue mandando en la card.
 */
export type Curtain = {
  id: string;
  title: string;
  shortLabel: string;
  image: string;
  description: string;
  idealPara: string[];
  beneficios: string[];
  opciones: string[];
};

export const CURTAINS: Curtain[] = [
  {
    id: 'ondessence',
    title: 'Cortina Ondessence',
    shortLabel: 'Ondessence',
    image: '/products/ondessence/ondessence-principal.webp',
    description: 'La evolución moderna de la cortina tradicional. Sistema Ripplefold con ondas suaves, perfectamente definidas y continuas.',
    idealPara: ['Salas amplias', 'Dormitorios principales', 'Hoteles', 'Ventanales piso a techo'],
    beneficios: ['Ondas técnicas uniformes', 'Movimiento fluido y silencioso', 'Tejidos europeos certificados (Light Fastness Clase 6)', 'Instalación premium con planchado a vapor'],
    opciones: ['Proporción 2.3 (onda sutil 9 cm)', 'Proporción 2.8 (onda profunda)', 'Automatización RF, Wi-Fi y app gratuita', 'Compatible con asistentes de voz'],
  },
  {
    id: 'luminux',
    title: 'Luminux',
    shortLabel: 'Luminux',
    image: '/products/luminux/luminux-m.webp',
    description: 'Cortina de velo contemporánea que combina suavidad visual, control de luz y diseño escultural.',
    idealPara: ['Espacios sociales', 'Ambientes modernos', 'Ventanales piso a techo', 'Salas de estar'],
    beneficios: ['Entrada de luz controlada', 'Estética continua y decorativa', 'Instalación profesional', 'Motorización opcional'],
    opciones: ['Luminux M (onda tipo montaña)', 'Luminux S (onda tipo S intercalada)', 'Accionamiento manual o motorizado', 'Recolección lateral, central o a extremos'],
  },
  {
    id: 'dunes',
    title: 'Dunes',
    shortLabel: 'Dunes',
    image: '/products/dunes/dunes-principal.webp',
    description: 'Cortina de velo con onda tipo montaña segmentada. Cada ola es un tramo independiente de tela con caída estructurada y acabado visual refinado.',
    idealPara: ['Espacios de diseño protagonista', 'Salas elegantes', 'Ambientes sofisticados', 'Proyectos arquitectónicos'],
    beneficios: ['Estética sofisticada', 'Movimiento definido', 'Control suave de luz', 'Mayor control estructural en caída'],
    opciones: ['Sistema segmentado de ondas independientes', 'Automatización opcional', 'Instalación técnica especializada', 'Compatible con automatización'],
  },
  {
    id: 'celulares',
    title: 'Persianas Celulares',
    shortLabel: 'Celulares',
    image: '/products/celulares/celular-principal.webp',
    description: 'Sistema estructural con diseño celular que crea una cámara de aire interna para mejorar el confort térmico y acústico.',
    idealPara: ['Habitaciones', 'Oficinas', 'Espacios con ruido exterior', 'Ambientes con alta exposición solar'],
    beneficios: ['Aislamiento térmico', 'Reducción de ruido exterior', 'Alta eficiencia energética', 'Sistema Día y Noche disponible'],
    opciones: ['Top Down Bottom Up', 'Manual o TwinPull (seguro para niños)', 'Motorizado RF + Bluetooth', 'Transparentes, translúcidas y blackout'],
  },
  {
    id: 'enrollables',
    title: 'Cortinas Enrollables',
    shortLabel: 'Enrollables',
    image: '/products/enrollables/enrollable-screen.webp',
    description: 'Solución minimalista y funcional para el control de luz y privacidad.',
    idealPara: ['Oficinas', 'Salas de estar', 'Habitaciones', 'Cocinas'],
    beneficios: ['Control total de luz', 'Fácil mantenimiento', 'Durabilidad superior', 'Guías laterales disponibles para blackout'],
    opciones: ['Screen solar (filtro UV)', 'Blackout total', 'Translúcidas', 'Cabezal Modern 3 y perfiles Coverlight Boston'],
  },
  {
    id: 'paneles',
    title: 'Paneles Deslizantes',
    shortLabel: 'Paneles',
    image: '/products/paneles/panel-principal.webp',
    description: 'Sistema modular ideal para grandes ventanales. Modularidad hasta 11.5 m con rieles de 2 a 10 vías.',
    idealPara: ['Grandes ventanales', 'Divisores de ambiente', 'Puertas corredizas', 'Espacios abiertos'],
    beneficios: ['Diseño arquitectónico', 'Sistema modular', 'Rieles de 2 a 10 vías', 'Gran impacto visual'],
    opciones: ['Telos de 50–60 cm', 'Motorización opcional', 'Recogida lateral, central o combinada', 'Instalación consecutiva hasta 11.5 m'],
  },
  {
    id: 'duo',
    title: 'Roller Dúo',
    shortLabel: 'Roller Dúo',
    image: '/products/roller-duo/roller-duo-principal.webp',
    description: 'Sistema de doble capa con franjas alternadas opacas y transparentes. Permite regular luz sin subir la cortina.',
    idealPara: ['Habitaciones', 'Oficinas en casa', 'Estudios', 'Salas multiuso'],
    beneficios: ['Doble funcionalidad', 'Control preciso de luz', 'Perfil inferior técnico', 'Cabezal de lujo'],
    opciones: ['Franjas opacas y transparentes', 'Automatización compatible', 'Telas texturizadas', 'Colores variados'],
  },
  {
    id: 'horizontales',
    title: 'Persianas Horizontales',
    shortLabel: 'Horizontales',
    image: '/products/horizontales/horizontal-principal.webp',
    description: 'Disponibles en madera Basswood, aluminio y poliéster. Opciones manuales y motorizadas con acabados premium.',
    idealPara: ['Estudios', 'Oficinas', 'Cocinas', 'Baños'],
    beneficios: ['Acabado artesanal en madera', 'Control eficiente de luz', 'Resistentes a agua y rayaduras', 'Retardantes al fuego'],
    opciones: ['Madera Basswood', 'Aluminio Micro y Mini', 'Poliéster con nanopartículas', 'Classic 50'],
  },
  {
    id: 'verticales',
    title: 'Persianas Verticales',
    shortLabel: 'Verticales',
    image: '/products/dunes/dunes-giro.webp',
    description: 'Sistema moderno adaptable incluso a ventanas inclinadas. Lamas de 9 cm y 13 cm con motorización disponible.',
    idealPara: ['Ventanas trapezoidales', 'Oficinas', 'Espacios comerciales', 'Ventanales amplios'],
    beneficios: ['Adaptación a ventanas inclinadas', 'Sistema de liberación para limpieza', 'Riel delgado con carros equidistantes', 'Motorización disponible'],
    opciones: ['Lamas de 9 cm', 'Lamas de 13 cm', 'Colección screen y blackout', 'Colección decorativa'],
  },
];
