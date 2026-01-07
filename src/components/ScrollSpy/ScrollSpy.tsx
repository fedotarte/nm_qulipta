"use client";

import { useEffect } from "react";

interface ScrollSpyProps {
  /** ID секций для отслеживания */
  sectionIds: string[];
  /** Порог видимости (0-1), по умолчанию 0.5 */
  threshold?: number;
  /** Отступ сверху для rootMargin (для фиксированного хэдера) */
  offset?: number;
}

export function ScrollSpy({
  sectionIds,
  threshold = 0.3,
  offset = -100,
}: ScrollSpyProps) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Обновляем URL без добавления в историю браузера
          window.history.replaceState(null, "", `#${id}`);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `${offset}px 0px -50% 0px`,
      threshold,
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          handleIntersect,
          observerOptions,
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      observers.length = 0;
    };
  }, [sectionIds, threshold, offset]);

  return null;
}
