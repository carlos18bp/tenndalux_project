'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  type?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  start?: string;
}

export function useScrollAnimation<T extends HTMLElement>(config: AnimationConfig = {}) {
  const ref = useRef<T>(null);
  const {
    type = 'fade-up',
    delay = 0,
    duration = 1,
    staggerAmount = 0.15,
    start = 'top 85%'
  } = config;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animation: gsap.core.Tween | gsap.core.Timeline;

    const baseConfig = {
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none'
      }
    };

    switch (type) {
      case 'fade-up':
        gsap.set(element, { opacity: 0, y: 60 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          y: 0
        });
        break;

      case 'fade-in':
        gsap.set(element, { opacity: 0 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1
        });
        break;

      case 'fade-left':
        gsap.set(element, { opacity: 0, x: -60 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          x: 0
        });
        break;

      case 'fade-right':
        gsap.set(element, { opacity: 0, x: 60 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          x: 0
        });
        break;

      case 'scale':
        gsap.set(element, { opacity: 0, scale: 0.9 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          scale: 1
        });
        break;

      case 'stagger':
        const children = element.children;
        gsap.set(children, { opacity: 0, y: 40 });
        animation = gsap.to(children, {
          ...baseConfig,
          opacity: 1,
          y: 0,
          stagger: staggerAmount
        });
        break;

      default:
        gsap.set(element, { opacity: 0, y: 60 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          y: 0
        });
    }

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [type, delay, duration, staggerAmount, start]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return ref;
}
