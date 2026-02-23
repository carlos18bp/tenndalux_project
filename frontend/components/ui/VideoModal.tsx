'use client';

import { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      videoRef.current?.play();
    } else {
      document.body.style.overflow = 'unset';
      videoRef.current?.pause();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative z-10 w-full max-w-[420px] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 p-2 text-white/80 hover:text-white transition-colors z-20"
          aria-label="Cerrar video"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        {/* Title */}
        {title && (
          <h3 className="absolute -top-14 left-0 text-white text-lg font-medium truncate max-w-[70%]">
            {title}
          </h3>
        )}

        {/* Video */}
        <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl max-h-[80vh]">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="w-full h-auto max-h-[80vh] object-contain"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>
      </div>
    </div>
  );
}
