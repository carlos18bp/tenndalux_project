'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { mediaUrl } from '@/lib/services/content';
import type { ContentBlock } from '@/types/content';

function Heading({ text }: { text?: string }) {
  if (!text) return null;
  return <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-4">{text}</h2>;
}

function Parrafo({ block }: { block: Extract<ContentBlock, { type: 'parrafo' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <p className="text-base sm:text-lg text-stone-600 leading-relaxed whitespace-pre-line">
        {block.text}
      </p>
    </>
  );
}

function Lista({ block }: { block: Extract<ContentBlock, { type: 'lista' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <ul className="space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-900" aria-hidden="true" />
            <span className="text-base text-stone-600">{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Ejemplos({ block }: { block: Extract<ContentBlock, { type: 'ejemplos' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="grid md:grid-cols-2 gap-4">
        {block.items.map((item) => (
          <div key={item} className="bg-stone-100 rounded-xl p-6">
            <p className="text-base font-medium text-stone-900 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Subsecciones({ block }: { block: Extract<ContentBlock, { type: 'subsecciones' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="grid md:grid-cols-2 gap-5">
        {block.items.map((item) => (
          <div key={item.title} className="bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function LineaDeTiempo({ block }: { block: Extract<ContentBlock, { type: 'linea_de_tiempo' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <ol className="space-y-6">
        {block.steps.map((step, index) => (
          <li key={step.step} className="flex gap-5">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900 text-stone-50 font-semibold text-sm shrink-0">
              {index + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-lg font-semibold text-stone-900">
                {step.step}
                {step.duration && (
                  <span className="ml-3 text-xs font-medium text-stone-400">{step.duration}</span>
                )}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mt-1">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Metricas({ block }: { block: Extract<ContentBlock, { type: 'metricas' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {block.items.map((item) => (
          <div key={item.metric} className="bg-stone-50 border border-stone-200 rounded-xl p-6">
            <p className="text-3xl font-bold text-stone-900 tabular-nums mb-2">{item.metric}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Galeria({ block }: { block: Extract<ContentBlock, { type: 'galeria' }> }) {
  // El backend descarta los ids que ya no existen, así que una galería puede
  // llegar vacía: se omite entera en vez de dejar un título suelto.
  if (block.images.length === 0) return null;

  return (
    <>
      <Heading text={block.heading} />
      <div className="grid sm:grid-cols-2 gap-4">
        {block.images.map((image) => (
          <div key={image.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
            <Image
              src={mediaUrl(image.url)}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}

function Video({ block }: { block: Extract<ContentBlock, { type: 'video' }> }) {
  if (!block.youtube_id) return null;

  return (
    <>
      <Heading text={block.heading} />
      <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${block.youtube_id}`}
          title={block.title || 'Video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {block.title && <p className="text-sm text-stone-500 mt-3">{block.title}</p>}
    </>
  );
}

function Testimonio({ block }: { block: Extract<ContentBlock, { type: 'testimonio' }> }) {
  return (
    <>
      <Heading text={block.heading} />
      <figure className="border-l-4 border-stone-900 pl-6 py-2">
        <blockquote className="text-lg sm:text-xl text-stone-800 leading-relaxed italic">
          “{block.text}”
        </blockquote>
        <figcaption className="mt-4 text-sm text-stone-500">
          <span className="font-semibold text-stone-900">{block.author}</span>
          {block.role && <span> · {block.role}</span>}
        </figcaption>
      </figure>
    </>
  );
}

function Cierre({ block }: { block: Extract<ContentBlock, { type: 'cierre' }> }) {
  return (
    <div className="bg-stone-900 rounded-2xl p-6 sm:p-10">
      <p className="text-lg sm:text-xl text-stone-200 leading-relaxed">{block.text}</p>
      {block.note && (
        <p className="text-lg text-stone-400 leading-relaxed font-light mt-4">{block.note}</p>
      )}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case 'parrafo': return <Parrafo block={block} />;
    case 'lista': return <Lista block={block} />;
    case 'ejemplos': return <Ejemplos block={block} />;
    case 'subsecciones': return <Subsecciones block={block} />;
    case 'linea_de_tiempo': return <LineaDeTiempo block={block} />;
    case 'metricas': return <Metricas block={block} />;
    case 'galeria': return <Galeria block={block} />;
    case 'video': return <Video block={block} />;
    case 'testimonio': return <Testimonio block={block} />;
    case 'cierre': return <Cierre block={block} />;
    default: return null;
  }
}

/**
 * Pinta la lista de bloques en el orden en que vienen.
 *
 * Un tipo desconocido se omite en silencio: el backend valida al guardar, así
 * que si algo raro llega es porque se agregó un bloque nuevo antes de desplegar
 * el frontend, y en ese caso vale más perder una sección que romper la página.
 */
export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-10 sm:space-y-14">
      {blocks.map((block, index) => (
        <section key={`${block.type}-${index}`}>{renderBlock(block)}</section>
      ))}
    </div>
  );
}
