import styles from './Webinars.module.css';

export function Webinars() {
  return (
    <section id="webinars" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Записи вебинаров</h2>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

