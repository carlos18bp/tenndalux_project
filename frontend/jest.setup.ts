import '@testing-library/jest-dom';

// jsdom no implementa IntersectionObserver, y lo usan tanto framer-motion
// (whileInView) como los clips de la galería. Sin esto cualquier test que
// renderice una página completa revienta con un ReferenceError.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element) {
    // Se reporta visible: los tests corren sin viewport real, y asumir lo
    // contrario dejaría permanentemente ocultos los elementos que dependen de
    // aparecer en pantalla.
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this,
    );
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;

// Tampoco reproduce medios.
window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = jest.fn();
