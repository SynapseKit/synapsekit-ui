"use client";

import { useEffect, useRef, useCallback } from "react";

export function useReveal(threshold = 0.15) {
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
      { threshold }
    );

    elements.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  const ref = useCallback((el: HTMLElement | null) => {
    if (el) elements.current.add(el);
  }, []);

  return { ref };
}
