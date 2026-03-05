import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Hero.module.css";

interface HeroSectionProps {
  children?: ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section id="hero" className={styles.hero}>
      {/* Фоновое изображение гепарда */}
      <Image
        src="/pictures/cheetah.jpg"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />

      {/* Оверлей для читаемости текста */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>Быстрее, чем мигрень</h1>
      </div>

      {/* Слот для карточек (как в glau: Hero + ArticleSlider) */}
      {children}

      {/* Стрелка вниз */}
      <Link href="#migraine-types" className={styles.scrollDown}>
        <Image
          src="/icons/arrow-down.svg"
          alt="Прокрутить вниз"
          width={48}
          height={48}
        />
      </Link>
    </section>
  );
}
