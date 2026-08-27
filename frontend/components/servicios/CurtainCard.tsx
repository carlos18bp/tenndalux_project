'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import type { Curtain } from '@/lib/data/curtains';
import { whatsappUrl } from '@/lib/whatsapp';

function ChipList({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Sparkles }) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-widest text-stone-400 mb-4">{title}</h4>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-2 rounded-full bg-stone-50 border border-stone-200 px-3.5 py-2 text-sm text-stone-600"
          >
            <Icon className="w-3.5 h-3.5 flex-shrink-0 text-stone-400" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Card de una cortina, con la misma composición que la de Recubrimientos:
 * texto y CTA a la izquierda, imagen 4:3 a la derecha.
 *
 * Recubrimientos tiene una sola lista de bondades; una cortina trae tres
 * (beneficios, ideal para, opciones). Poner las tres en la columna izquierda
 * la estiraría al doble de la imagen y rompería el equilibrio, así que arriba
 * queda sólo "beneficios" —el equivalente directo de esa lista— y las otras
 * dos bajan a una fila de chips bajo el bloque principal.
 */
export default function CurtainCard({ curtain }: { curtain: Curtain }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-2xl p-5 sm:p-10 shadow-sm border border-stone-100"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-stone-900">
            {curtain.title}
          </h3>
          <p className="text-sm sm:text-lg mb-5 sm:mb-8 text-stone-600 leading-relaxed">
            {curtain.description}
          </p>

          <div className="space-y-4 mb-8">
            {curtain.beneficios.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-900" aria-hidden="true" />
                <span className="text-base text-stone-700">{item}</span>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl(`cotizar ${curtain.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-full inline-flex items-center gap-3 transition-all hover:scale-105 bg-stone-900 text-stone-50"
          >
            <span className="text-lg font-semibold">Cotizar {curtain.title}</span>
            <ArrowRight className="w-6 h-6" aria-hidden="true" />
          </a>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={curtain.image}
            alt={curtain.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 border-t border-stone-100 pt-8">
        <ChipList title="IDEAL PARA" items={curtain.idealPara} icon={Check} />
        <ChipList title="OPCIONES" items={curtain.opciones} icon={Sparkles} />
      </div>
    </motion.article>
  );
}
