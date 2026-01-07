import Image from 'next/image';
import Link from 'next/link';
import styles from './MigraineTypes.module.css';

const migraineTypes = [
  {
    id: 'episodic',
    title: 'ЭПИЗОДИЧЕСКАЯ МИГРЕНЬ',
    image: '/pictures/left-robot.png',
    href: '/episodic-migraine',
    imagePosition: 'left' as const,
  },
  {
    id: 'chronic',
    title: 'ХРОНИЧЕСКАЯ МИГРЕНЬ',
    image: '/pictures/right-robot.png',
    href: '/chronic-migraine',
    imagePosition: 'right' as const,
  },
];

export function MigraineTypes() {
  return (
    <section id="migraine-types" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {migraineTypes.map((type) => (
            <article 
              key={type.id} 
              className={`${styles.card} ${styles[type.imagePosition]}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={type.image}
                  alt=""
                  width={400}
                  height={500}
                  className={styles.robotImage}
                />
              </div>

              <div className={styles.content}>
                <h2 className={styles.title}>{type.title}</h2>
                <Link href={type.href} className={styles.button}>
                  Подробнее
                  <Image
                    src="/icons/book.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={styles.buttonIcon}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
