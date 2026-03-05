import { ReactNode } from "react";
import styles from "./hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  children?: ReactNode;
}

export const Hero = ({ title, subtitle, description, children }: HeroProps) => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1 className={styles.title}>
        {title}
        <br />
        {subtitle}
      </h1>
      <p className={styles.description}>{description}</p>
    </div>

    {children}
  </section>
);
