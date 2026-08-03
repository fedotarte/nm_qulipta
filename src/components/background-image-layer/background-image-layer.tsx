"use client";

import Image from "next/image";
import { memo } from "react";
import styles from "./background-image-layer.module.css";

const IMAGE_SIZES = "100vw";
const DEFAULT_IMAGE_SRC = "/images/hero.webp";

export interface BackgroundImageLayerProps {
  src?: string;
  priority?: boolean;
}

const BackgroundImageLayerComponent = ({
  src = DEFAULT_IMAGE_SRC,
  priority = false,
}: BackgroundImageLayerProps) => (
  <div className={styles.root} aria-hidden="true">
    <Image
      src={src}
      alt=""
      fill
      sizes={IMAGE_SIZES}
      className={styles.image}
      priority={priority}
      unoptimized
    />
  </div>
);

export const BackgroundImageLayer = memo(BackgroundImageLayerComponent);

BackgroundImageLayer.displayName = "BackgroundImageLayer";
