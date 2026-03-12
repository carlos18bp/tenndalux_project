'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Blog', href: '/blog' },
  ];

  // Scroll detection for header blur/bg
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // GSAP full-screen overlay animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isMenuOpen) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tlRef.current = tl;

      tl.set(overlayRef.current, { display: 'flex' })
        .fromTo(overlayRef.current,
          { clipPath: 'circle(0% at calc(100% - 40px) 36px)' },
          { clipPath: 'circle(150% at calc(100% - 40px) 36px)', duration: 0.8 }
        )
        .fromTo(
          navLinksRef.current.filter(Boolean),
          { y: 80, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(ctaBtnRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.2'
        );
    } else {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      const tl = gsap.timeline({
        defaults: { ease: 'power3.in' },
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        }
      });
      tl.to(navLinksRef.current.filter(Boolean), {
        y: -30, opacity: 0, filter: 'blur(6px)', duration: 0.25, stagger: 0.03
      })
      .to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 40px) 36px)', duration: 0.5
      }, '-=0.1');
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      {/* Floating header with glassmorphism */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          hasScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)] border-b border-stone-200/40'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[72px] sm:h-20">
            <Link
              href="/"
              className={`text-[22px] font-semibold tracking-tight transition-colors duration-300 z-[60] ${
                isMenuOpen ? 'text-stone-900' : hasScrolled ? 'text-stone-900' : 'text-stone-900'
              }`}
            >
              Tenndalux
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-stone-500 hover:text-stone-900 transition-colors duration-300 text-[15px] font-medium after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="#contacto"
                className="hidden md:flex bg-stone-900 text-stone-50 px-8 py-3 rounded-full font-medium text-sm hover:bg-stone-800 transition-all duration-300 items-center gap-2.5 hover:shadow-lg hover:shadow-stone-900/10 hover:-translate-y-0.5"
              >
                <ChatBubbleLeftRightIcon className="w-[18px] h-[18px]" />
                <span>Contáctanos</span>
              </Link>

              {/* Hamburger / Close — always visible on mobile */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-stone-700 hover:bg-stone-100/60 transition-colors duration-200 z-[60] relative"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col items-center justify-center gap-[5px]">
                  <span
                    className={`block h-[2px] w-6 bg-stone-800 rounded-full transition-all duration-500 origin-center ${
                      isMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-6 bg-stone-800 rounded-full transition-all duration-500 origin-center ${
                      isMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu — ProjectApp style */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex-col bg-white"
        style={{ display: 'none', clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
      >
        {/* Top bar inside overlay mirrors main header */}
        <div className="flex items-center justify-between h-[72px] sm:h-20 px-6 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full">
          <Link href="/" onClick={closeMenu} className="text-[22px] font-semibold text-stone-900 tracking-tight">
            Tenndalux
          </Link>
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-700 hover:bg-stone-100/60 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links — large display titles */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 max-w-[1400px] mx-auto w-full">
          <div className="space-y-0">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                ref={(el) => { navLinksRef.current[i] = el; }}
                href={item.href}
                onClick={closeMenu}
                className="block text-[clamp(2.5rem,8vw,4.5rem)] font-semibold text-stone-900 leading-[1.15] py-4 border-b border-stone-200/60 hover:text-stone-500 transition-colors duration-300 tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: CTA + Social */}
        <div className="px-8 sm:px-12 pb-10 max-w-[1400px] mx-auto w-full space-y-6">
          <div ref={ctaBtnRef}>
            <Link
              href="#contacto"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 bg-stone-900 text-stone-50 py-5 rounded-2xl font-semibold text-lg hover:bg-stone-800 transition-all duration-300 w-full"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>Contáctanos</span>
            </Link>
          </div>
          <div ref={socialRef} className="flex items-center justify-center gap-8 text-sm text-stone-400 font-medium">
            <a href="https://instagram.com/tenndalux" target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 transition-colors">Instagram</a>
            <a href="https://facebook.com/tenndalux" target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
