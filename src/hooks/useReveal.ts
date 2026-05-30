"use client";

import { useEffect, useRef, useCallback } from "react";

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal({ threshold = 0.15, rootMargin = "0px" }: RevealOptions = {}) {
  const elements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const ref = useCallback((el: HTMLElement | null) => {
    if (el) elements.current.add(el);
  }, []);

  return { ref };
}
