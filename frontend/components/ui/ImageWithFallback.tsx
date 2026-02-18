'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fill = true,
  width,
  height 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  
  const fallbackSrc = '/placeholder.jpg';
  
  if (fill) {
    return (
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        fill
        className={className}
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
  
  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={() => setError(true)}
    />
  );
}
