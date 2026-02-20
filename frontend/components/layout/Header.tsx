'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChatBubbleLeftRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on route change / outside click
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Servicios', href: '/servicios' },
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 w-full bg-stone-50/60 backdrop-blur-xl z-50 border-b border-stone-200/40">
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px] sm:h-20">
          <Link href="/" className="text-[22px] font-semibold text-stone-900 tracking-tight">
            Tenndalux
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-stone-500 hover:text-stone-900 transition-colors duration-300 text-[15px] font-medium after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#contacto"
              className="hidden sm:flex bg-stone-900 text-stone-50 px-8 py-3 rounded-full font-medium text-sm hover:bg-stone-800 transition-all duration-300 items-center gap-2.5 hover:shadow-lg hover:shadow-stone-900/10"
            >
              <ChatBubbleLeftRightIcon className="w-[18px] h-[18px]" />
              <span>Contáctanos</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-stone-700 hover:bg-stone-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <XMarkIcon className="w-6 h-6" />
              </span>
              <span className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                <Bars3Icon className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with smooth animation */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-stone-50/95 backdrop-blur-xl border-t border-stone-200/50">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-6 flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-all duration-200 text-lg font-medium py-3.5 px-5 rounded-xl"
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 pt-4 border-t border-stone-200/60">
              <Link
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 bg-stone-900 text-stone-50 py-4 rounded-xl font-medium text-base hover:bg-stone-800 transition-all duration-300"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>Contáctanos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-500 -z-10 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
