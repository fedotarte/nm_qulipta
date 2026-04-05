"use client";

import { useState } from "react";
import styles from "./lightbox-image.module.css";

type LightboxImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function LightboxImage({ src, alt, className }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        aria-label={`Открыть изображение: ${alt}`}
      >
        <img src={src} alt={alt} className={className} />
      </button>

      {isOpen ? (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть изображение"
            >
              ×
            </button>
            <img src={src} alt={alt} className={styles.fullImage} />
          </div>
        </div>
      ) : null}
    </>
  );
}
