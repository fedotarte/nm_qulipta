import Image from "next/image";
import { ReactNode } from "react";
import styles from "./hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  disclaimer?: string;
  children?: ReactNode;
}

export const Hero = ({
  title,
  subtitle,
  description,
  disclaimer,
  children,
}: HeroProps) => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1 className={styles.title}>
        {title}
        {subtitle ? (
          <>
            <br />
            {subtitle}
          </>
        ) : null}
      </h1>
      <Image
        src="/icons/qlipta-logo-hero.svg"
        alt="Кьюлипта"
        width={220}
        height={77}
        className={styles.brandLogo}
      />
      <p className={styles.description}>{description}</p>
      {disclaimer && (
        <p className={styles.disclaimer}>{disclaimer}</p>
      )}
    </div>

    {children}
  </section>
);
