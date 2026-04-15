"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import type { CSSProperties } from "react";
import styles from "./background-image-layer.module.css";

const IMAGE_SIZES = "100vw";
const IMAGE_QUALITY = 100;
const DEFAULT_IMAGE_SRC = "/images/hero.webp";
const DEFAULT_DIMMING = 0.35;

const clampDimming = (value: number): number => {
  if (!Number.isFinite(value)) {
    return DEFAULT_DIMMING;
  }

  return Math.min(1, Math.max(0, value));
};

export interface BackgroundImageLayerProps {
  src?: string;
  dimming?: number;
  priority?: boolean;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
}

function BackgroundImageLayerComponent({
  src = DEFAULT_IMAGE_SRC,
  dimming = DEFAULT_DIMMING,
  priority = false,
  objectFit = "cover",
  objectPosition,
}: BackgroundImageLayerProps) {
  const overlayStyle = useMemo<CSSProperties>(() => {
    return { opacity: clampDimming(dimming) };
  }, [dimming]);

  const imageStyle = useMemo<CSSProperties>(
    () => ({ objectFit, objectPosition }),
    [objectFit, objectPosition],
  );

  return (
    <div className={styles.root} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes={IMAGE_SIZES}
        quality={IMAGE_QUALITY}
        style={imageStyle}
        className={styles.image}
        priority={priority}
      />
      <div className={styles.overlay} style={overlayStyle} />
    </div>
  );
}

export const BackgroundImageLayer = memo(BackgroundImageLayerComponent);

BackgroundImageLayer.displayName = "BackgroundImageLayer";
