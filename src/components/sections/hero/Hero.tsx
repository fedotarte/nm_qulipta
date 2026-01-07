import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Фоновое изображение гепарда */}
      <Image
        src="/pictures/cheetah_hero.jpg"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />

      {/* Оверлей для читаемости текста (опционально) */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Логотип */}
          <Image
            src="/icons/qlipta_hero_logo.svg"
            alt="КЬЮЛИПТА"
            width={320}
            height={80}
            className={styles.logo}
            priority
          />

          <p className={styles.subtitle}>Атогепант</p>

          <p className={styles.description}>
            Современный препарат нового
            <br />
            поколения для профилактики
            <br />
            мигрени
          </p>
        </div>
      </div>

      {/* Стрелка вниз */}
      <Link href="#migraine-types" className={styles.scrollDown}>
        <Image
          src="/icons/arrow-down.svg"
          alt="Прокрутить вниз"
          width={48}
          height={48}
        />
      </Link>

      {/* Угловой срез */}
      <div className={styles.angledCut} aria-hidden="true" />
    </section>
  );
}
