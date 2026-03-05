import Link from "next/link";
import styles from "./HeroCards.module.css";

const cards = [
  { id: "chronic", title: "Хроническая мигрень", href: "#migraine-types" },
  { id: "episodic", title: "Эпизодическая мигрень", href: "#migraine-types" },
  { id: "quiz", title: "Интерактивный квиз", href: "#quiz" },
  { id: "experts", title: "Ответы экспертов", href: "#experts" },
] as const;

export function HeroCards() {
  return (
    <div className={styles.wrapper} role="navigation" aria-label="Разделы">
      <ul className={styles.list}>
        {cards.map((card) => (
          <li key={card.id}>
            <Link href={card.href} className={styles.card}>
              <span className={styles.cardTitle}>{card.title}</span>
              <span className={styles.arrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
