'use client';

/**
 * Coming Soon page - Beautiful landing page while the site is under construction.
 * 
 * Features:
 * - Animated gradient background
 * - Pulsing elements
 * - Responsive design
 * - Links to authentication (for development)
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-white">
        {/* Logo or brand name */}
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            TenndaluX
          </h1>
        </div>

        {/* Main message */}
        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-light text-white/90">
                Estamos trabajando para ti
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Algo increíble está por llegar
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Nuestro equipo está construyendo una experiencia única que te sorprenderá.
              Muy pronto estaremos listos para mostrarte todo lo que hemos preparado.
            </p>
          </div>
        </div>

        {/* Animated icon/illustration */}
        <div className={`mt-12 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center animate-bounce-slow">
              <svg 
                className="w-16 h-16 md:w-20 md:h-20 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Status indicators */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">En Desarrollo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <span className="text-sm font-medium">Diseñando UX</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
              <span className="text-sm font-medium">Optimizando</span>
            </div>
          </div>
        </div>

        {/* CTA / Dev links */}

        {/* Footer info */}
        <div className={`mt-16 pt-12 pb-8 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-white/70">
              <span className="text-sm">Powered by</span>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-white/10 rounded">Django</span>
                <span className="px-2 py-1 bg-white/10 rounded">Next.js</span>
                <span className="px-2 py-1 bg-white/10 rounded">TypeScript</span>
                <span className="px-2 py-1 bg-white/10 rounded">Project Apps</span>
              </div>
            </div>
            <p className="text-xs text-white/50">
              © 2026 TenndaluX. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}
