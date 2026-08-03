import Image from "next/image";
import { ReactNode } from "react";
import styles from "./hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  disclaimer?: string;
  legalText?: string;
  children?: ReactNode;
}

export const Hero = ({
  title,
  subtitle,
  description,
  disclaimer,
  legalText,
  children,
}: HeroProps) => (
  <section className={styles.hero}>
    <div className={styles.topContent}>
      <div className={styles.content}>
        <Image
          src="/icons/qlipta-logo-hero.svg"
          alt="Кьюлипта"
          width={220}
          height={77}
          className={styles.brandLogo}
        />
        <h1 className={styles.title}>
          {title}
          {subtitle ? (
            <>
              <br />
              {subtitle}
            </>
          ) : null}
        </h1>
        <p className={styles.description}>{description}</p>
        {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
      </div>

      {legalText && (
        <aside className={styles.legalCard} aria-label="Информация о препарате">
          <p>{legalText}</p>
        </aside>
      )}
    </div>

    {children}
  </section>
);
