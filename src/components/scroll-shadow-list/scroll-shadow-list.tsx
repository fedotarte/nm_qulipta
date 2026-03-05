"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import styles from "./scroll-shadow-list.module.css";

interface ScrollShadowListProps {
  children: ReactNode;
  className?: string;
}

export const ScrollShadowList = ({
  children,
  className,
}: ScrollShadowListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      setScrollState({ isAtTop, isAtBottom });
    };

    // Проверяем начальное состояние
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const maskClass = [
    styles.container,
    className,
    !scrollState.isAtTop && styles.shadowTop,
    !scrollState.isAtBottom && styles.shadowBottom,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={maskClass}>
      {children}
    </div>
  );
};
